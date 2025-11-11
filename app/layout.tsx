import type { Metadata } from "next";
import { Schibsted_Grotesk,Martian_Mono } from "next/font/google";
import LightRays from '../components/LightRays';
import "./globals.css";
import NavBar from "@/components/NavBar";

const schibsted_Grotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martian_Mono = Martian_Mono({
  variable: "--font-martain-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevHub",
  description: "The Hub for Dev Event you mustn't miss"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibsted_Grotesk.variable} ${martian_Mono.variable} min-h-screen antialiased`}
      >
      <NavBar/>
        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
          
          <LightRays
            raysOrigin="top-center"
            raysColor="#5dfeca"
            raysSpeed={0.9}
            lightSpread={5}
            rayLength={2}
            followMouse={true}
            mouseInfluence={0.01}
            noiseAmount={0.0}
            distortion={0.05}
            className="custom-rays"
          />
        </div>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
