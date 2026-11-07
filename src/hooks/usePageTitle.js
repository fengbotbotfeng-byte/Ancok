import { useEffect } from "react";
import { site } from "../data/birthday.js";

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${site.title}` : `${site.title} · a little corner of the world`;
  }, [title]);
}
