import { Link } from "react-router-dom";
import Photo from "../components/Photo.jsx";
import Reveal from "../components/Reveal.jsx";
import Countdown from "../components/Countdown.jsx";
import usePageTitle from "../hooks/usePageTitle.js";
import { person, hero, home } from "../data/birthday.js";
import { photos } from "../data/gallery.js";
import { tracks } from "../data/music.js";
import { parseSpotifyUrl } from "../lib/spotify.js";

function Stamp() {
  return (
    <svg className="hero__stamp" viewBox="0 0 120 120" role="img" aria-label={`Cap tanggal ${person.longDate}`}>
      <defs>
        <path id="stamp-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
      </defs>
      <g className="hero__stamp-spin">
        <circle cx="60" cy="60" r="57" className="stamp-ring" />
        <circle cx="60" cy="60" r="31" className="stamp-ring stamp-ring--thin" />
        <text className="stamp-text">
          <textPath href="#stamp-circle">{hero.stampText}</textPath>
        </text>
      </g>
      <text x="60" y="68" textAnchor="middle" className="stamp-day">
        {person.birthDay}
      </text>
    </svg>
  );
}

export default function Home() {
  usePageTitle("");

  const featured = photos.filter((p) => p.featured);
  const moments = (featured.length > 0 ? featured : photos).slice(0, 4);

  const track = tracks.find((t) => parseSpotifyUrl(t.spotifyUrl)) || tracks[0];
  const hasTrackInfo = Boolean(track && (track.title || track.artist));

  return (
    <>
      <section className="hero">
        <div className="hero__text">
          <h1 className="hero__name rise" style={{ "--i": 0 }}>
            {person.name}
            <span className="hero__hand" aria-hidden="true">
              {hero.handNote}
            </span>
          </h1>
          <p className="hero__headline rise" style={{ "--i": 1 }}>
            {hero.headline}
          </p>
          <p className="hero__desc rise" style={{ "--i": 2 }}>
            {hero.description}
          </p>
          <div className="hero__actions rise" style={{ "--i": 3 }}>
            <Link className="btn btn--primary" to={hero.primaryCta.to}>
              {hero.primaryCta.label}
            </Link>
            {hero.secondaryCta && (
              <Link className="btn btn--ghost" to={hero.secondaryCta.to}>
                {hero.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>

        <div className="hero__visual rise" style={{ "--i": 2 }}>
          <figure className={`polaroid hero-photo hero-photo--main${hero.mainPhoto.caption ? "" : " polaroid--bare"}`}>
            <Photo src={hero.mainPhoto.src} alt={hero.mainPhoto.alt} ratio="4/5" eager />
            {hero.mainPhoto.caption && <figcaption className="polaroid__caption">{hero.mainPhoto.caption}</figcaption>}
          </figure>
          <figure className={`polaroid hero-photo hero-photo--second${hero.secondPhoto.caption ? "" : " polaroid--bare"}`}>
            <Photo src={hero.secondPhoto.src} alt={hero.secondPhoto.alt} ratio="1/1" eager compact />
            {hero.secondPhoto.caption && <figcaption className="polaroid__caption">{hero.secondPhoto.caption}</figcaption>}
          </figure>
          <Stamp />
        </div>

        <p className="hero__vertical" aria-hidden="true">
          {person.displayDate}
        </p>
      </section>

      <section className="section intro">
        <div className="wrap intro__grid">
          <Reveal className="intro__head">
            <h2 className="section-title">{home.intro.title}</h2>
            {home.intro.handNote && <p className="hand-note hand-note--rotate">{home.intro.handNote}</p>}
          </Reveal>
          <Reveal className="intro__body" delay={120}>
            {home.intro.paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
            {home.intro.facts.length > 0 && (
              <dl className="facts">
                {home.intro.facts.map((fact) => (
                  <div className="facts__row" key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section moments">
        <div className="wrap">
          <Reveal className="moments__head">
            <h2 className="section-title">{home.moments.title}</h2>
            <p className="moments__text">{home.moments.text}</p>
            <Link className="text-link" to="/gallery">
              {home.moments.cta}
            </Link>
          </Reveal>

          <div className="moments__collage">
            {moments.map((photo, i) => (
              <Reveal key={photo.id} className={`moments__item moments__item--${i + 1}`} delay={i * 90}>
                <Link
                  to="/gallery"
                  className={`polaroid polaroid--interactive polaroid--bare moments__link`}
                  aria-label={`Lihat di galeri: ${photo.caption || photo.alt}`}
                >
                  <Photo src={photo.src} alt="" compact />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="song">
        <div className="wrap song__inner">
          <Reveal className="song__art" aria-hidden="true">
            <div className="vinyl">
              <span className="vinyl__label" />
            </div>
            <div className="sleeve">
              <span className="sleeve__name">{person.name}</span>
            </div>
          </Reveal>

          <Reveal className="song__text" delay={120}>
            <h2 className="section-title section-title--light">{home.song.title}</h2>
            <p className="song__lead">{home.song.text}</p>

            {hasTrackInfo ? (
              <p className="song__track">
                <span className="song__track-title">{track.title}</span>
                {track.artist && <span className="song__track-artist">{track.artist}</span>}
              </p>
            ) : (
              <p className="song__track song__track--empty">
                <span className="song__track-title">{home.song.emptyTitle}</span>
                <span className="song__track-artist">{home.song.emptyText}</span>
              </p>
            )}

            <Link className="btn btn--light" to="/music">
              {home.song.cta}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section countdown-section">
        <div className="wrap">
          <Reveal className="countdown-section__head">
            <h2 className="section-title">{home.countdown.title}</h2>
            <p>{home.countdown.text}</p>
          </Reveal>
          <Reveal delay={100}>
            <Countdown />
          </Reveal>
        </div>
      </section>

      <section className="section note-section">
        <div className="wrap">
          <Reveal className="note">
            <h2 className="note__title">{home.note.title}</h2>
            <p className="note__text">{home.note.text}</p>
            {home.note.signature && <p className="note__signature">{home.note.signature}</p>}
          </Reveal>
        </div>
      </section>
    </>
  );
}
