"use client";


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/style.scss"
import Header from "../src/components/commonComps/Header";
import Footer from "../src/components/commonComps/Footer"
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePathname } from "next/navigation";
import { HelmetProvider } from "react-helmet-async";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const isHomepage = pathname === "/" ;
  const isAdminRoute = pathname.includes("/admin"); 

  const GA_TRACKING_ID = "G-PJZEHYJGZ3";

  return (
    <HelmetProvider>
    <html lang="en">
    <head>
          {/* Google Analytics Script */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </head>
        
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!isAdminRoute &&  <Header />}
        {/* <Header /> */}
        <main className="">
            {children}
          
          </main>
          {!isAdminRoute && <Footer />}
      </body>
    </html>
    </HelmetProvider>
  );
}
