import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { engineeringPrinciples } from "@/data/engineering";

export function Engineering() {
  return (
    <section
      id="engenharia"
      aria-labelledby="engenharia-title"
      className="relative scroll-mt-24 border-t border-separator-border py-20 sm:py-24"
    >
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionHeading
                eyebrow="Engenharia"
                title="Decisões técnicas"
                accent="com evidência no código."
                titleId="engenharia-title"
              />
              <div data-reveal-item className="mt-7 flex flex-col gap-4">
                <p className="text-body-regular text-text-secondary">
                  Cada princípio abaixo aponta para um artefato concreto em um dos projetos deste
                  portfólio: uma constraint, um schema, um teste.
                </p>
                <p className="text-body-regular text-text-secondary">
                  O critério é simples: se eu não consigo mostrar onde a decisão aparece no código,
                  ela não entra na lista.
                </p>
              </div>
              <dl
                data-reveal-item
                className="mt-9 grid grid-cols-2 gap-4 rounded-2xl border border-separator-border bg-background-secondary-default/40 p-5"
              >
                <div>
                  <dt className="font-mono text-caption-1-regular tracking-[0.1em] text-text-tertiary uppercase">
                    Princípios
                  </dt>
                  <dd className="mt-1 text-title-2-semibold text-text-primary">
                    {engineeringPrinciples.length}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-caption-1-regular tracking-[0.1em] text-text-tertiary uppercase">
                    Evidências
                  </dt>
                  <dd className="mt-1 text-title-2-semibold text-text-primary">
                    {new Set(engineeringPrinciples.flatMap((item) => item.projects)).size} projetos
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal staggerMs={55}>
            <ol className="flex flex-col">
              {engineeringPrinciples.map((principle, index) => (
                <li
                  key={principle.id}
                  data-reveal-item
                  className="group relative border-t border-separator-border py-8 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-caption-1-semibold text-electric-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-title-3-semibold text-text-primary">
                        {principle.title}
                      </h3>
                      <p className="mt-2.5 text-body-regular text-text-secondary">
                        {principle.description}
                      </p>

                      <div className="mt-4 rounded-2xl border border-separator-border bg-background-secondary-default/40 p-4">
                        <p className="font-mono text-[0.625rem] tracking-[0.16em] text-text-tertiary uppercase">
                          evidência
                        </p>
                        <p className="mt-1.5 text-body-regular text-text-secondary">
                          {principle.evidence}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {principle.projects.map((project) => (
                            <li
                              key={project}
                              className="rounded-md border border-separator-border px-2 py-0.5 font-mono text-[0.6875rem] text-text-tertiary"
                            >
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
