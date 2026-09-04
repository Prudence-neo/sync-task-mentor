import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Mail, NotebookPen, ListChecks, Settings, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/meetings", label: "Meeting Summarizer", icon: NotebookPen },
  { to: "/tasks", label: "Task Planner", icon: ListChecks },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-2">
      <div className="grid size-8 place-items-center rounded-lg bg-accent/15 ring-1 ring-accent/40">
        <span className="font-mono text-xs font-medium text-accent">W</span>
      </div>
      <span className="text-[15px] font-semibold tracking-tight">
        Workmate <span className="text-muted-foreground">AI</span>
      </span>
    </div>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="mt-8 flex flex-col gap-1" aria-label="Main">
      {NAV.map((item) => {
        const active = pathname === item.to;
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "flex items-center gap-3 rounded-lg bg-foreground/[0.08] px-3 py-2 text-sm font-medium ring-1 ring-border"
                : "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            }
          >
            <Icon className="size-4" aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="aurora" aria-hidden />
      <div className="relative z-10 flex min-h-screen w-full text-foreground">
        <aside className="glass sticky top-0 hidden h-screen w-64 shrink-0 flex-col px-4 py-5 md:flex">
          <Brand />
          <NavList />
          <div className="mt-auto rounded-xl bg-foreground/[0.03] p-3 ring-1 ring-border">
            <p className="text-xs font-medium">Pro workspace</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">3 tools active today</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="glass sticky top-0 z-30 flex items-center justify-between px-4 py-3 md:hidden">
            <Brand />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              className="rounded-lg bg-foreground/[0.05] p-2 text-muted-foreground ring-1 ring-border"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
          {open && (
            <div className="glass sticky top-[57px] z-20 px-4 pb-4 md:hidden">
              <NavList onNavigate={() => setOpen(false)} />
            </div>
          )}

          <main className="px-5 py-6 md:px-8">{children}</main>
        </div>
      </div>
    </>
  );
}
