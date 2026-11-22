import { animate, stagger } from "animejs";
import { useLayoutEffect, useRef } from "react";
import { RiArrowRightLine, RiFileTextLine, RiGithubFill, RiLinkedinFill, RiMailLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { HeroConsole } from "@/components/sections/hero-console";
import { HeroStats } from "@/components/sections/hero-stats";
import { prefersReducedMotion } from "@/hooks/use-reduced-motion";
import { profile } from "@/data/profile";

export function Hero() {
  const root = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || prefersReducedMotion()) return;

    const steps = Array.from(element.querySelectorAll<HTMLElement>("[data-hero-step]"));
    for (const step of steps) step.style.opacity = "0";

    const animation = animate(steps, {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 860,
      delay: stagger(90, { start: 60 }),
      ease: "out(3)",
    });

    // The entrance is one-shot: cancel on unmount so nothing keeps a handle.
    return () => {
      animation.revert();
    };
  }, []);

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="surface-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_20%,#000_10%,transparent_100%)] opacity-40"
      />
      <div aria-hidden className="glow-soft pointer-events-none absolute inset-0" />

      <div
        ref={root}
        className="container-page relative grid items-center gap-16 pt-28 pb-20 sm:pt-36 sm:pb-28 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:pt-40"
      >
        <div className="flex flex-col items-start">
          <p
            data-hero-step
            className="flex items-center gap-2.5 rounded-full border border-separator-border bg-background-secondary-default/70 px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-text-secondary uppercase"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-signal-cyan shadow-[0_0_8px_1px_var(--color-signal-cyan)]" />
            {profile.availability}
          </p>

          <p
            data-hero-step
            className="mt-7 font-mono text-caption-1-medium tracking-[0.2em] text-electric-300 uppercase"
          >
            {profile.name}
            <span className="text-text-tertiary"> · Full Stack · Sistemas · Automação · IA</span>
          </p>

          <h1
            id="hero-title"
            data-hero-step
            className="mt-3 max-w-[16ch] text-display-2-semibold leading-[1.08] text-text-primary sm:text-display-1-semibold sm:leading-[1.05] lg:text-[3.75rem] lg:leading-[1.04]"
          >
            Construo sistemas que funcionam{" "}
            <span className="text-gradient">no dia a dia da operação.</span>
          </h1>

          <p data-hero-step className="mt-6 max-w-xl text-headline-regular text-text-secondary">
            {profile.role}. {profile.intro}
          </p>

          <div data-hero-step className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projetos" variant="primary" trailingIcon={RiArrowRightLine}>
              Explorar projetos
            </ButtonLink>
            <ButtonLink href="#contato" variant="secondary">
              Vamos conversar
            </ButtonLink>
            <ButtonLink
              href="/Paulo_Araujo_Curriculo.pdf"
              variant="ghost"
              leadingIcon={RiFileTextLine}
              target="_blank"
              rel="noreferrer noopener"
            >
              Currículo
              <span className="sr-only"> (PDF, abre em nova aba)</span>
            </ButtonLink>
          </div>

          <ul data-hero-step className="mt-9 flex flex-col gap-2.5">
            {profile.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2.5 text-body-regular text-text-secondary">
                <span aria-hidden className="h-px w-4 bg-electric-500/70" />
                {fact}
              </li>
            ))}
          </ul>

          <div
            data-hero-step
            className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-separator-border pt-5"
          >
            <a
              href="https://github.com/pauloaraujodeveloper"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 whitespace-nowrap text-body-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              <RiGithubFill className="size-4" aria-hidden />
              GitHub
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <a
              href="https://www.linkedin.com/in/pauloaraujo-dev/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 whitespace-nowrap text-body-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              <RiLinkedinFill className="size-4" aria-hidden />
              LinkedIn
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 whitespace-nowrap text-body-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              <RiMailLine className="size-4" aria-hidden />
              Email
            </a>
            <span className="font-mono text-caption-1-regular text-text-tertiary">
              {profile.location}
            </span>
          </div>
        </div>

        <div data-hero-step className="lg:pe-2">
          <HeroConsole />
        </div>

        <div data-hero-step className="lg:col-span-2">
          <HeroStats />
        </div>
      </div>
    </section>
  );
}
