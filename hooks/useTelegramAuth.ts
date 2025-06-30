import { useState } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export function useTelegramAuth() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [loading, setLoading] = useState(false);

  const initiateTelegramAuth = async (): Promise<void> => {
    return new Promise((resolve) => {
      setLoading(true);
      
      // For web, we'll simulate the Telegram authentication
      // In production, this would integrate with Telegram's actual auth flow
      setTimeout(() => {
        const mockUser: TelegramUser = {
          id: 123456789,
          first_name: 'Alex',
          last_name: 'Johnson',
          username: 'alexskates',
          photo_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
          auth_date: Date.now(),
          hash: 'mock_hash_value',
        };
        
        setUser(mockUser);
        setLoading(false);
        resolve();
      }, 2000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    initiateTelegramAuth,
    logout,
  };
}