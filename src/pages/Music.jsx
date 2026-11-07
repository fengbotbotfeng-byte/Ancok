import SpotifyPlayer from "../components/SpotifyPlayer.jsx";
import Reveal from "../components/Reveal.jsx";
import usePageTitle from "../hooks/usePageTitle.js";
import { musicIntro, tracks } from "../data/music.js";

export default function Music() {
  usePageTitle("Music");

  const [first, ...rest] = tracks;
  const extra = rest.filter((t) => t.spotifyUrl && t.spotifyUrl.trim() !== "");
  const hasInfo = (t) => Boolean(t.title || t.artist);

  return (
    <div className="wrap">
      <header className="page-head page-head--music">
        <div className="page-head__main">
          <h1 className="page-title">{musicIntro.title}</h1>
          <p className="page-lead">{musicIntro.text}</p>
        </div>
        <div className="vinyl vinyl--small" aria-hidden="true">
          <span className="vinyl__label" />
        </div>
      </header>

      {first && (
        <section className="music-feature" aria-label={first.title || "Lagu utama"}>
          <div className="music-feature__info">
            {hasInfo(first) && (
              <p className="music-feature__meta">
                <span className="music-feature__title">{first.title}</span>
                {first.artist && <span className="music-feature__artist">{first.artist}</span>}
              </p>
            )}
            {first.note && <p className="music-feature__note">{first.note}</p>}
            {musicIntro.handNote && <p className="hand-note hand-note--rotate">{musicIntro.handNote}</p>}
          </div>
          <div className="music-feature__player">
            <SpotifyPlayer url={first.spotifyUrl} title={first.title} artist={first.artist} />
          </div>
        </section>
      )}

      {extra.length > 0 && (
        <section className="music-more" aria-labelledby="music-more-title">
          <h2 id="music-more-title" className="section-title">
            {musicIntro.moreTitle}
          </h2>
          <ul className="music-more__list">
            {extra.map((track, i) => (
              <Reveal as="li" key={track.id} className="track" delay={i * 80}>
                <div className="track__info">
                  {hasInfo(track) && (
                    <p className="track__meta">
                      <span className="track__title">{track.title}</span>
                      {track.artist && <span className="track__artist">{track.artist}</span>}
                    </p>
                  )}
                  {track.note && <p className="track__note">{track.note}</p>}
                </div>
                <div className="track__player">
                  <SpotifyPlayer url={track.spotifyUrl} title={track.title} artist={track.artist} />
                </div>
              </Reveal>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
