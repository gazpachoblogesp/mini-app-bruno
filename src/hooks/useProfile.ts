// src/hooks/useProfile.ts
// React hook для работы с профилем пользователя

import { useState, useEffect } from 'react';
import { api, UserProfile, UpdateStatsRequest } from '../lib/api';
import { isRunningInTelegram } from '../lib/telegram';

interface UseProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateStats: (data: UpdateStatsRequest) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    // Проверяем, что запущено в Telegram
    if (!isRunningInTelegram()) {
      setError('Приложение должно быть открыто в Telegram');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await api.getProfile();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки профиля');
      console.error('Failed to fetch profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = async (data: UpdateStatsRequest) => {
    try {
      await api.updateStats(data);
      // Обновляем профиль после изменения статистики
      await fetchProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка обновления статистики');
      console.error('Failed to update stats:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    updateStats,
    refetch: fetchProfile,
  };
}
