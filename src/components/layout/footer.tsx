import { RiArrowUpLine, RiGithubFill, RiHeart3Line, RiLinkedinFill, RiMailLine } from "@remixicon/react";
import { ProfileAvatar } from "@/components/ui/profile-avatar";
import { profile } from "@/data/profile";

const NAV_ITEMS = [
  { id: "sobre", label: "Sobre" },
  { id: "projetos", label: "Projetos" },
  { id: "tecnologias", label: "Tecnologias" },
  { id: "engenharia", label: "Engenharia" },
  { id: "contato", label: "Contato" },
] as const;

/** Evaluated once at build/import time, so render stays pure. */
const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-separator-border bg-background-full">
      <div className="container-page flex flex-col gap-10 py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm">
            <a
              href="#inicio"
              className="inline-flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-full"
            >
              <ProfileAvatar />
              <span className="flex flex-col leading-none">
                <span className="text-body-semibold text-text-primary">{profile.name}</span>
                <span className="mt-1 font-mono text-[0.625rem] tracking-[0.14em] text-text-tertiary uppercase">
                  {profile.role}
                </span>
              </span>
            </a>
            <p className="mt-4 text-body-regular text-text-secondary">
              Portfólio construído com React 19, TypeScript, Tailwind CSS 4, BoardUI e Anime.js.
              Todo o conteúdo descreve projetos reais.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="w-fit rounded text-body-regular text-text-secondary transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:outline-none"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex w-fit items-center gap-2 rounded text-body-regular text-text-secondary transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:outline-none"
            >
              <RiMailLine className="size-4" aria-hidden />
              {profile.email}
            </a>
            <a
              href="https://github.com/pauloaraujodeveloper"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex w-fit items-center gap-2 rounded text-body-regular text-text-secondary transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:outline-none"
            >
              <RiGithubFill className="size-4" aria-hidden />
              github.com/pauloaraujodeveloper
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <a
              href="https://www.linkedin.com/in/pauloaraujo-dev/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex w-fit items-center gap-2 rounded text-body-regular text-text-secondary transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:outline-none"
            >
              <RiLinkedinFill className="size-4" aria-hidden />
              linkedin.com/in/pauloaraujo-dev
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <a
              href="#inicio"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded text-caption-1-regular text-text-tertiary transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:outline-none"
            >
              <RiArrowUpLine className="size-3.5" aria-hidden />
              Voltar ao topo
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-separator-border pt-6 sm:flex-row sm:items-center">
          <p className="text-caption-1-regular text-text-tertiary">
            © {YEAR} {profile.name}. Código e conteúdo próprios.
          </p>
          <p className="inline-flex items-center gap-1.5 text-caption-1-regular text-text-tertiary">
            Feito para ser lido, não para impressionar
            <RiHeart3Line className="size-3.5 text-electric-400" aria-hidden />
          </p>
        </div>
      </div>
    </footer>
  );
}
