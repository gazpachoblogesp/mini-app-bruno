import * as React from "react";
import { calculateLevel, LevelInfo } from "@/lib/xp";

// Типы данных пользователя
export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  xpForCurrentLevel: number;
  progressPercent: number;
  streak: number;
  totalWords: number;
  accuracy: number;
  lessonsCompleted: number;
}

export interface User {
  id?: number;
  name: string;
  avatarUrl?: string;
  source: "telegram" | "guest";
  stats: UserStats;
}

const EMPTY_STATS: UserStats = {
  level: 1,
  xp: 0,
  xpToNextLevel: 200,
  xpForCurrentLevel: 0,
  progressPercent: 0,
  streak: 0,
  totalWords: 0,
  accuracy: 0,
  lessonsCompleted: 0,
};

let currentUser: User = {
  name: "Гость",
  source: "guest",
  stats: { ...EMPTY_STATS },
};

type Listener = (user: User) => void;
const listeners = new Set<Listener>();

function notifyListeners() {
  listeners.forEach((l) => l(currentUser));
}

export function getUser(): User {
  return currentUser;
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  listener(currentUser);
  return () => listeners.delete(listener);
}

export function updateStats(newStats: Partial<UserStats>) {
  currentUser = {
    ...currentUser,
    stats: {
      ...currentUser.stats,
      ...newStats,
    },
  };
  notifyListeners();
}

export function resetToGuest() {
  currentUser = {
    name: "Гость",
    source: "guest",
    stats: { ...EMPTY_STATS },
  };
  notifyListeners();
}

// ✅ ИСПРАВЛЕНО: Хардкоженный URL Worker
const WORKER_URL = "https://bruno-worker.bruno-miniapp.workers.dev";

export async function loadUserFromApi() {
  console.log("🔵 [loadUserFromApi] START");
  
  try {
    const tg = (window as any).Telegram?.WebApp;
    console.log("🔵 [loadUserFromApi] Telegram WebApp:", tg ? "✅ Found" : "❌ Not found");
    
    if (!tg) {
      console.warn("⚠️ [loadUserFromApi] No Telegram WebApp object");
      return;
    }

    const initData = tg.initData;
    console.log("🔵 [loadUserFromApi] initData:", initData ? `✅ Found (length: ${initData.length})` : "❌ Empty");
    
    if (!initData) {
      console.warn("⚠️ [loadUserFromApi] No Telegram initData, staying as guest");
      return;
    }

    console.log("🔵 [loadUserFromApi] API_URL:", WORKER_URL);
    console.log("🔵 [loadUserFromApi] Full URL:", `${WORKER_URL}/api/me`);

    console.log("🔵 [loadUserFromApi] Sending request...");
    const res = await fetch(`${WORKER_URL}/api/me`, {
      headers: {
        "x-telegram-init-data": initData,
      },
    });

    console.log("🔵 [loadUserFromApi] Response status:", res.status, res.statusText);

    if (!res.ok) {
      console.error("❌ [loadUserFromApi] Failed to load profile:", res.status, res.statusText);
      const errorText = await res.text();
      console.error("❌ [loadUserFromApi] Error response:", errorText);
      return;
    }

    const data = await res.json();
    console.log("🔵 [loadUserFromApi] Response data:", data);

    const profile = data.profile;
    const stats = data.stats;

    console.log("🔵 [loadUserFromApi] Parsed profile:", profile);
    console.log("🔵 [loadUserFromApi] Parsed stats:", stats);

    if (!profile || !stats) {
      console.error("❌ [loadUserFromApi] Invalid response structure:", data);
      return;
    }

    const levelInfo: LevelInfo = calculateLevel(stats.xp);
    console.log("🔵 [loadUserFromApi] Calculated level info:", levelInfo);

    const fullName = [profile.first_name, profile.last_name]
      .filter(Boolean)
      .join(" ")
      .trim();

    const name = fullName || profile.username || "Telegram User";
    console.log("🔵 [loadUserFromApi] User name:", name);

    currentUser = {
      id: profile.tg_id,
      name,
      avatarUrl: profile.photo_url || undefined,
      source: "telegram",
      stats: {
        level: levelInfo.level,
        xp: levelInfo.xp,
        xpToNextLevel: levelInfo.xpToNextLevel,
        xpForCurrentLevel: levelInfo.xpForCurrentLevel,
        progressPercent: levelInfo.progressPercent,
        streak: stats.streak,
        totalWords: 0,
        accuracy: 0,
        lessonsCompleted: 0,
      },
    };

    console.log("✅ [loadUserFromApi] User loaded successfully:", currentUser);
    notifyListeners();
  } catch (e) {
    console.error("❌ [loadUserFromApi] Unhandled error:", e);
    if (e instanceof Error) {
      console.error("❌ [loadUserFromApi] Error message:", e.message);
      console.error("❌ [loadUserFromApi] Error stack:", e.stack);
    }
  }
}

export function useUser(): User {
  const [user, setUser] = React.useState<User>(() => getUser());
  React.useEffect(() => subscribe(setUser), []);
  return user;
}
