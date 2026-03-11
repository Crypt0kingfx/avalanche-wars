import "./globals.css";
import Snow from "@/components/Snow";

export const metadata = {
  title: "Avalanche Wars",
  description: "NFT wallet analyzer and leaderboard for Avalanche gamers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">

        {/* SNOW EFFECT */}

        <Snow />

        {children}

      </body>
    </html>
  );
}