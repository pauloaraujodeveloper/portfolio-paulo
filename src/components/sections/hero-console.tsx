import { RiCodeSSlashLine, RiDatabase2Line, RiServerLine, RiShieldCheckLine } from "@remixicon/react";
import type { ComponentType } from "react";
import { cx } from "@/utils/cx";

interface Layer {
  index: string;
  label: string;
  stack: string;
  tag: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}

const LAYERS: Layer[] = [
  {
    index: "01",
    label: "Interface",
    stack: "React 19 · TypeScript · Tailwind",
    tag: "React Aria",
    icon: RiCodeSSlashLine,
  },
  {
    index: "02",
    label: "API",
    stack: "Fastify 5 · Zod · OAuth 2.1",
    tag: "REST",
    icon: RiServerLine,
  },
  {
    index: "03",
    label: "Dados",
    stack: "PostgreSQL · RLS · migrations",
    tag: "EXCLUDE",
    icon: RiDatabase2Line,
  },
];

/**
 * Decorative representation of how a system is layered — not a screenshot and
 * not a claim of a specific product UI. The SQL fragment is the real constraint
 * used in AgendFy's schema.
 */
export function HeroConsole({ className }: { className?: string }) {
  return (
    <div className={cx("relative", className)}>
      <div
        aria-hidden
        className="absolute -inset-x-6 -top-10 bottom-0 rounded-[2rem] bg-[radial-gradient(60%_50%_at_70%_10%,color-mix(in_oklab,var(--color-electric-500)_22%,transparent),transparent_70%)] blur-2xl"
      />

      <div className="ring-gradient relative overflow-hidden rounded-3xl border border-separator-border bg-ink-900/90 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between gap-3 border-b border-separator-border px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="flex gap-1.5">
              <span className="size-2 rounded-full bg-ink-600" />
              <span className="size-2 rounded-full bg-ink-600" />
              <span className="size-2 rounded-full bg-electric-500/70" />
            </span>
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-tertiary uppercase">
              sistema · arquitetura
            </span>
          </div>
          <span className="hidden rounded-md border border-separator-border bg-background-secondary-default px-2 py-1 font-mono text-[0.625rem] text-text-tertiary sm:block">
            v1
          </span>
        </div>

        <div className="relative px-5 py-5">
          {/* Vertical rail the packet travels along. */}
          <div className="absolute start-[2.35rem] top-7 bottom-7 w-px bg-ink-700" aria-hidden>
            <span className="packet-run absolute -start-[2px] top-0 size-[5px] rounded-full bg-signal-cyan shadow-[0_0_10px_2px_color-mix(in_oklab,var(--color-signal-cyan)_55%,transparent)]" />
          </div>

          <ol className="relative flex flex-col gap-3">
            {LAYERS.map((layer) => (
              <li key={layer.label}>
                <div className="group flex items-center gap-3.5 rounded-2xl border border-transparent px-1.5 py-2.5 transition-colors hover:border-separator-border hover:bg-background-secondary-default/70">
                  <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-xl border border-ink-600 bg-ink-850 text-electric-300">
                    <layer.icon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-[0.625rem] text-text-tertiary">
                        {layer.index}
                      </span>
                      <span className="text-body-semibold text-text-primary">{layer.label}</span>
                    </div>
                    <p className="mt-0.5 truncate font-mono text-[0.6875rem] text-text-tertiary">
                      {layer.stack}
                    </p>
                  </div>
                  <span className="hidden shrink-0 rounded-md border border-separator-border bg-ink-850 px-2 py-1 font-mono text-[0.625rem] text-text-secondary sm:block">
                    {layer.tag}
                  </span>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-4 overflow-hidden rounded-xl border border-separator-border bg-ink-950/80">
            <div className="flex items-center justify-between border-b border-separator-border px-3 py-2">
              <span className="font-mono text-[0.625rem] tracking-wide text-text-tertiary">
                schema.sql
              </span>
              <span className="font-mono text-[0.625rem] text-text-tertiary">agenda</span>
            </div>
            <pre className="overflow-x-auto px-3 py-3 font-mono text-[0.6875rem] leading-relaxed text-mist-400">
              <code>
                <span className="text-signal-violet">CONSTRAINT</span> no_professional_overlap{"\n"}
                {"  "}
                <span className="text-signal-violet">EXCLUDE USING</span> gist ({'"\n'}
                {"    "}org_id <span className="text-electric-300">WITH</span> =,{"\n"}
                {"    "}int8range(start_ms, end_ms) <span className="text-electric-300">WITH</span> &&{"\n"}
                {"  "}) <span className="text-electric-300">WHERE</span> (overbook = 0)
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -start-3 flex items-center gap-2 rounded-full border border-separator-border bg-ink-850/95 px-3 py-1.5 shadow-lg backdrop-blur sm:-start-6">
        <RiShieldCheckLine className="size-3.5 text-signal-cyan" aria-hidden />
        <span className="font-mono text-[0.625rem] tracking-[0.1em] text-text-secondary uppercase">
          auditoria encadeada
        </span>
      </div>
    </div>
  );
}
