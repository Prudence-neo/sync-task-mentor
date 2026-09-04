import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, NotebookPen, ListChecks, ArrowRight } from "lucide-react";

import { useWorkspace } from "@/lib/workspace-store";
import { ResponsibleAiNotice } from "@/components/workmate/ResponsibleAi";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Workmate AI" },
      {
        name: "description",
        content:
          "Your Workmate AI workspace overview: tasks planned, high-priority work, meetings summarized and emails generated.",
      },
      { property: "og:title", content: "Dashboard — Workmate AI" },
      {
        property: "og:description",
        content: "One integrated AI assistant for workplace email, meeting notes and daily planning.",
      },
    ],
  }),
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/email",
    tag: "Tool 01",
    tone: "text-accent",
    icon: Mail,
    title: "Smart Email",
    body: "Draft workplace emails in your tone.",
  },
  {
    to: "/meetings",
    tag: "Tool 02",
    tone: "text-sky",
    icon: NotebookPen,
    title: "Meeting Notes",
    body: "Summarize notes into decisions and actions.",
  },
  {
    to: "/tasks",
    tag: "Tool 03",
    tone: "text-violet",
    icon: ListChecks,
    title: "Task Planner",
    body: "Prioritize and schedule your workload.",
  },
] as const;

function Dashboard() {
  const { stats, plannedTasks } = useWorkspace();

  const cards = [
    { label: "Tasks planned", value: stats.tasksPlanned, note: "in today's plan", accent: "" },
    {
      label: "High-priority",
      value: stats.highPriority,
      note: "need attention first",
      accent: "text-amber",
    },
    { label: "Meetings summarized", value: stats.meetingsSummarized, note: "this week", accent: "" },
    { label: "Emails generated", value: stats.emailsGenerated, note: "this month", accent: "" },
  ];

  return (
    <>
      <header className="rise">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Your workspace
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-balance">Welcome back to Workmate AI</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          One integrated assistant for how you communicate, run meetings and plan your day. Draft an email,
          turn messy meeting notes into decisions and action items, then schedule the work that follows.
        </p>
      </header>

      <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Productivity overview">
        {cards.map((c, i) => (
          <div
            key={c.label}
            className="rise glass rounded-2xl p-4"
            style={{ animationDelay: `${60 * (i + 1)}ms` }}
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{c.label}</p>
            <p className={`mt-2 text-3xl font-bold tracking-tight ${c.accent}`}>{c.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.note}</p>
          </div>
        ))}
      </section>

      <section className="mt-3 grid gap-3 lg:grid-cols-3">
        {TOOLS.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.to}
              to={tool.to}
              className="rise glass group rounded-2xl p-4 transition-colors hover:ring-1 hover:ring-accent/30"
              style={{ animationDelay: `${300 + i * 60}ms` }}
            >
              <p className={`font-mono text-[11px] uppercase tracking-wider ${tool.tone}`}>{tool.tag}</p>
              <h2 className="mt-1 flex items-center gap-2 text-base font-semibold">
                <Icon className="size-4" aria-hidden />
                {tool.title}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tool.body}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-accent">
                Open <ArrowRight className="size-3" aria-hidden />
              </span>
            </Link>
          );
        })}
      </section>

      <div className="mt-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight">Today's plan</h2>
        <span className="font-mono text-[11px] text-muted-foreground">
          {stats.tasksPlanned} tasks · {stats.highPriority} high priority
        </span>
      </div>

      <section className="rise glass mt-3 rounded-2xl p-5" style={{ animationDelay: "540ms" }}>
        <div className="divide-y divide-border">
          {plannedTasks.map((task) => (
            <div key={task.task} className="flex items-center gap-3 py-3">
              <span
                className={
                  task.priority === "High"
                    ? "rounded-md bg-amber/15 px-2 py-0.5 text-[11px] font-medium text-amber ring-1 ring-amber/30"
                    : task.priority === "Medium"
                      ? "rounded-md bg-sky/15 px-2 py-0.5 text-[11px] font-medium text-sky ring-1 ring-sky/30"
                      : "rounded-md bg-foreground/[0.06] px-2 py-0.5 text-[11px] font-medium text-muted-foreground ring-1 ring-border"
                }
              >
                {task.priority}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{task.task}</p>
                <p className="text-xs text-muted-foreground">
                  {task.estimatedMinutes} min
                  {task.dependsOn ? ` · after ${task.dependsOn}` : ""}
                </p>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">{task.scheduledTime}</span>
            </div>
          ))}
        </div>
      </section>

      <ResponsibleAiNotice />
    </>
  );
}
