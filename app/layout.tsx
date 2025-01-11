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
  description: "Transforme seus estudos em uma jornada emocionante! Nosso site combina aprendizado e gamificação, oferecendo desafios interativos, conquistas e recompensas para tornar o estudo mais motivador e eficiente. Explore conteúdos, suba de nível e domine novos conhecimentos de forma divertida!",
  icons: [
    {
      url: "../static/udel-black.svg"
    }
  ],
  twitter: {
    title: "Udel - uma nova forma de estudar",
    description: "Transforme seus estudos em uma jornada emocionante! Nosso site combina aprendizado e gamificação, oferecendo desafios interativos, conquistas e recompensas para tornar o estudo mais motivador e eficiente. Explore conteúdos, suba de nível e domine novos conhecimentos de forma divertida!",
    creator: "@astahjmo",
    images: ["../static/udel_-_natal.png"],
    card: "summary_large_image"
  },
  openGraph: {
    type: "website",
    url: "https://udel.study",
    title: "Udel - uma nova forma de estudar",
    description: "Transforme seus estudos em uma jornada emocionante! Nosso site combina aprendizado e gamificação, oferecendo desafios interativos, conquistas e recompensas para tornar o estudo mais motivador e eficiente. Explore conteúdos, suba de nível e domine novos conhecimentos de forma divertida!",
    images: [
      "../static/udel_-_natal.png"
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
