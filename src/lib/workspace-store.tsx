import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import type { EmailInput, PlannedTask } from "./types";
import { SAMPLE_PLANNED_TASKS, SAMPLE_STATS } from "./sample-data";

interface WorkspaceStats {
  tasksPlanned: number;
  highPriority: number;
  meetingsSummarized: number;
  emailsGenerated: number;
}

interface WorkspaceValue {
  stats: WorkspaceStats;
  plannedTasks: PlannedTask[];
  taskDraft: string;
  emailPrefill: Partial<EmailInput> | null;
  setTaskDraft: (value: string) => void;
  setEmailPrefill: (value: Partial<EmailInput> | null) => void;
  recordPlan: (tasks: PlannedTask[]) => void;
  recordMeeting: () => void;
  recordEmail: () => void;
}

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [plannedTasks, setPlannedTasks] = useState<PlannedTask[]>(SAMPLE_PLANNED_TASKS);
  const [meetingsSummarized, setMeetings] = useState(SAMPLE_STATS.meetingsSummarized);
  const [emailsGenerated, setEmails] = useState(SAMPLE_STATS.emailsGenerated);
  const [taskDraft, setTaskDraft] = useState("");
  const [emailPrefill, setEmailPrefill] = useState<Partial<EmailInput> | null>(null);

  const recordPlan = useCallback((tasks: PlannedTask[]) => setPlannedTasks(tasks), []);
  const recordMeeting = useCallback(() => setMeetings((n) => n + 1), []);
  const recordEmail = useCallback(() => setEmails((n) => n + 1), []);

  const value = useMemo<WorkspaceValue>(
    () => ({
      stats: {
        tasksPlanned: plannedTasks.length,
        highPriority: plannedTasks.filter((t) => t.priority === "High").length,
        meetingsSummarized,
        emailsGenerated,
      },
      plannedTasks,
      taskDraft,
      emailPrefill,
      setTaskDraft,
      setEmailPrefill,
      recordPlan,
      recordMeeting,
      recordEmail,
    }),
    [plannedTasks, meetingsSummarized, emailsGenerated, taskDraft, emailPrefill, recordPlan, recordMeeting, recordEmail],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return ctx;
}
