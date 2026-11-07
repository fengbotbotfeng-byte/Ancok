import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Music } from "lucide-react";
import { parseSpotifyUrl, safeHttpsUrl } from "../lib/spotify.js";

export default function SpotifyPlayer({ url, title, artist }) {
  const parsed = useMemo(() => parseSpotifyUrl(url), [url]);
  const [state, setState] = useState("loading"); // loading | loaded | slow | error
  const embedUrl = parsed ? parsed.embedUrl : null;

  useEffect(() => {
    setState("loading");
    if (!embedUrl) return undefined;
    const timer = setTimeout(() => setState((current) => (current === "loading" ? "slow" : current)), 9000);
    return () => clearTimeout(timer);
  }, [embedUrl]);

  const hasUrl = typeof url === "string" && url.trim() !== "";

  if (!hasUrl) {
    return (
      <div className="spotify spotify--empty">
        <Music size={22} strokeWidth={1.4} aria-hidden="true" />
        <p className="spotify__empty-title">Link Spotify belum diisi</p>
        <p className="spotify__empty-text">
          Tempel link lagu atau playlist di <code>src/data/music.js</code>, lalu player akan muncul di sini.
        </p>
      </div>
    );
  }

  if (!parsed) {
    const fallback = safeHttpsUrl(url);
    return (
      <div className="spotify spotify--error" role="alert">
        <Music size={22} strokeWidth={1.4} aria-hidden="true" />
        <p className="spotify__empty-title">Link Spotify tidak dikenali</p>
        <p className="spotify__empty-text">
          Gunakan link lengkap seperti <code>https://open.spotify.com/track/…</code> atau link playlist.
        </p>
        {fallback && (
          <a className="text-link" href={fallback} target="_blank" rel="noopener noreferrer">
            Buka tautan apa adanya
          </a>
        )}
      </div>
    );
  }

  const label = [title, artist].filter(Boolean).join(" oleh ");

  return (
    <div className="spotify">
      <div className="spotify__frame" style={{ height: parsed.height }}>
        <div className="spotify__skeleton" aria-hidden="true" />
        <iframe
          className="spotify__iframe"
          title={label ? `Spotify: ${label}` : "Pemutar Spotify"}
          src={parsed.embedUrl}
          width="100%"
          height={parsed.height}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
        />
      </div>

      {(state === "slow" || state === "error") && (
        <p className="spotify__hint" role="status">
          Player belum muncul? Koneksi atau pemblokir iklan kadang menghalanginya. Kamu tetap bisa mendengarkan lewat tombol di bawah.
        </p>
      )}

      <a className="btn btn--ghost btn--small" href={parsed.openUrl} target="_blank" rel="noopener noreferrer">
        Open in Spotify
        <ExternalLink size={16} strokeWidth={1.6} aria-hidden="true" />
      </a>
    </div>
  );
}
