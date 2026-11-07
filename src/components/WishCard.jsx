import { useEffect, useState } from "react";

const VARIANTS = ["paper", "note", "postcard"];
const SIZES = ["md", "lg", "sm", "md", "sm", "lg"];
const TILTS = [-1.2, 0.9, -0.5, 1.3, -0.9, 0.6];

function Avatar({ name, src }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  const initial = (name || "?").trim().charAt(0).toUpperCase() || "?";

  return (
    <span className="wish__avatar" aria-hidden="true">
      {src && !failed ? <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} /> : initial}
    </span>
  );
}

export default function WishCard({ wish, index }) {
  const variant = wish.variant && VARIANTS.includes(wish.variant) ? wish.variant : VARIANTS[index % VARIANTS.length];
  const size = SIZES[index % SIZES.length];
  const hasMessage = Boolean(wish.message && wish.message.trim());

  return (
    <article
      className={`wish wish--${variant} wish--${size}`}
      style={{ "--tilt": `${TILTS[index % TILTS.length]}deg` }}
    >
      <header className="wish__head">
        <Avatar name={wish.name} src={wish.avatar} />
        <div className="wish__who">
          <h3 className="wish__name">{wish.name && wish.name.trim() ? wish.name : wish.label}</h3>
          {wish.date && <p className="wish__date">{wish.date}</p>}
        </div>
      </header>
      <p className={`wish__message${hasMessage ? "" : " wish__message--empty"}`}>
        {hasMessage ? wish.message : "Pesan belum diisi."}
      </p>
    </article>
  );
}
