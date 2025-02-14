export interface ApiKey {
  id: string;
  name: string;
  key: string;
  type: 'dev' | 'prod';
  usage: number;
  monthly_limit: number;
  created_at: string;
  updated_at: string;
} 