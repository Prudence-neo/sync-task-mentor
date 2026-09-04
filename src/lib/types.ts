export type Tone = "Formal" | "Professional" | "Friendly" | "Persuasive" | "Concise";

export const TONES: Tone[] = ["Formal", "Professional", "Friendly", "Persuasive", "Concise"];

export type Priority = "High" | "Medium" | "Low";

export interface EmailInput {
  purpose: string;
  instructions: string;
  recipient: string;
  tone: Tone;
}

export interface EmailResult {
  subject: string;
  body: string;
  missingInformation: string[];
}

export interface MeetingResult {
  summary: string;
  keyPoints: string[];
  decisions: string[];
  actionItems: Array<{
    task: string;
    owner: string | null;
    deadline: string | null;
  }>;
  openQuestions: string[];
  missingInformation: string[];
}

export interface PlannedTask {
  task: string;
  priority: Priority;
  rationale: string;
  estimatedMinutes: number;
  scheduledTime: string;
  dependsOn: string | null;
}

export interface PlanResult {
  tasks: PlannedTask[];
  schedule: Array<{ time: string; block: string }>;
  recommendations: string[];
  missingInformation: string[];
}
