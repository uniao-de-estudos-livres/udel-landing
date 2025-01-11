import { Poppins } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Udel - uma nova forma de estudar",
  description: "Vem com a gente",
  icons: [
    {
      url: "../static/udel-black.svg"
    }
  ],
  twitter: {
    title: "Udel - uma nova forma de estudar",
    description: "Vem com a gente",
    creator: "@astahjmo",
    images: ["../static/udel-black.svg"],
    card: "summary_large_image"
  },
  openGraph: {
    type: "website",
    url: 'https://udel.com',
    title: 'Udel - uma nova forma de estudar',
    description: 'Vem com a gente',
    images: [
      "../static/udel-black.svg"
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
