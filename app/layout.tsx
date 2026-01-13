import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FAANG Resume Generator - ATS-Friendly Resume Builder',
  description: 'Create professional, ATS-friendly resumes following Tech Interview Handbook principles. Perfect for software engineers applying to top tech companies.',
  keywords: ['resume', 'CV', 'ATS', 'FAANG', 'software engineer', 'tech jobs'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
