'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Use useEffect to handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen bg-white dark:bg-[#0B1120]">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className={`flex-1 min-h-screen ${isSidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-8">
              {children}
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
} 