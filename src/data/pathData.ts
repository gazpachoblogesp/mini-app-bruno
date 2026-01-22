export type LessonStatus = 'completed' | 'available' | 'locked';
export type LessonType = 'lesson' | 'dialog' | 'drill' | 'review' | 'checkpoint';

// Основной тип урока
export interface PathLesson {
  id: string;
  title: string;
  status: LessonStatus;
  type: LessonType;
  shortGoal: string;
  estimatedMinutes: number;
  xpReward: number;
  stars?: number;
}

// Тип секции (юнита)
export interface PathSection {
  id: number;
  title: string;
  description: string;
  gradient: string;
  icon: string;
  lessons: PathLesson[];
}

// Данные для A1.1
export const A11_LEARNING_PATH: PathSection[] = [
  {
    id: 1,
    title: "Старт общения",
    description: "Приветствия и базовые фразы",
    gradient: "from-emerald-400 to-teal-500",
    icon: "Sparkles",
    lessons: [
      {
        id: "A11-01",
        title: "Приветствия и прощания",
        shortGoal: "поздороваться и попрощаться",
        estimatedMinutes: 8,
        status: "completed",
        type: "lesson",
        xpReward: 15,
        stars: 3,
      },
      {
        id: "A11-02",
        title: "Как представиться",
        shortGoal: "имя/откуда/как дела",
        estimatedMinutes: 10,
        status: "completed",
        type: "lesson",
        xpReward: 20,
        stars: 3,
      },
      {
        id: "A11-03",
        title: "Вежливость и обращение",
        shortGoal: "tú vs usted",
        estimatedMinutes: 6,
        status: "completed",
        type: "drill",
        xpReward: 12,
        stars: 2,
      },
      {
        id: "A11-04",
        title: "Мини-диалог: знакомство",
        shortGoal: "короткий разговор 6–8 реплик",
        estimatedMinutes: 12,
        status: "available",
        type: "dialog",
        xpReward: 25,
      },
      {
        id: "A11-05",
        title: "Чекпоинт 1: старт",
        shortGoal: "собери мини-разговор",
        estimatedMinutes: 10,
        status: "locked",
        type: "checkpoint",
        xpReward: 30,
      },
    ],
  },
  {
    id: 2,
    title: "Люди и данные",
    description: "Числа, буквы и контактная информация",
    gradient: "from-blue-400 to-indigo-500",
    icon: "Users",
    lessons: [
      {
        id: "A11-06",
        title: "Буквы и произношение",
        shortGoal: "алфавит, чтение простых слов",
        estimatedMinutes: 10,
        status: "locked",
        type: "lesson",
        xpReward: 18,
      },
      {
        id: "A11-07",
        title: "Спеллинг и контактные данные",
        shortGoal: "имя, фамилия, email",
        estimatedMinutes: 8,
        status: "locked",
        type: "drill",
        xpReward: 15,
      },
      {
        id: "A11-08",
        title: "Числа 0–100",
        shortGoal: "номер телефона, возраст",
        estimatedMinutes: 10,
        status: "locked",
        type: "lesson",
        xpReward: 20,
      },
      {
        id: "A11-09",
        title: "Быстрые вопросы",
        shortGoal: "qué, cuál, cómo, dónde",
        estimatedMinutes: 8,
        status: "locked",
        type: "lesson",
        xpReward: 18,
      },
      {
        id: "A11-10",
        title: "Чекпоинт 2: анкета",
        shortGoal: "заполни анкету персонажа",
        estimatedMinutes: 12,
        status: "locked",
        type: "checkpoint",
        xpReward: 35,
      },
    ],
  },
  {
    id: 3,
    title: "Я и мой мир",
    description: "Профессия, страны и языки",
    gradient: "from-violet-400 to-purple-500",
    icon: "Globe",
    lessons: [
      {
        id: "A11-11",
        title: "Кто я: ser",
        shortGoal: "профессия, идентичность",
        estimatedMinutes: 10,
        status: "locked",
        type: "lesson",
        xpReward: 20,
      },
      {
        id: "A11-12",
        title: "Страны и языки",
        shortGoal: "soy de…, hablo…",
        estimatedMinutes: 9,
        status: "locked",
        type: "lesson",
        xpReward: 18,
      },
      {
        id: "A11-13",
        title: "Tener: вещи и возраст",
        shortGoal: "tengo…, años",
        estimatedMinutes: 8,
        status: "locked",
        type: "lesson",
        xpReward: 18,
      },
      {
        id: "A11-14",
        title: "Мини-диалог: в языковой школе",
        shortGoal: "представься + спроси",
        estimatedMinutes: 12,
        status: "locked",
        type: "dialog",
        xpReward: 25,
      },
      {
        id: "A11-15",
        title: "Повторение",
        shortGoal: "ser/hablar/tener + вопросы",
        estimatedMinutes: 10,
        status: "locked",
        type: "review",
        xpReward: 22,
      },
    ],
  },
  {
    id: 4,
    title: "Дом и места",
    description: "Где ты живёшь и как пройти",
    gradient: "from-amber-400 to-orange-500",
    icon: "Home",
    lessons: [
      {
        id: "A11-16",
        title: "Есть/имеется: hay",
        shortGoal: "что есть в комнате",
        estimatedMinutes: 8,
        status: "locked",
        type: "lesson",
        xpReward: 18,
      },
      {
        id: "A11-17",
        title: "Где находится: estar",
        shortGoal: "расположение",
        estimatedMinutes: 10,
        status: "locked",
        type: "lesson",
        xpReward: 20,
      },
      {
        id: "A11-18",
        title: "Предлоги места",
        shortGoal: "en, encima de, debajo de…",
        estimatedMinutes: 7,
        status: "locked",
        type: "drill",
        xpReward: 15,
      },
      {
        id: "A11-19",
        title: "Мой дом и комнаты",
        shortGoal: "описание дома",
        estimatedMinutes: 10,
        status: "locked",
        type: "lesson",
        xpReward: 20,
      },
      {
        id: "A11-20",
        title: "Мой район: места вокруг",
        shortGoal: "магазин, парк, метро",
        estimatedMinutes: 9,
        status: "locked",
        type: "lesson",
        xpReward: 18,
      },
      {
        id: "A11-21",
        title: "Как пройти?",
        shortGoal: "спросить дорогу",
        estimatedMinutes: 12,
        status: "locked",
        type: "dialog",
        xpReward: 25,
      },
      {
        id: "A11-22",
        title: "Чекпоинт 3: маршрут",
        shortGoal: "построй путь на карте",
        estimatedMinutes: 15,
        status: "locked",
        type: "checkpoint",
        xpReward: 40,
      },
    ],
  },
  {
    id: 5,
    title: "Люди рядом",
    description: "Семья, внешность и одежда",
    gradient: "from-pink-400 to-rose-500",
    icon: "Heart",
    lessons: [
      {
        id: "A11-23",
        title: "Внешность: описать человека",
        shortGoal: "alto/bajo, pelo…",
        estimatedMinutes: 10,
        status: "locked",
        type: "lesson",
        xpReward: 20,
      },
      {
        id: "A11-24",
        title: "Одежда и что на мне",
        shortGoal: "llevar",
        estimatedMinutes: 8,
        status: "locked",
        type: "lesson",
        xpReward: 18,
      },
      {
        id: "A11-25",
        title: "Семья: кто кому",
        shortGoal: "madre, hermano…",
        estimatedMinutes: 9,
        status: "locked",
        type: "lesson",
        xpReward: 18,
      },
      {
        id: "A11-26",
        title: "Притяжательные",
        shortGoal: "mi, tu, su",
        estimatedMinutes: 7,
        status: "locked",
        type: "drill",
        xpReward: 15,
      },
      {
        id: "A11-27",
        title: "Мини-диалог: расскажи о семье",
        shortGoal: "3–5 фраз",
        estimatedMinutes: 12,
        status: "locked",
        type: "dialog",
        xpReward: 25,
      },
      {
        id: "A11-28",
        title: "Итог A1.1",
        shortGoal: "самопрезентация + дом + семья",
        estimatedMinutes: 18,
        status: "locked",
        type: "checkpoint",
        xpReward: 50,
      },
    ],
  },
];
