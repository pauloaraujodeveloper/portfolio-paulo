import { cx } from "@/utils/cx";

interface SectionHeadingProps {
  /** Small mono label above the title. */
  eyebrow: string;
  title: string;
  /** Trailing part of the title rendered with the gradient treatment. */
  accent?: string;
  description?: string;
  className?: string;
  align?: "start" | "center";
  /** Ties the section's `aria-labelledby` to this heading. */
  titleId?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  className,
  align = "start",
  titleId,
}: SectionHeadingProps) {
  return (
    <div
      className={cx(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className="font-mono text-caption-1-semibold tracking-[0.18em] text-text-tertiary uppercase">
        {eyebrow}
      </p>
      <h2 id={titleId} className="max-w-3xl text-display-3-semibold text-text-primary sm:text-display-2-semibold">
        {title}
        {accent ? (
          <>
            {" "}
            <span className="text-gradient">{accent}</span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p
          className={cx(
            "max-w-2xl text-headline-regular text-text-secondary",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
