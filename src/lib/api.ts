// src/lib/api.ts
// API клиент для работы с backend

import { getTelegramInitData } from './telegram';

// URL вашего Cloudflare Workers backend
const API_BASE_URL = 'https://bruno-worker.bruno-miniapp.workers.dev';

export interface UserProfile {
  tg_id: number;
  username: string | null;
  first_name: string;
  last_name: string | null;
  photo_url: string | null;
  language_code: string | null;
  xp: number;
  streak: number;
  last_active: string;
}

export interface UpdateStatsRequest {
  xp_delta: number;
  streak?: number;
}

export interface LessonProgress {
  lesson_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score: number | null;
  updated_at: string;
}

export interface UpdateProgressRequest {
  lesson_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Общий метод для выполнения запросов
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const initData = getTelegramInitData();
    
    if (!initData) {
      throw new Error('Telegram initData not available. Please open app in Telegram.');
    }

    const headers = {
      'Content-Type': 'application/json',
      'x-telegram-init-data': initData,
      ...options.headers,
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `Request failed: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Получить профиль пользователя
   */
  async getProfile(): Promise<UserProfile> {
    return this.request<UserProfile>('/api/me');
  }

  /**
   * Обновить статистику пользователя (XP, streak)
   */
  async updateStats(data: UpdateStatsRequest): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>('/api/stats', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Получить прогресс по урокам
   */
  async getProgress(): Promise<LessonProgress[]> {
    return this.request<LessonProgress[]>('/api/progress');
  }

  /**
   * Обновить прогресс по уроку
   */
  async updateProgress(data: UpdateProgressRequest): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>('/api/progress', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Экспортируем singleton экземпляр
export const api = new ApiClient(API_BASE_URL);
