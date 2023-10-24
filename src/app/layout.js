import './globals.css';
import { Inter } from 'next/font/google';

import BootstrapClient from './components/BootstrapClient';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Quick Quiz',
  description: 'Assess your English Learning',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " " + "body"} >{children}
        <BootstrapClient />
      </body>
    </html>
  );
}
