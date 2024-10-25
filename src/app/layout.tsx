import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Créer une application Next",
  description: "Généré par créer une application next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
