import type { ReactNode } from "react";

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <header className="rise flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-balance">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      {action}
    </header>
  );
}

export function Panel({
  children,
  className = "",
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <section
      className={`rise glass rounded-2xl p-5 ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </section>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="rounded-lg bg-foreground/[0.05] px-3 py-2 text-sm text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function SmallButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="rounded-md bg-foreground/[0.05] px-2.5 py-1 text-xs text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function LoadingLines({ label }: { label: string }) {
  return (
    <div className="space-y-3" role="status" aria-live="polite">
      <p className="skel h-3 w-4/5 rounded-md" />
      <p className="skel h-3 w-full rounded-md" />
      <p className="skel h-3 w-11/12 rounded-md" />
      <p className="skel h-3 w-3/5 rounded-md" />
      <p className="pt-1 font-mono text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="rounded-xl bg-foreground/[0.02] p-8 text-center ring-1 ring-border">
      <p className="text-sm font-medium">{title}</p>
      <p className="mx-auto mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">{hint}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-xl bg-destructive/10 p-4 ring-1 ring-destructive/30" role="alert">
      <p className="text-sm font-medium text-destructive">Something went wrong</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-md bg-foreground/[0.06] px-2.5 py-1 text-xs ring-1 ring-border"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function MissingInfo({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-4 rounded-xl bg-amber/10 p-3 ring-1 ring-amber/25">
      <p className="font-mono text-[10px] uppercase tracking-wider text-amber">Missing information</p>
      <ul className="mt-1.5 space-y-1 text-xs leading-relaxed text-muted-foreground">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
