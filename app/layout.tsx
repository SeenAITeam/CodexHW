import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'codexHW',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}
