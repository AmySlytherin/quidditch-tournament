import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav/Nav';

export const metadata: Metadata = {
  title: 'Quidditch League — Tournament Standings',
  description: 'Live standings, match results, and team stats for the Quidditch League tournament.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
