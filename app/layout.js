import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthProvider from "@/app/context/AuthProvider";
import { Toaster } from "react-hot-toast";
const poppin = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Travel Wavez",
  description:
    "Travel Wavez offer number of packeges and tour plans for you to enjoy your travels. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={poppin.className}>
          <Toaster position="top-right" />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
