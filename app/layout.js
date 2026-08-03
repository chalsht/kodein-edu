// Mengimpor CSS global
import "./globals.css";

// Mengimpor Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Metadata website
export const metadata = {
  title: "Kodein Edu Center",
  description: "Belajar Coding Modern",
};

// Layout utama website
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>

        {/* Navbar tampil di semua halaman */}
        <Navbar />

        {/* Isi halaman */}
        {children}

        {/* Footer tampil di semua halaman */}
        <Footer />

      </body>
    </html>
  );
}