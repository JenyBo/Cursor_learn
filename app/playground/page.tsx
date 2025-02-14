'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Notification from '../components/Notification';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (data.valid) {
        setNotification({ message: 'Valid API key', type: 'success' });
        // Store the API key in session storage for protected route
        sessionStorage.setItem('apiKey', apiKey);
        setTimeout(() => {
          router.push('/protected');
        }, 1000);
      } else {
        setNotification({ message: 'Invalid API key', type: 'error' });
      }
    } catch {
      setNotification({ message: 'Error validating API key', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Playground</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
              Enter your API Key
            </label>
            <input
              id="apiKey"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
              placeholder="tv1y-prod-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Validate & Continue
          </button>
        </form>
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