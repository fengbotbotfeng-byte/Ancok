import Photo from "./Photo.jsx";

const TILTS = [-1.6, 1.1, -0.7, 1.7, -1.1, 0.6, -1.4, 1.3];
const TAPES = [
  "rgba(235, 217, 188, 0.88)",
  "rgba(217, 168, 170, 0.62)",
  "rgba(235, 217, 188, 0.88)",
  "rgba(190, 150, 160, 0.45)",
];

export default function PhotoCard({ photo, index, onOpen }) {
  const hasCaption = Boolean(photo.caption && photo.caption.trim());

  return (
    <figure
      className={`polaroid polaroid--interactive${hasCaption ? "" : " polaroid--bare"}`}
      style={{ "--tilt": `${TILTS[index % TILTS.length]}deg`, "--tape": TAPES[index % TAPES.length] }}
    >
      <button type="button" className="polaroid__button" onClick={() => onOpen(index)}>
        <Photo src={photo.src} alt={photo.alt} ratio={photo.ratio || "4/5"} />
        {hasCaption && <figcaption className="polaroid__caption">{photo.caption}</figcaption>}
        <span className="visually-hidden">, buka foto lebih besar</span>
      </button>
    </figure>
  );
}
