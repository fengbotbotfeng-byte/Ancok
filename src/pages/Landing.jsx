import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home.jsx";
import usePageTitle from "../hooks/usePageTitle.js";

const SONG_URL = "https://u.pone.rs/qvbbldqa.mp3";

function Cake() {
  return (
    <div className="birthday-cake" aria-label="Kue ulang tahun tiga tingkat dengan lima lilin">
      <div className="cake-candles">
        {Array.from({ length: 5 }, (_, i) => <span className="cake-candle" key={i}><i /></span>)}
      </div>
      <div className="cake-tier cake-tier--top"><span className="cake-icing" /><span className="cake-strawberry s1" /><span className="cake-strawberry s2" /><span className="cake-strawberry s3" /></div>
      <div className="cake-tier cake-tier--middle"><span className="cake-icing" /></div>
      <div className="cake-tier cake-tier--bottom"><span className="cake-icing" /></div>
      <div className="cake-plate" />
    </div>
  );
}

export default function Landing() {
  usePageTitle();
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [mutedBlocked, setMutedBlocked] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const enter = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    const audio = audioRef.current;
    if (audio) {
      const fadeStart = performance.now();
      const initial = audio.volume;
      const fade = (now) => {
        const progress = Math.min(1, (now - fadeStart) / 850);
        audio.volume = Math.max(0, initial * (1 - progress));
        if (progress < 1) requestAnimationFrame(fade);
        else { audio.pause(); audio.currentTime = 0; }
      };
      requestAnimationFrame(fade);
    }
    window.setTimeout(() => navigate("/home", { replace: true }), 900);
  }, [leaving, navigate]);

  const startSong = useCallback(async () => {
    if (started) return;
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setStarted(true);
      setMutedBlocked(false);
    } catch {
      setMutedBlocked(true);
    }
  }, [started]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.72;
      startSong();
    }
    const timer = window.setTimeout(enter, 5000);
    const onKey = (event) => { if (event.key === "Enter") enter(); };
    window.addEventListener("keydown", onKey);
    return () => { window.clearTimeout(timer); window.removeEventListener("keydown", onKey); };
  }, [enter, startSong]);

  return (
    <div className={`birthday-intro${leaving ? " is-leaving" : ""}${started ? " is-playing" : ""}`} onClick={() => { if (!started) startSong(); else enter(); }}>
      <div className="birthday-home-underlay"><Home /></div>
      <div className="birthday-atmosphere" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => <span className={`birthday-balloon balloon-${i + 1}`} key={i} />)}
        <span className="birthday-butterfly butterfly-pink">🦋</span>
        <span className="birthday-butterfly butterfly-blue">🦋</span>
        <span className="birthday-hearts">♡　♡　♡</span>
      </div>
      <div className="birthday-cake-stage"><Cake /></div>
      <audio ref={audioRef} src={SONG_URL} preload="auto" onEnded={enter} onPlay={() => setStarted(true)} />
      {mutedBlocked && <button className="birthday-speaker" aria-label="Putar lagu" onClick={(e) => { e.stopPropagation(); startSong(); }}>♫</button>}
    </div>
  );
}
