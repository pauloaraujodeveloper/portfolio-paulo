import { useState } from "react";
import {
  RiCheckLine,
  RiFileCopyLine,
  RiGithubFill,
  RiLinkedinFill,
  RiMailLine,
  RiWhatsappLine,
} from "@remixicon/react";
import type { ComponentType } from "react";
import { Button, ButtonLink } from "@/components/base/buttons/button";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactMessage, profile } from "@/data/profile";
import type { SocialLink } from "@/data/profile";

const SOCIAL_ICON: Record<SocialLink["id"], ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  github: RiGithubFill,
  linkedin: RiLinkedinFill,
  email: RiMailLine,
  whatsapp: RiWhatsappLine,
};

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard denied (permissions or insecure context): the mailto link
      // above still works, so there is nothing to recover from.
      setCopied(false);
    }
  };

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative scroll-mt-24 border-t border-separator-border py-20 sm:py-24"
    >
      <div aria-hidden className="glow-soft pointer-events-none absolute inset-x-0 bottom-0 h-72 opacity-70" />

      <div className="container-page relative">
        <Reveal>
          <div
            data-reveal-item
            className="ring-gradient overflow-hidden rounded-3xl border border-separator-border bg-background-primary-default/70"
          >
            <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:p-14">
              <div>
                <SectionHeading
                  eyebrow="Contato"
                  title={contactMessage.title}
                  titleId="contato-title"
                  className="[&>h2]:max-w-[18ch] [&>h2]:text-display-3-semibold"
                />
                <p className="mt-5 max-w-lg text-headline-regular text-text-secondary">
                  {contactMessage.body}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <ButtonLink href={`mailto:${profile.email}`} variant="primary" leadingIcon={RiMailLine}>
                    Enviar email
                  </ButtonLink>
                  <Button
                    variant="secondary"
                    leadingIcon={copied ? RiCheckLine : RiFileCopyLine}
                    onClick={copyEmail}
                    aria-live="polite"
                  >
                    {copied ? "Email copiado" : "Copiar email"}
                  </Button>
                </div>

                <p className="mt-5 font-mono text-caption-1-regular text-text-tertiary">
                  {profile.availability} · {profile.location}
                </p>
              </div>

              <div className="flex flex-col justify-center">
                <p className="font-mono text-caption-1-semibold tracking-[0.16em] text-text-tertiary uppercase">
                  onde me encontrar
                </p>
                <ul className="mt-4 flex flex-col divide-y divide-separator-border border-y border-separator-border">
                  {profile.socials.map((social) => {
                    const Icon = SOCIAL_ICON[social.id];
                    const external = social.href.startsWith("http");
                    return (
                      <li key={social.id}>
                        <a
                          href={social.href}
                          {...(external
                            ? { target: "_blank", rel: "noreferrer noopener" }
                            : {})}
                          className="group flex items-center gap-4 rounded-lg py-4 outline-none transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                        >
                          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-separator-border bg-background-secondary-default text-foreground-icon-secondary transition-colors group-hover:text-electric-300">
                            <Icon className="size-4" aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-body-medium text-text-primary">
                              {social.label}
                            </span>
                            <span className="mt-0.5 block truncate text-caption-1-regular text-text-tertiary">
                              {social.hint}
                            </span>
                          </span>
                          <span className="text-caption-1-regular text-text-tertiary transition-transform duration-300 group-hover:-translate-y-0.5">
                            {external ? "abrir ↗" : "escrever →"}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-5 text-caption-1-regular text-text-tertiary">
                  Sem formulário e sem rastreamento: o contato vai direto para a minha caixa de
                  entrada.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
