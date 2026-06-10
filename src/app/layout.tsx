import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";

const gabarito = Gabarito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-gabarito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "zvědomit | Koučování s Vojtěchem Majerem",
  description:
    "Odpovědi, směr, sílu, motivaci. Jen si to potřebujete zvědomit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={gabarito.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
