export const RESPONSIBLE_AI_NOTICE =
  "Workmate AI provides AI-generated workplace assistance. Always review and verify AI-generated content before sending emails, making decisions, or sharing information. Do not enter confidential, sensitive, or personal information unless your organisation's policies allow it.";

export const RESPONSIBLE_AI_PRINCIPLES = [
  {
    title: "Privacy",
    body: "Only enter workplace information your organisation's policies allow. Avoid confidential, sensitive or personal data.",
  },
  {
    title: "Human review",
    body: "Every draft, summary and plan is a starting point that a person reviews before it is used.",
  },
  {
    title: "Accuracy",
    body: "Workmate AI works only from what you provide and flags missing information instead of inventing it.",
  },
  {
    title: "Human decision-making",
    body: "Priorities, commitments and communications remain your decision, never the assistant's.",
  },
];

export function ResponsibleAiNotice({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">{RESPONSIBLE_AI_NOTICE}</p>;
  }

  return (
    <section className="glass mt-4 rounded-2xl p-5">
      <p className="font-mono text-[11px] uppercase tracking-wider text-accent">Responsible AI</p>
      <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted-foreground">{RESPONSIBLE_AI_NOTICE}</p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {RESPONSIBLE_AI_PRINCIPLES.map((p) => (
          <div key={p.title} className="rounded-xl bg-foreground/[0.03] p-3 ring-1 ring-border">
            <dt className="text-xs font-semibold">{p.title}</dt>
            <dd className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{p.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
