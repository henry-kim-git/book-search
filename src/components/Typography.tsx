export const TYPO_STYLES = {
  "Title-1": "font-bold text-[24px] leading-6",
  "Title-2": "font-bold text-[22px] leading-6",
  "Title-3": "font-bold text-[18px] leading-4.5",
  "Body-1": "font-medium text-[20px] leading-5",
  "Body-2": "font-medium text-[14px] leading-3.5",
  "Body-2-B": "font-bold text-[14px] leading-3.5",
  Caption: "font-medium text-[16px] leading-4",
  Small: "font-medium text-[10px] leading-2.5"
} as const;

export type TypoType = keyof typeof TYPO_STYLES;

type Props = {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  type: TypoType;
} & React.ComponentPropsWithoutRef<"p">;

export default function Typography({
  tag: Tag = "p",
  type,
  children,
  className,
  ...props
}: React.PropsWithChildren<Props>) {
  return (
    <Tag {...props} className={`${TYPO_STYLES[type]}${className ? ` ${className}` : ""}`}>
      {children}
    </Tag>
  );
}
