import { motion } from "framer-motion";
import {
  ArrowLeft,
  Flame,
  Zap,
  Target,
  Calendar,
  Trophy,
  Settings,
  ChevronRight,
  Crown,
  Star,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";

type TgUser = {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

type UserStats = {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  totalWords: number;
  lessonsCompleted: number;
  accuracy: number;
  avatarUrl?: string;
};

const achievements = [
  {
    id: 1,
    icon: Flame,
    title: "7 дней подряд",
    description: "Учись каждый день",
    unlocked: true,
    color: "text-amber-500",
  },
  {
    id: 2,
    icon: Star,
    title: "Первая сотня",
    description: "Выучи 100 слов",
    unlocked: true,
    color: "text-amber-500",
  },
  {
    id: 3,
    icon: Target,
    title: "Снайпер",
    description: "90% точность",
    unlocked: false,
    color: "text-muted-foreground",
  },
  {
    id: 4,
    icon: Crown,
    title: "Мастер",
    description: "Достигни 20 уровня",
    unlocked: false,
    color: "text-muted-foreground",
  },
];

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const streakCalendar = [true, true, true, true, true, true, true];

// Мок для браузера (когда открываешь не из Telegram)
const FALLBACK_USER: TgUser = {
  first_name: "Гость",
  last_name: "",
  username: "web",
};

function getTelegramUserSafe(): TgUser | null {
  const tg = (window as any)?.Telegram?.WebApp;
  if (!tg) return null;

  // На всякий случай "приводим" WebApp в боевое состояние
  try {
    tg.ready?.();
    tg.expand?.();
  } catch {}

  const u: TgUser | undefined = tg?.initDataUnsafe?.user;
  return u ?? null;
}

function buildDisplayName(u: TgUser): string {
  const full = [u.first_name, u.last_name].filter(Boolean).join(" ").trim();
  if (full) return full;
  if (u.username) return `@${u.username}`;
  return "Пользователь";
}

export default function Profile() {
  const [tgUser, setTgUser] = useState<TgUser | null>(null);

  useEffect(() => {
    const u = getTelegramUserSafe();
    setTgUser(u);
  }, []);

  // Здесь пока статы могут быть из твоего API/ботов (когда подключишь),
  // но имя и аватар берём из Telegram.
  const userStats: UserStats = useMemo(() => {
    const u = tgUser ?? FALLBACK_USER;

    return {
      name: buildDisplayName(u),
      avatarUrl: u.photo_url || "/images/mascot-avatar.png",

      // ниже пока оставляем твои тестовые значения
      level: 12,
      xp: 1250,
      xpToNextLevel: 1500,
      streak: 7,
      totalWords: 156,
      lessonsCompleted: 24,
      accuracy: 87,
    };
  }, [tgUser]);

  const levelProgress = (userStats.xp / userStats.xpToNextLevel) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto pb-24">
      {/* Header */}
      <header className="flex items-center gap-4 px-5 py-4 border-b border-border/50">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="font-bold text-lg flex-1">Профиль</h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl"
          onClick={() =>
            toast.info("Настройки", { description: "Функция скоро будет доступна" })
          }
        >
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      <main className="flex-1 px-5 py-6 space-y-6">
        {/* User Card */}
        <motion.div
          className="card-cozy p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <img
                src={userStats.avatarUrl}
                alt="Аватар"
                className="w-16 h-16 rounded-full object-cover border-4 border-primary/20"
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                {userStats.level}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-extrabold text-foreground">{userStats.name}</h2>
              <p className="text-muted-foreground">Уровень {userStats.level}</p>
            </div>
          </div>

          {/* XP Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">До следующего уровня</span>
              <span className="font-bold text-primary">
                {userStats.xp} / {userStats.xpToNextLevel} XP
              </span>
            </div>
            <Progress value={levelProgress} className="h-3" />
          </div>

          {/* Подсказка — видно, в каком режиме открыто */}
          <div className="mt-3 text-xs text-muted-foreground">
            {tgUser ? "Источник имени: Telegram WebApp ✅" : "Открыто вне Telegram → режим Гость ⚠️"}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="card-cozy p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-amber-100 flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">{userStats.streak}</p>
            <p className="text-xs text-muted-foreground">дней подряд</p>
          </div>

          <div className="card-cozy p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">{userStats.xp}</p>
            <p className="text-xs text-muted-foreground">всего XP</p>
          </div>

          <div className="card-cozy p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-sky-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-sky-600" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">{userStats.totalWords}</p>
            <p className="text-xs text-muted-foreground">слов выучено</p>
          </div>

          <div className="card-cozy p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">{userStats.accuracy}%</p>
            <p className="text-xs text-muted-foreground">точность</p>
          </div>
        </motion.div>

        {/* Streak Calendar */}
        <motion.div
          className="card-cozy p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">Эта неделя</h3>
          </div>

          <div className="flex justify-between">
            {weekDays.map((day, index) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <span className="text-xs text-muted-foreground">{day}</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    streakCalendar[index]
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {streakCalendar[index] ? <Flame className="w-4 h-4" /> : <span className="text-xs">{index + 1}</span>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">Достижения</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary"
              onClick={() =>
                toast.info("Все достижения", { description: "Функция скоро будет доступна" })
              }
            >
              Все
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(achievements ?? []).map((achievement) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  className={`card-cozy p-4 ${!achievement.unlocked ? "opacity-50" : ""}`}
                  whileHover={achievement.unlocked ? { scale: 1.02 } : { scale: 1 }}
                >
                  <Icon className={`w-8 h-8 mb-2 ${achievement.color ?? "text-primary"}`} />
                  <h4 className="font-bold text-sm text-foreground">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
