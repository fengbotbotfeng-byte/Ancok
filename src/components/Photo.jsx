import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";

   // Foto dengan bingkai berformat tetap, fade-in setelah termuat, dan
     // placeholder yang menampilkan nama file bila gambar tidak ditemukan.
        //
           // ratio: "4/5" | "1/1" | ... | "auto" (rasio asli) | undefined (diatur lewat CSS)
export default function Photo({ src, alt = "", ratio, eager = false, compact = false, className = "" }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, [src]);

  const auto = ratio === "auto";
  const style = ratio && !auto ? { aspectRatio: ratio } : undefined;
  const filename = src ? src.split("/").pop() : "imageN.jpg";

  return (
    <div className={`photo${auto ? " photo--auto" : ""}${className ? ` ${className}` : ""}`} style={style}>
      {!src || failed ? (
        <div
          className={`photo-placeholder${compact ? " photo-placeholder--compact" : ""}`}
          role="img"
          aria-label={`Foto belum tersedia. Masukkan file ${filename} ke folder public/images`}
        >
          <Camera size={compact ? 18 : 22} strokeWidth={1.4} aria-hidden="true" />
          <span className="photo-placeholder__label">foto belum ada</span>
          <code>public/images/{filename}</code>
        </div>
      ) : (
        <img
          ref={imgRef}
          className={`photo-img${loaded ? " is-loaded" : ""}`}
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
