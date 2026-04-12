import type { ReactNode } from "react";

interface ModalSheetProps {
  title: string;
  description: string;
  children: ReactNode;
  onClose: () => void;
}

export function ModalSheet({
  title,
  description,
  children,
  onClose
}: ModalSheetProps) {
  return (
    <div className="sheet-backdrop" role="presentation" onClick={onClose}>
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sheet__top">
          <div>
            <p className="sheet__eyebrow">DeshRide</p>
            <h2 id="sheet-title">{title}</h2>
            <p>{description}</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close panel">
            ×
          </button>
        </div>
        <div className="sheet__body">{children}</div>
      </div>
    </div>
  );
}
