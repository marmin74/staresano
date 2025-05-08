// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'StareSano App',
  description: 'App per fitness, benessere e alimentazione',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-[#f0fdf4] text-[#355e3b] font-sans">{children}</body>
    </html>
  );
}
