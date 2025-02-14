'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Notification from '../components/Notification';

export default function Protected() {
  const router = useRouter();
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    const apiKey = sessionStorage.getItem('apiKey');
    if (!apiKey) {
      router.push('/playground');
      return;
    }

    // Show success notification when page loads
    setNotification({ message: 'Valid API key', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  }, [router]);

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Protected Playground</h1>
        {/* Add your protected content here */}
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
} 