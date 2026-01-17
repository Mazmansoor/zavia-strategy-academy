import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/auth/AuthProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Zavia Strategy Academy',
  description: 'Master the art and science of strategy through The Canon, The Guild, and The Fellowship.',
  keywords: ['strategy', 'business', 'leadership', 'executive education', 'strategic thinking'],
  authors: [{ name: 'Zavia Strategy Academy' }],
  openGraph: {
    title: 'Zavia Strategy Academy',
    description: 'Master the art and science of strategy',
    url: 'https://zavia.academy',
    siteName: 'Zavia Strategy Academy',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
