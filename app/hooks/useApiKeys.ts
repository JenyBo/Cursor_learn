import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  type: 'dev' | 'prod';
  usage: number;
  createdAt: string;
}

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApiKeys(data || []);
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  };

  const createKey = async (name: string, type: 'dev' | 'prod', limit: number) => {
    try {
      const newKey = `tv1y-${type}-${generateRandomString(32)}`;
      const { error } = await supabase
        .from('api_keys')
        .insert([
          {
            name,
            key: newKey,
            type,
            usage: 0,
            monthly_limit: limit
          }
        ]);

      if (error) throw error;
      await fetchApiKeys();
      return { success: true };
    } catch (error) {
      console.error('Error creating API key:', error);
      return { success: false, error };
    }
  };

  const updateKey = async (id: string, name: string, type: 'dev' | 'prod', limit: number) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .update({
          name,
          type,
          monthly_limit: limit
        })
        .eq('id', id);

      if (error) throw error;
      await fetchApiKeys();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const deleteKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchApiKeys();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    apiKeys,
    fetchApiKeys,
    createKey,
    updateKey,
    deleteKey
  };
};

const generateRandomString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}; 