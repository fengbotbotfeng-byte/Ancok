import { Link } from "react-router-dom";
import { nav, person, site } from "../data/birthday.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__hand">{site.footerNote}</p>
          <p className="site-footer__meta">{person.displayDate}</p>
        </div>
        <nav aria-label="Navigasi footer">
          <ul className="site-footer__links">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
