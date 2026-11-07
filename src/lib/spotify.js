const TYPES = ["track", "album", "playlist", "episode", "show", "artist"];
const ID_PATTERN = /^[A-Za-z0-9]{22}$/;

function build(type, id) {
  return {
    type,
    id,
    openUrl: `https://open.spotify.com/${type}/${id}`,
    embedUrl: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`,
    // Lagu & episode memakai player ringkas, sisanya player tinggi.
    height: type === "track" || type === "episode" ? 152 : 352,
  };
}

export function parseSpotifyUrl(input) {
  if (typeof input !== "string") return null;
  const value = input.trim();
  if (!value) return null;

  const uri = value.match(/^spotify:(track|album|playlist|episode|show|artist):([A-Za-z0-9]{22})$/);
  if (uri) return build(uri[1], uri[2]);

  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  if (url.hostname !== "open.spotify.com" && url.hostname !== "play.spotify.com") return null;

  const segments = url.pathname.split("/").filter(Boolean);
  let i = 0;
  while (segments[i] && (/^intl-[a-z]{2}(-[a-z]+)?$/i.test(segments[i]) || segments[i] === "embed")) i += 1;

  const type = segments[i];
  const id = segments[i + 1];
  if (!TYPES.includes(type) || !ID_PATTERN.test(id || "")) return null;
  return build(type, id);
}

// Hanya izinkan tautan https untuk ditampilkan sebagai link cadangan.
export function safeHttpsUrl(input) {
  try {
    const url = new URL(String(input).trim());
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}
