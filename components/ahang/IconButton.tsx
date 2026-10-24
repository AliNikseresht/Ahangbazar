export function IconButton({
  label,
  children,
  onClick,
  active = false,
}: {
  label: string
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
}) {
  return (
    <button
      className={`icon-button ${active ? "active" : ""}`}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}