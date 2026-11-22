import { RiGraduationCapLine } from "@remixicon/react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Chip } from "@/components/base/badges/chip";
import { education, experience } from "@/data/trajectory";

export function Trajectory() {
  return (
    <section
      id="trajetoria"
      aria-labelledby="trajetoria-title"
      className="relative scroll-mt-24 border-t border-separator-border py-20 sm:py-24"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Trajetória"
            title="Da operação ao código,"
            accent="com os pés no cliente."
            titleId="trajetoria-title"
            className="[&>h2]:max-w-none"
          />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <Reveal staggerMs={70}>
            <h3
              data-reveal-item
              className="font-mono text-caption-1-semibold tracking-[0.16em] text-text-tertiary uppercase"
            >
              Experiência profissional
            </h3>
            <ol className="relative mt-6 flex flex-col gap-4">
              {experience.map((item) => (
                <li
                  key={item.id}
                  data-reveal-item
                  className="rounded-3xl border border-separator-border bg-background-primary-default/50 p-6 transition-colors hover:border-border-button-hover"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="text-headline-semibold text-text-primary">{item.role}</h4>
                      {item.organization ? (
                        <p className="mt-0.5 text-body-regular text-text-secondary">
                          {item.organization}
                        </p>
                      ) : null}
                    </div>
                    {item.badge ? (
                      <Chip variant="caption" color="cyan">
                        {item.badge}
                      </Chip>
                    ) : null}
                  </div>

                  <p className="mt-4 text-body-regular text-text-secondary">{item.summary}</p>
                  <p className="mt-3 border-s-2 border-electric-500/60 ps-3 text-body-regular text-text-primary">
                    {item.contribution}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-separator-border px-2 py-0.5 font-mono text-[0.6875rem] text-text-tertiary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={100} staggerMs={70}>
            <h3
              data-reveal-item
              className="font-mono text-caption-1-semibold tracking-[0.16em] text-text-tertiary uppercase"
            >
              Formação e estudos
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {education.map((item) => (
                <li
                  key={item.id}
                  data-reveal-item
                  className="flex gap-4 rounded-3xl border border-separator-border bg-background-secondary-default/40 p-5"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-separator-border bg-background-secondary-default text-electric-300">
                    <RiGraduationCapLine className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-body-semibold text-text-primary">{item.title}</p>
                    <p className="mt-0.5 text-body-regular text-text-secondary">
                      {item.institution}
                    </p>
                    <p className="mt-2 font-mono text-caption-1-regular text-text-tertiary">
                      {item.status}
                      {item.period ? ` · ${item.period}` : ""}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
