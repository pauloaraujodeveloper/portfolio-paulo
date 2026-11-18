import { RiArrowRightUpLine } from "@remixicon/react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/base/buttons/button";
import { profile } from "@/data/profile";

const SHEET = [
  {
    label: "Formação",
    value:
      "Tecnologia em Análise e Desenvolvimento de Sistemas — Faculdade Facint (cursando, 2026–2028).",
  },
  {
    label: "Cursos",
    value: "Full Stack na Digital College e Discover na Rocketseat, ambos em andamento.",
  },
  {
    label: "Experiência",
    value:
      "Hoje, Customer Success na Dataqore; antes, suporte técnico N1/N2, implantação de ERP/SaaS e Customer Success em empresas B2B.",
  },
  {
    label: "Idiomas",
    value: "Português nativo · Inglês básico · Espanhol básico.",
  },
  {
    label: "Foco atual",
    value: "APIs tipadas, modelagem de dados, segurança de aplicação e IA aplicada a produto.",
  },
  {
    label: "Como trabalho",
    value: "Entendo a operação antes do código; documento a decisão; verifico antes de publicar.",
  },
];

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="container-page grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            eyebrow="Sobre"
            title="Comecei pela operação. Aprendi a programar"
            accent="pelo problema."
            titleId="sobre-title"
            className="[&>h2]:max-w-none"
          />

          <div className="mt-8 flex flex-col gap-5" data-reveal-item>
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-headline-regular text-text-secondary">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-9" data-reveal-item>
            <ButtonLink
              href="#projetos"
              variant="ghost"
              trailingIcon={RiArrowRightUpLine}
              size="small"
            >
              Ver os sistemas
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            data-reveal-item
            className="relative overflow-hidden rounded-3xl border border-separator-border bg-background-primary-default/70 p-6 sm:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-500/60 to-transparent"
            />
            <p className="font-mono text-caption-1-semibold tracking-[0.16em] text-text-tertiary uppercase">
              ficha técnica
            </p>

            <dl className="mt-6 flex flex-col divide-y divide-separator-border">
              {SHEET.map((row) => (
                <div key={row.label} className="grid gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                  <dt className="font-mono text-caption-1-medium tracking-[0.1em] text-text-tertiary uppercase">
                    {row.label}
                  </dt>
                  <dd className="text-body-regular text-text-secondary">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 rounded-2xl border border-separator-border bg-background-secondary-default/60 p-4">
              <p className="text-body-medium text-text-primary">Disponibilidade</p>
              <p className="mt-1 text-body-regular text-text-secondary">
                {profile.availability}. Também aceito projetos freelance e conversas técnicas.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
