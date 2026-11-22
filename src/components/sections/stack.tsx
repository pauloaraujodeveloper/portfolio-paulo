import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Chip } from "@/components/base/badges/chip";
import { stackGroups } from "@/data/stack";

const uniqueTechnologies = new Set(stackGroups.flatMap((group) => group.items));

/** Technologies that recur across the portfolio's projects (checked against src/data/projects.ts). */
const coreStack = ["TypeScript", "React 19", "Tailwind CSS 4", "Node.js", "Fastify 5", "PostgreSQL"];

export function Stack() {
  return (
    <section
      id="tecnologias"
      aria-labelledby="tecnologias-title"
      className="relative scroll-mt-24 border-t border-separator-border py-20 sm:py-24"
    >
      <div aria-hidden className="glow-soft pointer-events-none absolute inset-x-0 top-0 h-64 opacity-60" />

      <div className="container-page relative">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <SectionHeading
              eyebrow="Tecnologias"
              title="A stack que aparece"
              accent="nos repositórios."
              titleId="tecnologias-title"
              className="[&>h2]:max-w-none"
            />
            <div data-reveal-item className="lg:pb-1">
              <p className="text-body-regular text-text-secondary">
                Só entra nesta lista o que foi efetivamente usado em um projeto deste portfólio.
                Ferramenta estudada, mas ainda sem aplicação real, fica de fora.
              </p>
              <p className="mt-3 flex items-center gap-2 font-mono text-caption-1-regular text-text-tertiary">
                <span aria-hidden className="size-1.5 rounded-full bg-signal-cyan" />
                {uniqueTechnologies.size} tecnologias em {stackGroups.length} áreas
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div
            data-reveal-item
            className="ring-gradient rounded-3xl border border-separator-border bg-background-primary-default/60 p-6 sm:p-8"
          >
            <p className="font-mono text-caption-1-semibold tracking-[0.16em] text-text-tertiary uppercase">
              núcleo da stack
            </p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {coreStack.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-electric-400/40 bg-electric-500/10 px-3.5 py-2 font-mono text-body-medium text-text-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-caption-1-regular text-text-tertiary">
              O que aparece em mais de um projeto e sustenta a maior parte do que eu entrego.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-6" staggerMs={45}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stackGroups.map((group, index) => (
              <li
                key={group.id}
                data-reveal-item
                className="group flex h-full flex-col rounded-3xl border border-separator-border bg-background-primary-default/50 p-5 transition-colors hover:border-border-button-hover"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-headline-semibold text-text-primary">{group.label}</h3>
                  <span className="font-mono text-caption-1-regular text-text-tertiary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1.5 text-caption-1-regular text-text-tertiary">{group.note}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Chip
                        variant="caption"
                        color="soft"
                        className="border border-separator-border font-mono text-[0.6875rem]"
                      >
                        {item}
                      </Chip>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
