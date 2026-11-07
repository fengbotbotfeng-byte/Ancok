import usePageTitle from "../hooks/usePageTitle.js";
import Photo from "../components/Photo.jsx";
import Reveal from "../components/Reveal.jsx";
import { usPhotos as photos } from "../data/us.js";

export default function Us() {
  usePageTitle("Us");
  return <div className="wrap">
    <header className="page-head"><h1 className="page-title">Us</h1><div className="page-head__side"><p className="page-lead">A little collection of moments together.</p></div></header>
    {photos.length ? <div className="masonry">{photos.map((photo, i) => <Reveal key={photo.id} className="masonry__item" delay={(i % 4) * 70}><figure className="polaroid polaroid--bare"><Photo src={photo.src} alt={photo.alt} /></figure></Reveal>)}</div> : <div className="wishes-empty"><div className="wishes-empty__text"><h2>Our moments</h2><p>Tambahkan foto berdua ke folder <code>src/assets/us/</code>. Format JPG, PNG, atau WebP akan terbaca otomatis.</p></div></div>}
  </div>;
}
