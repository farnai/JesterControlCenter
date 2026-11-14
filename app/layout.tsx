import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jester · Launch Control Center",
  description: "Jester-ის განვითარების და 2027 წლის იანვრის გაშვების პირადი სამუშაო სივრცე.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka">
      <body className="antialiased">{children}</body>
    </html>
  );
}
