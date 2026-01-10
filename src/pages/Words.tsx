import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Volume2, RotateCcw, Check, X, Star, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { toast } from "sonner";

interface Word {
  id: number;
  spanish: string;
  russian: string;
  example: string;
  exampleTranslation: string;
  difficulty: "easy" | "medium" | "hard";
}

const wordsToReview: Word[] = [
  { id: 1, spanish: "caminar", russian: "идти, ходить", example: "Me gusta caminar por el parque.", exampleTranslation: "Мне нравится гулять по парку.", difficulty: "easy" },
  { id: 2, spanish: "correr", russian: "бежать", example: "Ella corre todas las mañanas.", exampleTranslation: "Она бегает каждое утро.", difficulty: "easy" },
  { id: 3, spanish: "saltar", russian: "прыгать", example: "Los niños saltan de alegría.", exampleTranslation: "Дети прыгают от радости.", difficulty: "medium" },
  { id: 4, spanish: "nadar", russian: "плавать", example: "Aprendí a nadar en verano.", exampleTranslation: "Я научился плавать летом.", difficulty: "easy" },
  { id: 5, spanish: "volar", russian: "летать", example: "Los pájaros vuelan alto.", exampleTranslation: "Птицы летают высоко.", difficulty: "medium" },
  { id: 6, spanish: "subir", russian: "подниматься", example: "Vamos a subir la montaña.", exampleTranslation: "Давай поднимемся на гору.", difficulty: "hard" },
  { id: 7, spanish: "bajar", russian: "спускаться", example: "Hay que bajar las escaleras.", exampleTranslation: "Нужно спуститься по лестнице.", difficulty: "medium" },
  { id: 8, spanish: "cruzar", russian: "переходить, пересекать", example: "Cruza la calle con cuidado.", exampleTranslation: "Переходи улицу осторожно.", difficulty: "hard" },
];

export default function Words() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownWords, setKnownWords] = useState<number[]>([]);
  const [unknownWords, setUnknownWords] = useState<number[]>([]);
  const [streak, setStreak] = useState(3);

  const currentWord = wordsToReview[currentIndex];
  const progress = ((knownWords.length + unknownWords.length) / wordsToReview.length) * 100;
  const isComplete = currentIndex >= wordsToReview.length;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnown = () => {
    setKnownWords([...knownWords, currentWord.id]);
    setStreak(streak + 1);
    nextWord();
  };

  const handleUnknown = () => {
    setUnknownWords([...unknownWords, currentWord.id]);
    setStreak(0);
    nextWord();
  };

  const nextWord = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
    }, 200);
  };

  const handlePlayAudio = () => {
    toast.info("Произношение", { description: currentWord.spanish });
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownWords([]);
    setUnknownWords([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-emerald-100 text-emerald-700";
      case "medium": return "bg-amber-100 text-amber-700";
      case "hard": return "bg-red-100 text-red-700";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "Лёгкое";
      case "medium": return "Среднее";
      case "hard": return "Сложное";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center gap-4 px-5 py-4 border-b border-border/50">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-bold text-lg">Повторение слов</h1>
          <p className="text-sm text-muted-foreground">
            {wordsToReview.length - currentIndex} из {wordsToReview.length} осталось
          </p>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 rounded-full">
          <Flame className="w-4 h-4 text-amber-600" />
          <span className="font-bold text-amber-700 text-sm">{streak}</span>
        </div>
      </header>

      {/* Progress */}
      <div className="px-5 py-3">
        <Progress value={progress} className="h-2" />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-5 py-4 flex flex-col">
        {!isComplete ? (
          <>
            {/* Flashcard */}
            <motion.div
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className="relative w-full aspect-[3/4] max-h-[400px] cursor-pointer"
                onClick={handleFlip}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isFlipped ? "back" : "front"}
                    className="absolute inset-0 card-cozy p-6 flex flex-col"
                    initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {!isFlipped ? (
                      /* Front - Spanish word */
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full mb-4 ${getDifficultyColor(currentWord.difficulty)}`}>
                          {getDifficultyLabel(currentWord.difficulty)}
                        </span>
                        <h2 className="text-4xl font-extrabold text-foreground mb-4">
                          {currentWord.spanish}
                        </h2>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayAudio();
                          }}
                        >
                          <Volume2 className="w-6 h-6 text-primary" />
                        </Button>
                        <p className="text-muted-foreground mt-6 text-sm">
                          Нажми, чтобы увидеть перевод
                        </p>
                      </div>
                    ) : (
                      /* Back - Translation and example */
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <h2 className="text-3xl font-extrabold text-primary mb-2">
                          {currentWord.russian}
                        </h2>
                        <p className="text-2xl font-bold text-muted-foreground mb-6">
                          {currentWord.spanish}
                        </p>
                        <div className="bg-muted/50 rounded-xl p-4 w-full">
                          <p className="text-foreground font-medium italic mb-1">
                            "{currentWord.example}"
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {currentWord.exampleTranslation}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex gap-4 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="outline"
                className="flex-1 py-6 rounded-xl border-2 border-red-300 text-red-600 hover:bg-red-50"
                onClick={handleUnknown}
              >
                <X className="w-5 h-5 mr-2" />
                Не помню
              </Button>
              <Button
                className="flex-1 py-6 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600"
                onClick={handleKnown}
              >
                <Check className="w-5 h-5 mr-2" />
                Знаю!
              </Button>
            </motion.div>
          </>
        ) : (
          /* Completion Screen */
          <motion.div
            className="flex-1 flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Star className="w-20 h-20 text-amber-500 fill-amber-500 mb-4" />
            </motion.div>
            <h2 className="text-2xl font-extrabold text-foreground mb-2">
              Отлично!
            </h2>
            <p className="text-muted-foreground mb-6">
              Ты повторил все {wordsToReview.length} слов!
            </p>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
              <div className="card-cozy p-4 text-center">
                <p className="text-2xl font-extrabold text-emerald-500">{knownWords.length}</p>
                <p className="text-sm text-muted-foreground">Знаю</p>
              </div>
              <div className="card-cozy p-4 text-center">
                <p className="text-2xl font-extrabold text-red-500">{unknownWords.length}</p>
                <p className="text-sm text-muted-foreground">Повторить</p>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1 py-5 rounded-xl"
                onClick={handleRestart}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Ещё раз
              </Button>
              <Link href="/" className="flex-1">
                <Button className="w-full py-5 rounded-xl btn-warm">
                  Готово
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
