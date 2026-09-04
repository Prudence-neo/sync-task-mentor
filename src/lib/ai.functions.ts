import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";

import { createLovableAiGatewayProvider } from "./ai-gateway.server";
import { buildEmailPrompt, buildMeetingPrompt, buildPlannerPrompt } from "./prompts";

const MODEL = "google/gemini-3.7-flash";

const ToneSchema = z.enum(["Formal", "Professional", "Friendly", "Persuasive", "Concise"]);

const InputSchema = z.discriminatedUnion("tool", [
  z.object({
    tool: z.literal("email"),
    purpose: z.string().default(""),
    instructions: z.string().min(1),
    recipient: z.string().default(""),
    tone: ToneSchema,
  }),
  z.object({
    tool: z.literal("meeting"),
    notes: z.string().min(1),
  }),
  z.object({
    tool: z.literal("planner"),
    tasks: z.string().min(1),
    workdayStart: z.string().default("09:00"),
  }),
]);

function extractJson(raw: string): unknown {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start !== -1 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }
    throw new Error("The assistant returned an unexpected format. Please try again.");
  }
}

export const runWorkmateTool = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      throw new Error("AI is not configured for this workspace.");
    }

    const prompt =
      data.tool === "email"
        ? buildEmailPrompt(data)
        : data.tool === "meeting"
          ? buildMeetingPrompt(data.notes)
          : buildPlannerPrompt(data.tasks, data.workdayStart);

    const gateway = createLovableAiGatewayProvider(apiKey);

    try {
      const result = streamText({
        model: gateway(MODEL),
        prompt,
        temperature: 0.4,
      });
      const text = await result.text;
      return extractJson(text) as Record<string, unknown>;
    } catch (error) {
      const status = (error as { statusCode?: number; status?: number })?.statusCode ??
        (error as { status?: number })?.status;
      if (status === 429) {
        throw new Error("Too many requests right now. Wait a few seconds and try again.");
      }
      if (status === 402) {
        throw new Error("This workspace is out of AI credits. Add credits to keep generating.");
      }
      if (status === 403) {
        throw new Error("AI access is blocked by workspace policy. Contact your administrator.");
      }
      throw error instanceof Error ? error : new Error("The assistant could not complete that request.");
    }
  });
