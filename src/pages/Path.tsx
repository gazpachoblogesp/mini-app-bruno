import { motion } from "framer-motion";
import { ArrowLeft, Lock, Check, Star, Play, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { toast } from "sonner";
import { A11_LEARNING_PATH, type PathLesson } from "@/data/pathData";

export default function Path() {
  const handleLessonClick = (lesson: PathLesson) => {
    if (lesson.status === "locked") {
      toast.info("Урок заблокирован", { 
        description: "Завершите предыдущие уроки" 
      });
    } else if (lesson.status === "available") {
      // Navigate to lesson - TODO: заменить на реальный роут
      toast.success("Начинаем урок!", { 
        description: lesson.shortGoal 
      });
    } else {
      toast.success("Урок пройден!", { 
        description: `${lesson.xpReward} XP • ${lesson.stars} звезды` 
      });
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
          <p className="text-sm text-muted-foreground">Испанский язык • A1.1</p>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 rounded-full">
          <Crown className="w-4 h-4 text-primary" />
          <span className="font-bold text-primary text-sm">12</span>
        </div>
      </header>

      <main className="flex-1 px-5 py-6">
        {A11_LEARNING_PATH.map((unit, unitIndex) => (
          <motion.div
            key={unit.id}
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: unitIndex * 0.1 }}
          >
            {/* Unit Header */}
            <div className={`rounded-2xl p-4 mb-4 bg-gradient-to-r ${unit.gradient} text-white`}>
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
                          : lesson.status === "available"
                          ? "bg-primary text-primary-foreground animate-pulse"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {lesson.status === "completed" ? (
                        <Check className="w-4 h-4" />
                      ) : lesson.status === "available" ? (
                        <Play className="w-4 h-4" />
                      ) : (
                        <Lock className="w-3 h-3" />
                      )}
                    </div>

                    {/* Lesson Card */}
                    <Link href={lesson.status === "available" ? `/lesson/${lesson.id}` : "#"}>
                      <motion.button
                        className={`w-full card-cozy p-4 text-left ${
                          lesson.status === "locked" && "opacity-60"
                        }`}
                        onClick={() => handleLessonClick(lesson)}
                        whileHover={{ scale: lesson.status !== "locked" ? 1.02 : 1 }}
                        whileTap={{ scale: lesson.status !== "locked" ? 0.98 : 1 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-bold text-foreground">{lesson.title}</h3>
                            
                            {/* Short Goal */}
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {lesson.shortGoal}
                            </p>

                            {lesson.status === "completed" && (
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-xs text-muted-foreground">
                                  +{lesson.xpReward} XP
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
                            
                            {lesson.status === "available" && (
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-xs text-primary font-medium">
                                  Продолжить →
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  ~{lesson.estimatedMinutes} мин
                                </span>
                              </div>
                            )}

                            {lesson.status === "locked" && (
                              <span className="text-xs text-muted-foreground mt-1 block">
                                ~{lesson.estimatedMinutes} мин
                              </span>
                            )}
                          </div>
                          
                          {lesson.status === "available" && (
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ml-2">
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

        {/* Coming Soon: A1.2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: A11_LEARNING_PATH.length * 0.1 }}
          className="mt-8"
        >
          <button
            disabled
            className="w-full card-cozy p-4 opacity-60 cursor-not-allowed text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg">🔜</span>
              <span className="font-bold text-muted-foreground">Скоро: A1.2</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Продолжение курса испанского языка
            </p>
          </button>
        </motion.div>
      </main>
    </div>
  );
}
