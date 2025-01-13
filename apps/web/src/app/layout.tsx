import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TanstackProvider from '@/providers/TanstackProvider';
// import { Toaster } from '@/components/ui/toaster';
import { Toaster } from 'react-hot-toast';
import "primereact/resources/themes/lara-light-cyan/theme.css"; 
import AuthProvider from '@/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Roomify',
  description: 'Find Your Perfect Property Rental',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <AuthProvider>
            <Toaster/>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
