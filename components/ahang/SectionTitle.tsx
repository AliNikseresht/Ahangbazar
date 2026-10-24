type Props = {
  title: string;
  action?: string;
};

export function SectionTitle({ title, action }: Props) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {action && <button type="button">{action}</button>}
    </div>
  );
}
