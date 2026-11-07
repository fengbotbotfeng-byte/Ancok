import { usPhotos } from "./us.js";

export const person = {
  name: "Rahma Aryani",
  birthDay: 11,
  birthMonth: 11,
  birthYear: 2009,
  timeZone: "Asia/Jakarta",
  displayDate: "11.11.2009",
  longDate: "11 November 2009",
  showAge: true,
};

//info situs 
export const site = {
  title: "Rahma Aryani",
  description:
    "Sebuah sudut kecil di internet, dibuat khusus untuk ulang tahun Rahma Aryani.",
  footerNote: "dibuat dengan sepenuh hati untuk Rahma Aryani",
};

// (true / false) untuk page "wishes"
export const features = {
  wishes: false,
};
export const landing = {
  autoEnterSeconds: 5,
};

// nav
export const nav = [
  { to: "/home", label: "Home", end: true },
  { to: "/gallery", label: "Gallery" },
  ...(usPhotos.length ? [{ to: "/us", label: "Us" }] : []),
  { to: "/letter", label: "Letter" },
  { to: "/music", label: "Music" },
].filter((item) => item.show !== false);

// hero 1
export const hero = {
  handNote: "happy birthday",
  headline: "a little corner of the world, just for you",
  description:
    "Tempat kecil ini dibuat untuk merayakan harimu. Ada foto-foto, sebuah surat, dan beberapa lagu. Silakan jalan-jalan pelan-pelan.",
  primaryCta: { label: "Open the gallery", to: "/gallery" },
  secondaryCta: usPhotos.length ? { label: "Our moments", to: "/us" } : null,
  mainPhoto: {
    src: "/images/image1.jpg",
    alt: "Foto Rahma Aryani",
    caption: "",
  },
  secondPhoto: {
    src: "/images/image2.jpg",
    alt: "Foto Rahma Aryani yang kedua",
    caption: "",
  },
  stampText: "Rahma Aryani · 11 November 2009 · happy birthday · ",
};

// section home
export const home = {
  intro: {
    title: "A Little Introduction",
    handNote: "hello, you",
    paragraphs: [
      "Ini adalah halaman kecil yang disiapkan khusus untuk Rahma Aryani. Tidak ada yang rumit di sini, hanya hal-hal yang ingin disimpan dan diberikan di hari ulang tahunnya.",
      "tulis mandiri disini, ttg cewekmu",
    ],
    facts: [
      { label: "Nama", value: "Rahma Aryani" },
      { label: "Lahir", value: "11 November 2009" },
    ],
  },

  moments: {
    title: "Little Moments",
    text: "Beberapa potongan kecil yang dikumpulkan di satu tempat. Kalau mau lihat semuanya, album lengkapnya ada di halaman Gallery.",
    cta: "See all the photos",
  },

  song: {
    title: "A Song for You",
    text: "Ada satu lagu yang ingin diperdengarkan hari ini. Tekan play kapan pun kamu siap.",
    cta: "Go to the music page",
    emptyTitle: "Lagu pilihan akan muncul di sini",
    emptyText: "Isi link Spotify di src/data/music.js.",
  },

  countdown: {
    title: "Birthday Countdown",
    text: "Menghitung mundur menuju 11 November, tanpa melewatkan satu detik pun.",
    untilTextWithAge: "menuju ulang tahun ke-{age}",
    untilText: "menuju hari ulang tahun",
    unitLabels: { days: "hari", hours: "jam", minutes: "menit", seconds: "detik" },
    birthdayTitle: "Selamat ulang tahun, Rahma Aryani",
    birthdayTextWithAge: "Hari ini kamu genap {age} tahun. Semoga harinya menyenangkan dari pagi sampai malam.",
    birthdayText: "Semoga harimu menyenangkan dari pagi sampai malam.",
  },

  note: {
    title: "A Little Note",
    text: "Terima kasih sudah mampir ke sudut kecil ini. Semoga harimu terasa ringan, hangat, dan penuh hal-hal baik.",
    signature: "with care",
  },
};
