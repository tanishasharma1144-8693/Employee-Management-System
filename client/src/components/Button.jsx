export default function Button({
  children,
  className,
  ...props
}) {
  return (
    <button
      {...props}
      className={`transition duration-300 hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}