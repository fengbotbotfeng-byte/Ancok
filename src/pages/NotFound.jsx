import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle.js";

export default function NotFound() {
  usePageTitle("Halaman tidak ditemukan");

  return (
    <div className="wrap not-found">
      <p className="hand-note hand-note--rotate">sepertinya kamu tersesat</p>
      <h1 className="page-title">Halaman ini tidak ada</h1>
      <p className="page-lead">Alamat yang kamu buka tidak cocok dengan halaman mana pun. Kembali ke beranda dan mulai lagi dari sana.</p>
      <Link className="btn btn--primary" to="/home">
        Back to home
      </Link>
    </div>
  );
}
