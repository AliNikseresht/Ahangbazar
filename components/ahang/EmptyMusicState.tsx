"use client";

type Props = {
  onRetry: () => void;
};

export function EmptyMusicState({ onRetry }: Props) {
  return (
    <div className="empty-state">
      <h2>No music available</h2>
      <p>Something went wrong while loading tracks.</p>
      <button type="button" className="primary" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}