import WishCard from "../components/WishCard.jsx";
import Reveal from "../components/Reveal.jsx";
import usePageTitle from "../hooks/usePageTitle.js";
import { wishes, wishesIntro } from "../data/wishes.js";
import { isWishVisible } from "../lib/wishes.js";

export default function Wishes() {
  usePageTitle("Wishes");

  const shown = wishes.map((wish, index) => ({ wish, index })).filter(({ wish }) => isWishVisible(wish));

  return (
    <div className="wrap">
      <header className="page-head page-head--wishes">
        <h1 className="page-title">{wishesIntro.title}</h1>
        <div className="page-head__side">
          <p className="page-lead">{wishesIntro.text}</p>
          {wishesIntro.handNote && <p className="hand-note hand-note--rotate">{wishesIntro.handNote}</p>}
        </div>
      </header>

      {shown.length > 0 ? (
        <div className="wishes-board">
          {shown.map(({ wish, index }, position) => (
            <Reveal key={wish.id} className="wishes-board__item" delay={(position % 3) * 90}>
              <WishCard wish={wish} index={index} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="wishes-empty">
          <div className="wishes-empty__text">
            <h2>{wishesIntro.emptyTitle}</h2>
            <p>{wishesIntro.emptyText}</p>
          </div>
          <ul className="wishes-empty__slots" aria-label="Slot ucapan yang masih kosong">
            {wishes.map((wish) => (
              <li key={wish.id}>{wish.label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
