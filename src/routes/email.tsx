import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { runWorkmateTool } from "@/lib/ai.functions";
import { SAMPLE_EMAIL_INPUT } from "@/lib/sample-data";
import { TONES, type EmailInput, type EmailResult } from "@/lib/types";
import { useWorkspace } from "@/lib/workspace-store";
import { ResponsibleAiNotice } from "@/components/workmate/ResponsibleAi";
import {
  EmptyState,
  ErrorState,
  Field,
  GhostButton,
  LoadingLines,
  MissingInfo,
  PageHeading,
  Panel,
  PrimaryButton,
  SmallButton,
} from "@/components/workmate/ToolPage";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workmate AI" },
      {
        name: "description",
        content:
          "Generate professional workplace emails with a chosen tone, then edit, copy or regenerate the draft.",
      },
      { property: "og:title", content: "Smart Email Generator — Workmate AI" },
      {
        property: "og:description",
        content: "Draft workplace emails with structured AI prompts and full human review.",
      },
    ],
  }),
  component: EmailPage,
});

const EMPTY: EmailInput = { purpose: "", instructions: "", recipient: "", tone: "Professional" };

function EmailPage() {
  const { emailPrefill, setEmailPrefill, recordEmail } = useWorkspace();
  const [input, setInput] = useState<EmailInput>(SAMPLE_EMAIL_INPUT);
  const [result, setResult] = useState<EmailResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const run = useServerFn(runWorkmateTool);

  useEffect(() => {
    if (emailPrefill) {
      setInput((prev) => ({ ...prev, ...emailPrefill }));
      setResult(null);
      setEmailPrefill(null);
      toast.info("Task context loaded into the email generator.");
    }
  }, [emailPrefill, setEmailPrefill]);

  const generate = async () => {
    if (!input.instructions.trim()) {
      setError("Add your instructions so the assistant knows what to write.");
      return;
    }
    setLoading(true);
    setError(null);
    setEditing(false);
    try {
      const data = (await run({ data: { tool: "email", ...input } })) as unknown as EmailResult;
      setResult({
        subject: data.subject ?? "",
        body: data.body ?? "",
        missingInformation: data.missingInformation ?? [],
      });
      recordEmail();
    } catch (e) {
      setError(e instanceof Error ? e.message : "The assistant could not draft that email.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(`Subject: ${result.subject}\n\n${result.body}`);
    toast.success("Email copied to clipboard");
  };

  return (
    <>
      <PageHeading
        eyebrow="Tool 01"
        title="Smart Email Generator"
        description="Describe the message you need. Workmate AI writes a subject line and a professional body in your chosen tone, and tells you what information is still missing."
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel delay={80}>
          <div className="space-y-4">
            <Field label="Email purpose / type">
              <input
                className="field"
                value={input.purpose}
                onChange={(e) => setInput({ ...input, purpose: e.target.value })}
                placeholder="e.g. Status update to client"
              />
            </Field>
            <Field label="Your instructions">
              <textarea
                className="field min-h-28 resize-y"
                value={input.instructions}
                onChange={(e) => setInput({ ...input, instructions: e.target.value })}
                placeholder="What should the email say?"
              />
            </Field>
            <Field label="Recipient / context">
              <input
                className="field"
                value={input.recipient}
                onChange={(e) => setInput({ ...input, recipient: e.target.value })}
                placeholder="e.g. Marcus Reeve — lead product, Northwind"
              />
            </Field>
            <div>
              <span className="mb-2 block text-xs font-medium text-muted-foreground">Tone</span>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Tone">
                {TONES.map((tone) => {
                  const active = input.tone === tone;
                  return (
                    <button
                      key={tone}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setInput({ ...input, tone })}
                      className={
                        active
                          ? "rounded-md bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent ring-1 ring-accent/40"
                          : "rounded-md px-2.5 py-1 text-xs text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground"
                      }
                    >
                      {tone}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <PrimaryButton onClick={generate} disabled={loading}>
              {loading ? "Generating…" : "Generate"}
            </PrimaryButton>
            <GhostButton
              onClick={() => {
                setInput(EMPTY);
                setResult(null);
                setError(null);
              }}
            >
              Clear
            </GhostButton>
            <GhostButton onClick={() => setInput(SAMPLE_EMAIL_INPUT)}>Load sample</GhostButton>
          </div>
        </Panel>

        <Panel delay={140}>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Output</span>
            <span className="flex gap-1.5">
              <SmallButton onClick={() => setEditing((v) => !v)} disabled={!result}>
                {editing ? "Done" : "Edit"}
              </SmallButton>
              <SmallButton onClick={copy} disabled={!result}>
                Copy
              </SmallButton>
              <SmallButton onClick={generate} disabled={loading}>
                Regenerate
              </SmallButton>
            </span>
          </div>

          <div className="mt-4">
            {loading ? (
              <div className="rounded-xl bg-foreground/[0.03] p-4 ring-1 ring-border">
                <LoadingLines label={`Drafting with a ${input.tone.toLowerCase()} tone…`} />
              </div>
            ) : error ? (
              <ErrorState message={error} onRetry={generate} />
            ) : result ? (
              <div className="space-y-3 rounded-xl bg-foreground/[0.03] p-4 ring-1 ring-border">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent">Subject</span>
                  {editing ? (
                    <input
                      className="field mt-1"
                      value={result.subject}
                      onChange={(e) => setResult({ ...result, subject: e.target.value })}
                    />
                  ) : (
                    <p className="mt-1 text-sm font-medium">{result.subject}</p>
                  )}
                </div>
                <div className="h-px bg-border" />
                {editing ? (
                  <textarea
                    className="field min-h-56 resize-y"
                    value={result.body}
                    onChange={(e) => setResult({ ...result, body: e.target.value })}
                  />
                ) : (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{result.body}</p>
                )}
              </div>
            ) : (
              <EmptyState
                title="No draft yet"
                hint="Fill in the purpose, instructions and recipient, then press Generate."
              />
            )}
          </div>

          {result && <MissingInfo items={result.missingInformation} />}
          <ResponsibleAiNotice compact />
        </Panel>
      </div>
    </>
  );
}
