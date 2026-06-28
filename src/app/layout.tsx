import type { Metadata } from 'next';
import { Cinzel } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav/Nav';
import GoldenSnitch from '@/components/GoldenSnitch/GoldenSnitch';
import GreatHallCeiling from '@/components/GreatHallCeiling/GreatHallCeiling';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hogwarts Quidditch',
  description: 'House standings, match results, and player rosters for Hogwarts Quidditch.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cinzel.variable} suppressHydrationWarning>
      <head>
        {/* Apply the visitor's saved Lumos/Nox choice before paint, so there's
            no flash of the wrong theme. Defaults to dark (Nox) if unset. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('theme')==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();",
          }}
        />
      </head>
      <body>
        <GreatHallCeiling />
        <Nav />
        <GoldenSnitch />
        <main>{children}</main>
      </body>
    </html>
  );
}
