import type { Metadata } from 'next';
import { Cinzel } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav/Nav';
import GoldenSnitch from '@/components/GoldenSnitch/GoldenSnitch';

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
    <html lang="en" className={cinzel.variable}>
      <body>
        <Nav />
        <GoldenSnitch />
        <main>{children}</main>
      </body>
    </html>
  );
}
