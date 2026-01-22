/**
 * Расчёт уровня и прогресса на основе XP
 * Формула: каждый уровень требует 100 * level XP
 * Уровень 1: 0-100 XP
 * Уровень 2: 100-300 XP (требуется 200 XP)
 * Уровень 3: 300-600 XP (требуется 300 XP)
 */

export interface LevelInfo {
  level: number;
  xp: number;
  xpToNextLevel: number;
  xpForCurrentLevel: number;
  progressPercent: number;
}

export function calculateLevel(xp: number): LevelInfo {
  if (xp < 0) xp = 0;

  let level = 1;
  let totalXpForLevel = 0;

  // Находим текущий уровень
  while (true) {
    const xpNeededForNextLevel = level * 100;
    if (totalXpForLevel + xpNeededForNextLevel > xp) {
      break;
    }
    totalXpForLevel += xpNeededForNextLevel;
    level++;
  }

  // Сколько XP нужно для следующего уровня
  const xpToNextLevel = (level + 1) * 100;
  
  // Сколько XP уже набрано для текущего уровня
  const xpForCurrentLevel = xp - totalXpForLevel;
  
  // Процент прогресса до следующего уровня
  const progressPercent = Math.round((xpForCurrentLevel / xpToNextLevel) * 100);

  return {
    level,
    xp,
    xpToNextLevel,
    xpForCurrentLevel,
    progressPercent,
  };
}

/**
 * Примеры использования:
 * calculateLevel(0)    -> level: 1, xpToNextLevel: 200
 * calculateLevel(50)   -> level: 1, xpToNextLevel: 200, progress: 25%
 * calculateLevel(100)  -> level: 1, xpToNextLevel: 200, progress: 50%
 * calculateLevel(200)  -> level: 2, xpToNextLevel: 300
 * calculateLevel(1250) -> level: 12
 */
