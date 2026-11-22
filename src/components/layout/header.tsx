import { useEffect, useState } from "react";
import { RiCloseLine, RiGithubFill, RiMenuLine } from "@remixicon/react";
import { Button, ButtonLink } from "@/components/base/buttons/button";
import { ProfileAvatar } from "@/components/ui/profile-avatar";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrolled } from "@/hooks/use-scrolled";
import { navItems } from "@/data/navigation";
import { cx } from "@/utils/cx";

const SECTION_IDS = navItems.map((item) => item.id);

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(16);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-separator-border bg-background-full/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#inicio"
          className="group flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-full"
          aria-label="Paulo Araújo, ir para o início"
        >
          <ProfileAvatar loading="eager" />
          <span className="flex flex-col whitespace-nowrap leading-none">
            <span className="text-body-semibold text-text-primary">Paulo Araújo</span>
            <span className="mt-1 font-mono text-[0.625rem] tracking-[0.14em] text-text-tertiary uppercase">
              Full Stack
            </span>
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cx(
                  "relative rounded-lg px-3 py-2 text-body-medium transition-colors",
                  "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                  isActive
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cx(
                    "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-electric-400 to-signal-cyan transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/pauloaraujodeveloper"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub de Paulo Araújo (abre em nova aba)"
            className="hidden size-9 place-items-center rounded-lg border border-separator-border text-foreground-icon-secondary transition-colors hover:border-border-button-hover hover:text-text-primary sm:grid"
          >
            <RiGithubFill className="size-4" aria-hidden />
          </a>

          <ButtonLink
            href="#contato"
            variant="primary"
            size="small"
            className="hidden sm:inline-flex"
          >
            Falar comigo
          </ButtonLink>

          <Button
            variant="secondary"
            size="small"
            iconOnly
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            leadingIcon={open ? RiCloseLine : RiMenuLine}
            onClick={() => setOpen((value) => !value)}
          />
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-separator-border bg-background-full/95 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Navegação principal (móvel)" className="container-page flex flex-col py-3">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              aria-current={active === item.id ? "true" : undefined}
              className={cx(
                "flex items-center justify-between rounded-lg px-3 py-3 text-body-medium transition-colors",
                active === item.id
                  ? "bg-background-secondary-default text-text-primary"
                  : "text-text-secondary hover:bg-background-secondary-default hover:text-text-primary",
              )}
            >
              {item.label}
              <span aria-hidden className="font-mono text-caption-2-medium text-text-tertiary">
                0{navItems.indexOf(item) + 1}
              </span>
            </a>
          ))}
          <a
            href="https://github.com/pauloaraujodeveloper"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-1 flex items-center gap-2 rounded-lg px-3 py-3 text-body-medium text-text-secondary hover:text-text-primary"
          >
            <RiGithubFill className="size-4" aria-hidden />
            GitHub
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
