import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import Wishes from "./pages/Wishes.jsx";
import Us from "./pages/Us.jsx";
import BirthdayLetter from "./pages/BirthdayLetter.jsx";
import Music from "./pages/Music.jsx";
import NotFound from "./pages/NotFound.jsx";
import { features } from "./data/birthday.js";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (location.pathname === "/") return <Landing />;

  return (
    <>
      <a className="skip-link" href="#main">
        Lompat ke konten
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        {/* key membuat transisi halus dijalankan ulang di setiap halaman */}
        <div className="page" key={location.pathname}>
          <Routes location={location}>
            <Route path="/home" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            {features.wishes && <Route path="/wishes" element={<Wishes />} />}
            <Route path="/us" element={<Us />} />
            <Route path="/letter" element={<BirthdayLetter />} />
            <Route path="/music" element={<Music />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
}
