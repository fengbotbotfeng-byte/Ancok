import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function LightboxImage({ photo }) {
  const [failed, setFailed] = useState(false);
  const filename = photo.src ? photo.src.split("/").pop() : "";

  if (failed || !photo.src) {
    return (
      <div className="lightbox__missing" role="img" aria-label={`Foto belum tersedia: ${filename}`}>
        <span>foto belum ada</span>
        <code>public/images/{filename}</code>
      </div>
    );
  }
  return <img className="lightbox__img" src={photo.src} alt={photo.alt || ""} onError={() => setFailed(true)} draggable="false" />;
}

export default function PhotoLightbox({ photos, index, onClose, onChange }) {
  const total = photos.length;
  const photo = photos[index];
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const touchStart = useRef(null);

  const go = useCallback(
    (direction) => {
      if (total < 2) return;
      onChange((index + direction + total) % total);
    },
    [index, total, onChange]
  );

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        go(-1);
      } else if (event.key === "ArrowRight") {
        go(1);
      } else if (event.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll("button:not([disabled])");
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go, onClose]);

  // Muat lebih awal foto di kiri dan kanan agar perpindahan terasa instan.
  useEffect(() => {
    [-1, 1].forEach((offset) => {
      const neighbour = photos[(index + offset + total) % total];
      if (neighbour && neighbour.src && neighbour !== photo) {
        const img = new Image();
        img.src = neighbour.src;
      }
    });
  }, [index, photos, photo, total]);

  const onTouchStart = (event) => {
    const t = event.changedTouches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (event) => {
    if (!touchStart.current) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
  };

  if (!photo) return null;

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Penampil foto"
      ref={dialogRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox__bar">
        <p className="lightbox__count" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <button ref={closeRef} type="button" className="lightbox__icon-btn" onClick={onClose} aria-label="Tutup">
          <X size={22} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>

      <div
        className="lightbox__stage"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <figure className="lightbox__figure" key={photo.id}>
          <LightboxImage photo={photo} />
        </figure>
      </div>

      <div className="lightbox__footer">
        <button type="button" className="lightbox__icon-btn" onClick={() => go(-1)} aria-label="Foto sebelumnya" disabled={total < 2}>
          <ChevronLeft size={26} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <p className="lightbox__caption">{photo.caption || photo.alt}</p>
        <button type="button" className="lightbox__icon-btn" onClick={() => go(1)} aria-label="Foto berikutnya" disabled={total < 2}>
          <ChevronRight size={26} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body
  );
}
