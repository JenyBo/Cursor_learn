import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, ClipboardIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ApiKey } from '../hooks/useApiKeys';

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  onEdit: (key: ApiKey) => void;
  onDelete: (id: string) => void;
  onCopy: (key: string) => void;
}

export default function ApiKeysTable({ apiKeys, onEdit, onDelete, onCopy }: ApiKeysTableProps) {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const maskApiKey = (key: string, isVisible: boolean) => {
    if (isVisible) return key;
    const prefix = key.split('-').slice(0, 2).join('-');
    return `${prefix}-${'*'.repeat(32)}`;
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-200 dark:border-gray-700">
          <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-400">NAME</th>
          <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-400">TYPE</th>
          <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-400">USAGE</th>
          <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-400">KEY</th>
          <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-400">OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {apiKeys.map((apiKey) => (
          <tr key={apiKey.id} className="border-b border-gray-200 dark:border-gray-700">
            <td className="px-6 py-4">{apiKey.name}</td>
            <td className="px-6 py-4">
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                {apiKey.type}
              </span>
            </td>
            <td className="px-6 py-4">{apiKey.usage}</td>
            <td className="px-6 py-4">
              <code className="font-mono bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded">
                {maskApiKey(apiKey.key, visibleKeys.has(apiKey.id))}
              </code>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-4">
                <button 
                  onClick={() => toggleKeyVisibility(apiKey.id)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  {visibleKeys.has(apiKey.id) ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
                <button 
                  onClick={() => onCopy(apiKey.key)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <ClipboardIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onEdit(apiKey)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onDelete(apiKey.id)}
                  className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 