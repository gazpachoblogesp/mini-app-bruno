import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Volume2, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

interface Question {
  id: number;
  type: "multiple-choice" | "translation" | "listening";
  question: string;
  questionRu?: string;
  options?: string[];
  correctAnswer: string;
  hint?: string;
}

const lessonQuestions: Question[] = [
  {
    id: 1,
    type: "multiple-choice",
    question: "Как сказать «идти» по-испански?",
    options: ["correr", "caminar", "saltar", "nadar"],
    correctAnswer: "caminar",
  },
  {
    id: 2,
    type: "translation",
    question: "Переведи: «Я хожу в школу»",
    correctAnswer: "camino a la escuela",
    hint: "caminar → camino (я)",
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "Выбери правильный перевод «correr»",
    options: ["плавать", "прыгать", "бежать", "летать"],
    correctAnswer: "бежать",
  },
  {
    id: 4,
    type: "listening",
    question: "Ella corre por el parque",
    questionRu: "Что означает это предложение?",
    options: ["Она идёт по парку", "Она бежит по парку", "Она плавает в парке", "Она прыгает в парке"],
    correctAnswer: "Она бежит по парку",
  },
  {
    id: 5,
    type: "translation",
    question: "Переведи: «Птицы летают»",
    correctAnswer: "los pájaros vuelan",
    hint: "volar → vuelan (они)",
  },
];

export default function Lesson() {
  const [, setLocation] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [inputAnswer, setInputAnswer] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const currentQuestion = lessonQuestions[currentIndex];
  const progress = (currentIndex / lessonQuestions.length) * 100;
  const isComplete = currentIndex >= lessonQuestions.length;

  const handleCheck = () => {
    const answer = currentQuestion.type === "translation" ? inputAnswer.toLowerCase().trim() : selectedAnswer;
    const correct = answer === currentQuestion.correctAnswer.toLowerCase();
    
    setIsChecked(true);
    setIsCorrect(correct);

    if (correct) {
      setXpEarned(xpEarned + 10);
      toast.success("¡Correcto!", { description: "+10 XP" });
    } else {
      setLives(lives - 1);
      if (lives <= 1) {
        toast.error("Жизни закончились", { description: "Попробуй ещё раз позже" });
      }
    }
  };

  const handleContinue = () => {
    if (lives <= 0) {
      setLocation("/");
      return;
    }
    
    setSelectedAnswer(null);
    setInputAnswer("");
    setIsChecked(false);
    setIsCorrect(false);
    setCurrentIndex(currentIndex + 1);
  };

  const handlePlayAudio = () => {
    toast.info("Аудио", { description: currentQuestion.question });
  };

  const handleExit = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
        <Button variant="ghost" size="icon" className="rounded-xl" onClick={handleExit}>
          <X className="w-5 h-5" />
        </Button>
        
        <div className="flex-1">
          <Progress value={progress} className="h-3" />
        </div>
        
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 ${i < lives ? "text-red-500 fill-red-500" : "text-muted"}`}
            />
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 py-6 flex flex-col">
        {!isComplete && lives > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="flex-1 flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Question */}
              <div className="mb-6">
                {currentQuestion.type === "listening" && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full mb-4 py-8 rounded-2xl border-2 border-primary/30 hover:border-primary"
                    onClick={handlePlayAudio}
                  >
                    <Volume2 className="w-8 h-8 text-primary mr-3" />
                    <span className="text-lg font-semibold">{currentQuestion.question}</span>
                  </Button>
                )}
                
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {currentQuestion.type === "listening" 
                    ? currentQuestion.questionRu 
                    : currentQuestion.question}
                </h2>
                
                {currentQuestion.hint && !isChecked && (
                  <p className="text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                    💡 {currentQuestion.hint}
                  </p>
                )}
              </div>

              {/* Answer Options */}
              <div className="flex-1">
                {currentQuestion.type === "translation" ? (
                  <div className="space-y-4">
                    <Input
                      placeholder="Введи перевод..."
                      value={inputAnswer}
                      onChange={(e) => setInputAnswer(e.target.value)}
                      disabled={isChecked}
                      className="text-lg py-6 rounded-xl bg-card border-2 focus:border-primary"
                      onKeyDown={(e) => e.key === "Enter" && !isChecked && inputAnswer && handleCheck()}
                    />
                    {isChecked && !isCorrect && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-emerald-100 rounded-xl"
                      >
                        <p className="text-sm text-muted-foreground mb-1">Правильный ответ:</p>
                        <p className="font-bold text-foreground">{currentQuestion.correctAnswer}</p>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options?.map((option) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrectOption = option === currentQuestion.correctAnswer;
                      
                      let buttonStyle = "border-2 border-border hover:border-primary/50";
                      if (isChecked) {
                        if (isCorrectOption) {
                          buttonStyle = "border-2 border-emerald-500 bg-emerald-50";
                        } else if (isSelected && !isCorrect) {
                          buttonStyle = "border-2 border-red-500 bg-red-50";
                        }
                      } else if (isSelected) {
                        buttonStyle = "border-2 border-primary bg-primary/10";
                      }

                      return (
                        <motion.button
                          key={option}
                          className={`p-4 rounded-xl text-left font-medium transition-all ${buttonStyle}`}
                          onClick={() => !isChecked && setSelectedAnswer(option)}
                          disabled={isChecked}
                          whileTap={{ scale: isChecked ? 1 : 0.98 }}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {isChecked && isCorrectOption && (
                              <Check className="w-5 h-5 text-emerald-600" />
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Feedback */}
              {isChecked && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl mb-4 ${isCorrect ? "bg-emerald-100" : "bg-red-100"}`}
                >
                  <p className={`font-bold ${isCorrect ? "text-emerald-700" : "text-red-700"}`}>
                    {isCorrect ? "¡Excelente! Правильно!" : "Не совсем..."}
                  </p>
                </motion.div>
              )}

              {/* Action Button */}
              <Button
                className={`w-full py-6 rounded-xl text-lg font-bold ${
                  isChecked 
                    ? "btn-warm" 
                    : "bg-primary/20 text-primary hover:bg-primary/30"
                }`}
                disabled={!isChecked && !selectedAnswer && !inputAnswer}
                onClick={isChecked ? handleContinue : handleCheck}
              >
                {isChecked ? "Продолжить" : "Проверить"}
              </Button>
            </motion.div>
          </AnimatePresence>
        ) : lives <= 0 ? (
          /* No Lives Screen */
          <motion.div
            className="flex-1 flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-extrabold text-foreground mb-2">
              Жизни закончились
            </h2>
            <p className="text-muted-foreground mb-8">
              Не расстраивайся! Попробуй ещё раз позже.
            </p>
            <Link href="/">
              <Button className="btn-warm px-8 py-5">
                На главную
              </Button>
            </Link>
          </motion.div>
        ) : (
          /* Completion Screen */
          <motion.div
            className="flex-1 flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              <Sparkles className="w-20 h-20 text-amber-500 mb-4" />
            </motion.div>
            <h2 className="text-2xl font-extrabold text-foreground mb-2">
              ¡Fantástico!
            </h2>
            <p className="text-muted-foreground mb-2">
              Урок завершён!
            </p>
            <p className="text-3xl font-extrabold text-primary mb-8">
              +{xpEarned} XP
            </p>
            
            <div className="w-full max-w-xs">
              <img 
                src="/images/mascot-happy.png" 
                alt="Бруно празднует" 
                className="w-32 h-32 mx-auto mb-6 object-contain"
              />
              
              <Link href="/">
                <Button className="w-full btn-warm py-5 text-lg">
                  Продолжить
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
