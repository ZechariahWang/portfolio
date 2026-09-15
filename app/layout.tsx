import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import ImagePreloader from "./components/ImagePreloader";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zech Wang",
  description: "Mechatronics Engineering student at University of Waterloo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `document.documentElement.classList.add('dark');`;

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/branding/dotlol2.png" type="image/png" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <ImagePreloader />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
