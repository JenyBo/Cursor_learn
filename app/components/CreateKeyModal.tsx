import React, { useState, useEffect } from 'react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  type: 'dev' | 'prod';
  usage: number;
  createdAt: string;
}

interface CreateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, type: 'dev' | 'prod', limit: number) => void;
  initialData?: ApiKey | null;
}

export default function CreateKeyModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData 
}: CreateKeyModalProps) {
  const [keyName, setKeyName] = useState('');
  const [keyType, setKeyType] = useState<'dev' | 'prod'>('dev');
  const [monthlyLimit, setMonthlyLimit] = useState(1000);

  // Initialize form with existing data when editing
  useEffect(() => {
    if (initialData) {
      setKeyName(initialData.name);
      setKeyType(initialData.type);
      // Set monthly limit if you have it in your data model
    }
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#1E293B] rounded-lg p-6 w-full max-w-md text-gray-900 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? 'Edit API key' : 'Create a new API key'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          Enter a name and limit for the new API key.
        </p>

        <div className="space-y-6">
          {/* Key Name Input */}
          <div>
            <label className="block text-sm mb-1">
              Key Name <span className="text-gray-500 dark:text-gray-400">— A unique name to identify this key</span>
            </label>
            <input
              type="text"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="Key Name"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
            />
          </div>

          {/* Key Type Selection */}
          <div>
            <label className="block text-sm mb-3">
              Key Type <span className="text-gray-500 dark:text-gray-400">— Choose the environment for this key</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                <input
                  type="radio"
                  name="keyType"
                  value="prod"
                  checked={keyType === 'prod'}
                  onChange={() => setKeyType('prod')}
                  className="text-blue-500"
                />
                <div>
                  <div className="font-medium">Production</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Rate limited to 1,000 requests/minute</div>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                <input
                  type="radio"
                  name="keyType"
                  value="dev"
                  checked={keyType === 'dev'}
                  onChange={() => setKeyType('dev')}
                  className="text-blue-500"
                />
                <div>
                  <div className="font-medium">Development</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Rate limited to 100 requests/minute</div>
                </div>
              </label>
            </div>
          </div>

          {/* Monthly Limit Input */}
          <div>
            <label className="block text-sm mb-1">
              Limit monthly usage*
            </label>
            <input
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit(keyName, keyType, monthlyLimit);
              // Reset form and close modal
              setKeyName('');
              setKeyType('dev');
              setMonthlyLimit(1000);
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {initialData ? 'Save Changes' : 'Create'}
          </button>
        </div>

        <p>Don&apos;t worry, you can always generate a new key later.</p>
      </div>
    </div>
  );
} 