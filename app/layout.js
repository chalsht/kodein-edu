import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Kodein Edu Center",
  description: "Belajar Coding Modern",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>

        {/* Navbar & Footer hanya untuk halaman selain dashboard */}
        {typeof children?.props?.childProp?.segment !== "string" && (
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        )}

        {/* Dashboard */}
        {typeof children?.props?.childProp?.segment === "string" &&
          children}

      </body>
    </html>
  );
}