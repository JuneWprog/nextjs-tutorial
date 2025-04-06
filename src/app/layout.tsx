import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// static metadata
// export const metadata: Metadata = {
//   title: "Next 15 Tutorial",
//   description: "Tutorial of next app",
// };

//metadata object

export const metadata: Metadata ={
  title:{
    default:"nextjs tutorial",
    template:"%s | tutorial",
  },
  description :"nextjs tutorial "
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <header className="bg-amber-100 h-50"> Header</header>
        {children}
        <div className="bg-amber-100 font-serif font-weight-500 h-10 fixed bottom-0 w-full">Footer</div>
      </body>
    </html>
  );
}
