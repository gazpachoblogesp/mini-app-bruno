import { motion } from "framer-motion";
import { ArrowLeft, Lock, Check, Star, Play, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { toast } from "sonner";

interface LessonNode {
  id: number;
  title: string;
  status: "completed" | "current" | "locked";
  xp?: number;
  stars?: number;
}

interface Unit {
  id: number;
  title: string;
  description: string;
  color: string;
  lessons: LessonNode[];
}

const learningPath: Unit[] = [
  {
    id: 1,
    title: "Основы",
    description: "Приветствия и базовые фразы",
    color: "from-emerald-400 to-teal-500",
    lessons: [
      { id: 1, title: "Приветствия", status: "completed", xp: 50, stars: 3 },
      { id: 2, title: "Знакомство", status: "completed", xp: 50, stars: 3 },
      { id: 3, title: "Числа 1-10", status: "completed", xp: 50, stars: 2 },
      { id: 4, title: "Цвета", status: "completed", xp: 50, stars: 3 },
    ],
  },
  {
    id: 2,
    title: "Семья",
    description: "Члены семьи и отношения",
    color: "from-amber-400 to-orange-500",
    lessons: [
      { id: 5, title: "Моя семья", status: "completed", xp: 50, stars: 3 },
      { id: 6, title: "Описание людей", status: "completed", xp: 50, stars: 2 },
      { id: 7, title: "Возраст", status: "completed", xp: 50, stars: 3 },
      { id: 8, title: "Профессии", status: "completed", xp: 50, stars: 1 },
    ],
  },
  {
    id: 3,
    title: "Действия",
    description: "Глаголы движения и действия",
    color: "from-sky-400 to-blue-500",
    lessons: [
      { id: 9, title: "Глаголы -ar", status: "completed", xp: 50, stars: 3 },
      { id: 10, title: "Глаголы -er", status: "completed", xp: 50, stars: 2 },
      { id: 11, title: "Глаголы -ir", status: "completed", xp: 50, stars: 3 },
      { id: 12, title: "Глаголы движения", status: "current" },
      { id: 13, title: "Повседневные действия", status: "locked" },
    ],
  },
  {
    id: 4,
    title: "Еда",
    description: "Продукты и ресторан",
    color: "from-rose-400 to-pink-500",
    lessons: [
      { id: 14, title: "Фрукты и овощи", status: "locked" },
      { id: 15, title: "В ресторане", status: "locked" },
      { id: 16, title: "Готовим вместе", status: "locked" },
      { id: 17, title: "Напитки", status: "locked" },
    ],
  },
];

export default function Path() {
  const handleLessonClick = (lesson: LessonNode) => {
    if (lesson.status === "locked") {
      toast.info("Урок заблокирован", { description: "Завершите предыдущие уроки" });
    } else if (lesson.status === "current") {
      // Navigate to lesson
    } else {
      toast.success("Урок пройден!", { description: `${lesson.xp} XP • ${lesson.stars} звезды` });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto pb-24">
      {/* Header */}
      <header className="flex items-center gap-4 px-5 py-4 border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-bold text-lg">Путь обучения</h1>
          <p className="text-sm text-muted-foreground">Испанский язык</p>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 rounded-full">
          <Crown className="w-4 h-4 text-primary" />
          <span className="font-bold text-primary text-sm">12</span>
        </div>
      </header>

      <main className="flex-1 px-5 py-6">
        {learningPath.map((unit, unitIndex) => (
          <motion.div
            key={unit.id}
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: unitIndex * 0.1 }}
          >
            {/* Unit Header */}
            <div className={`rounded-2xl p-4 mb-4 bg-gradient-to-r ${unit.color} text-white`}>
              <h2 className="font-extrabold text-lg">{unit.title}</h2>
              <p className="text-white/80 text-sm">{unit.description}</p>
            </div>

            {/* Lessons */}
            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

              {unit.lessons.map((lesson, lessonIndex) => {
                const isLast = lessonIndex === unit.lessons.length - 1;
                
                return (
                  <motion.div
                    key={lesson.id}
                    className={`relative ${!isLast && "mb-4"}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: unitIndex * 0.1 + lessonIndex * 0.05 }}
                  >
                    {/* Node */}
                    <div
                      className={`absolute -left-4 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        lesson.status === "completed"
                          ? "bg-emerald-500 text-white"
                          : lesson.status === "current"
                          ? "bg-primary text-primary-foreground animate-pulse"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {lesson.status === "completed" ? (
                        <Check className="w-4 h-4" />
                      ) : lesson.status === "current" ? (
                        <Play className="w-4 h-4" />
                      ) : (
                        <Lock className="w-3 h-3" />
                      )}
                    </div>

                    {/* Lesson Card */}
                    <Link href={lesson.status === "current" ? "/lesson" : "#"}>
                      <motion.button
                        className={`w-full card-cozy p-4 text-left ${
                          lesson.status === "locked" && "opacity-60"
                        }`}
                        onClick={() => handleLessonClick(lesson)}
                        whileHover={{ scale: lesson.status !== "locked" ? 1.02 : 1 }}
                        whileTap={{ scale: lesson.status !== "locked" ? 0.98 : 1 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-foreground">{lesson.title}</h3>
                            {lesson.status === "completed" && (
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">
                                  +{lesson.xp} XP
                                </span>
                                <div className="flex">
                                  {[...Array(3)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < (lesson.stars || 0)
                                          ? "text-amber-500 fill-amber-500"
                                          : "text-muted"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                            {lesson.status === "current" && (
                              <span className="text-xs text-primary font-medium">
                                Продолжить →
                              </span>
                            )}
                          </div>
                          
                          {lesson.status === "current" && (
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Play className="w-5 h-5 text-primary" />
                            </div>
                          )}
                        </div>
                      </motion.button>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
}
