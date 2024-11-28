type Props = {
  children: React.ReactNode;
  isTextButton?: boolean;
  backgroundColor?: string;
};

export default function Button({
  children,
  isTextButton = false,
  backgroundColor,
  ...props
}: Props) {
  let cssClasses: string = "px-6 py-2 rounded-md";
  if (isTextButton) {
    cssClasses += " bg-transparent";
  } else {
    cssClasses += ` ${backgroundColor}`;
  }
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
