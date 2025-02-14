'use client';

import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import CreateKeyModal from '../components/CreateKeyModal';
import Notification from '../components/Notification';
import ApiKeysTable from '../components/ApiKeysTable';
import { useApiKeys, ApiKey } from '../hooks/useApiKeys';
import { useTheme } from '../hooks/useTheme';

export default function Dashboard() {
  const { apiKeys, fetchApiKeys, createKey, updateKey, deleteKey } = useApiKeys();
  const { theme, toggleTheme } = useTheme();
  const [totalCredits] = useState(1000);
  const [usedCredits] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateKey = async (name: string, type: 'dev' | 'prod', limit: number) => {
    const result = await createKey(name, type, limit);
    if (result.success) {
      showNotification('API key created successfully');
    } else {
      showNotification('Failed to create API key', 'error');
    }
  };

  const handleCopyKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      showNotification('Copied API Key to clipboard');
    } catch (err) {
      showNotification('Failed to copy API key', 'error');
    }
  };

  const handleEditKey = (key: ApiKey) => {
    setEditingKey(key);
    setIsEditModalOpen(true);
  };

  const handleUpdateKey = async (name: string, type: 'dev' | 'prod', limit: number) => {
    if (!editingKey) return;
    const result = await updateKey(editingKey.id, name, type, limit);
    if (result.success) {
      showNotification('API key updated successfully');
    } else {
      showNotification('Failed to update API key', 'error');
    }
  };

  const handleDeleteKey = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return;
    }

    const result = await deleteKey(id);
    if (result.success) {
      showNotification('API key deleted successfully', 'error');
    } else {
      showNotification('Failed to delete API key', 'error');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Current Plan Section - keep consistent gradient in both modes */}
        <div className="rounded-xl bg-gradient-to-r from-rose-200 via-purple-300 to-blue-300 p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-sm text-white/80 mb-2">CURRENT PLAN</div>
              <h1 className="text-4xl font-bold text-white">Researcher</h1>
            </div>
            <button className="bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/30">
              <span>Manage Plan</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2 text-white">
                <span>API Usage</span>
                <span>{usedCredits}/{totalCredits} Credits</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full" 
                  style={{ width: `${(usedCredits/totalCredits) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-white">
              <div className="w-4 h-4 rounded-full bg-white/80"/>
              <span>Pay as you go</span>
            </div>
          </div>
        </div>

        {/* API Keys Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">API Keys</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span>+</span>
              <span>New API Key</span>
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
          </p>

          <ApiKeysTable
            apiKeys={apiKeys}
            onEdit={handleEditKey}
            onDelete={handleDeleteKey}
            onCopy={handleCopyKey}
          />
        </div>

        {/* Contact Section */}
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            Have any questions, feedback or need support? We'd love to hear from you!
          </p>
          <button className="mt-4 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
            Contact us
          </button>
        </div>
      </div>

      <CreateKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateKey}
      />

      <CreateKeyModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingKey(null);
        }}
        onSubmit={handleUpdateKey}
        initialData={editingKey}
      />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <MoonIcon className="w-5 h-5" />
        ) : (
          <SunIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}