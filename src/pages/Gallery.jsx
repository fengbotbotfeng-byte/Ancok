import { useMemo, useState } from "react";
import PhotoCard from "../components/PhotoCard.jsx";
import PhotoLightbox from "../components/PhotoLightbox.jsx";
import Reveal from "../components/Reveal.jsx";
import usePageTitle from "../hooks/usePageTitle.js";
import { galleryIntro, photos } from "../data/gallery.js";

export default function Gallery() {
  usePageTitle("Gallery");

  const [category, setCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(photos.map((p) => p.category).filter(Boolean)));
    return unique.length > 1 ? ["all", ...unique] : [];
  }, []);

  const visible = useMemo(
    () => (category === "all" ? photos : photos.filter((p) => p.category === category)),
    [category]
  );

  return (
    <div className="wrap">
      <header className="page-head page-head--gallery">
        <div className="page-head__main">
          <h1 className="page-title">{galleryIntro.title}</h1>
          <p className="page-lead">{galleryIntro.text}</p>
        </div>
        <p className="page-head__count">
          <span className="page-head__count-num">{String(visible.length).padStart(2, "0")}</span>
          <span className="visually-hidden">foto</span>
          <span className="hand-note">{galleryIntro.handNote}</span>
        </p>
      </header>

      {categories.length > 0 && (
        <div className="filters" role="group" aria-label="Filter kategori foto">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              className={`filter${category === name ? " is-active" : ""}`}
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="empty-state">
          <h2>{galleryIntro.emptyTitle}</h2>
          <p>{galleryIntro.emptyText}</p>
        </div>
      ) : (
        <div className="masonry" key={category}>
          {visible.map((photo, i) => (
            <Reveal key={photo.id} className="masonry__item" delay={(i % 3) * 80}>
              <PhotoCard photo={photo} index={i} onOpen={setOpenIndex} />
            </Reveal>
          ))}
        </div>
      )}

      {openIndex !== null && visible[openIndex] && (
        <PhotoLightbox photos={visible} index={openIndex} onClose={() => setOpenIndex(null)} onChange={setOpenIndex} />
      )}
    </div>
  );
}
