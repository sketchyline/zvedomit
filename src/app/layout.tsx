import type { Metadata } from "next";
import { Gabarito, Roboto } from "next/font/google";
import "./globals.css";

const gabarito = Gabarito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-gabarito",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "zvědomit | Koučování s Vojtěchem Majerem",
  description:
    "Odpovědi, směr, sílu, motivaci. Jen si to potřebujete zvědomit. Koučování vám dá prostor zastavit se, uvědomit si, rozhodnout se.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${gabarito.variable} ${roboto.variable}`}
        style={{ margin: 0, padding: 0 }}
      >
        {children}
      </body>
    </html>
  );
}
