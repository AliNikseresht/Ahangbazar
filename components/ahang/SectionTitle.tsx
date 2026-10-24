import { ChevronRight } from "lucide-react"

export function SectionTitle({
  title,
  action,
}: {
  title: string
  action: string
}) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      <button>
        {action}
        <ChevronRight size={15} />
      </button>
    </div>
  )
}