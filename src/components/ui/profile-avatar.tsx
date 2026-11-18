import { cx } from "@/utils/cx";

interface ProfileAvatarProps {
  className?: string;
  loading?: "lazy" | "eager";
}

/**
 * Portrait tile shown next to the name in the header and footer. It is
 * decorative: the adjacent text already names the person, so `alt` is empty.
 * Replace `public/images/profile/paulo-araujo.jpg` to update the photo.
 */
export function ProfileAvatar({ className, loading = "lazy" }: ProfileAvatarProps) {
  return (
    <img
      src="/images/profile/paulo-araujo.jpg"
      alt=""
      width={240}
      height={240}
      loading={loading}
      decoding="async"
      className={cx(
        "size-9 shrink-0 rounded-xl border border-separator-border bg-background-tertiary-default object-cover",
        className,
      )}
    />
  );
}
