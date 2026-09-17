import { useEffect, useRef } from "react";
function stripHtml(html) {
  if (!html) return "No overview available.";
  return html.replace(/<[^>]*>/g, "");
}

export default function MovieModal({ show, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!show) return null;

  const backdrop = show.image?.original || show.image?.medium;
  const rating = show.rating?.average ? show.rating.average.toFixed(1) : "N/A";
  const genres = show.genres?.length ? show.genres.join(", ") : "Unknown";

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {backdrop && (
          <div className="modal__backdrop">
            <img src={backdrop} alt={show.name} />
          </div>
        )}

        <div className="modal__body">
          <h2 id="modal-title" className="modal__title">
            {show.name}
          </h2>
          <p className="modal__meta">
            <span>⭐ Rating: {rating}</span>
            <span>📅 Release: {show.premiered || "Unknown"}</span>
          </p>
          <p className="modal__meta modal__meta--secondary">
            <span>🎭 Genre: {genres}</span>
            {show.network?.name && <span>📡 Network: {show.network.name}</span>}
            {show.status && <span>🎬 Status: {show.status}</span>}
          </p>

          <h3 className="modal__section-heading">Overview</h3>
          <p className="modal__overview">{stripHtml(show.summary)}</p>

          <button
            type="button"
            className="btn btn--primary modal__close-btn"
            onClick={onClose}
          >
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  );
}
