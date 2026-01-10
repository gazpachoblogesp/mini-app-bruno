import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Zap, ChevronRight, BookOpen, MessageCircle, Mic, Send, Route, BookText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";

export default function Home() {
  const [askBrunoText, setAskBrunoText] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [, setLocation] = useLocation();

  const handleContinueLesson = () => {
    setLocation("/lesson");
  };

  const handleRepeatWords = () => {
    setLocation("/words");
  };

  const handleDialoguePractice = () => {
    setLocation("/practice");
  };

  const handleAskBruno = () => {
    if (askBrunoText.trim()) {
      toast.success(`Бруно думает над вопросом...`, {
        description: askBrunoText,
      });
      setAskBrunoText("");
    }
  };

  const handleVoiceInput = () => {
    toast.info("Голосовой ввод", {
      description: "Функция скоро будет доступна",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-32 left-0 w-48 h-48 bg-sky-blue/10 rounded-full blur-3xl -translate-x-1/2" />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 py-4">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span className="font-extrabold text-lg text-foreground">125 XP</span>
          <span className="text-muted-foreground text-sm">(неделя)</span>
        </motion.div>
        
        <motion.button 
          className="relative p-2 hover:bg-muted rounded-full transition-colors"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => toast.info("Уведомления", { description: "2 новых уведомления" })}
        >
          <Bell className="w-6 h-6 text-muted-foreground" />
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
            2
          </span>
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pb-24 relative z-10">
        {/* Mascot Section */}
        <motion.div 
          className="flex flex-col items-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.img
            src="/images/mascot-wave.png"
            alt="Бруно - маскот приложения"
            className="w-48 h-48 object-contain"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Speech Bubble */}
          <motion.div 
            className="speech-bubble mt-2 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <p className="font-semibold text-foreground">¡Hola! Давай продолжим?</p>
          </motion.div>
        </motion.div>

        {/* Continue Lesson Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button 
            className="w-full btn-warm text-lg py-6 mb-2"
            onClick={handleContinueLesson}
          >
            Продолжить урок
          </Button>
          <p className="text-center text-muted-foreground text-sm mb-6">
            Урок 12: Глаголы движения • 5 мин
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="space-y-3">
          {/* Repeat Words Card */}
          <motion.button
            className="card-cozy w-full p-4 flex items-center gap-4 text-left"
            onClick={handleRepeatWords}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground">Повторить 8 слов</h3>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.button>

          {/* Dialogue Practice Card */}
          <motion.button
            className="card-cozy w-full p-4 flex items-center gap-4 text-left"
            onClick={handleDialoguePractice}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-sky-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground">Практика диалога</h3>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.button>

          {/* Ask Bruno Card */}
          <motion.div
            className="card-cozy p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <img 
                src="/images/mascot-avatar.png" 
                alt="Бруно" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-foreground">Спроси Бруно...</h3>
                <p className="text-xs text-muted-foreground">(грамматика, слова, перевод)</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Спроси Бруно..."
                value={askBrunoText}
                onChange={(e) => setAskBrunoText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAskBruno()}
                className="flex-1 bg-muted/50 border-0 rounded-xl"
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-xl hover:bg-muted"
                onClick={handleVoiceInput}
              >
                <Mic className="w-5 h-5 text-primary" />
              </Button>
              <Button 
                size="icon" 
                className="rounded-xl bg-primary hover:bg-primary/90"
                onClick={handleAskBruno}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 z-20">
        <div className="max-w-md mx-auto flex items-center justify-around py-2 relative">
          {/* Path Tab */}
          <Link href="/path">
            <NavItem 
              icon={<Route className="w-6 h-6" />} 
              label="Путь" 
              active={activeTab === "path"}
              onClick={() => setActiveTab("path")}
            />
          </Link>
          
          {/* Words Tab */}
          <Link href="/words">
            <NavItem 
              icon={<BookText className="w-6 h-6" />} 
              label="Слова" 
              active={activeTab === "words"}
              onClick={() => setActiveTab("words")}
            />
          </Link>
          
          {/* Center Mascot Button */}
          <div className="relative -mt-8">
            <Link href="/">
              <motion.button
                className="w-16 h-16 rounded-full bg-card shadow-lg shadow-black/10 border-4 border-background flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src="/images/mascot-avatar.png" 
                  alt="Бруно" 
                  className="w-full h-full object-cover"
                />
              </motion.button>
            </Link>
          </div>
          
          {/* Practice Tab */}
          <Link href="/practice">
            <NavItem 
              icon={<MessageCircle className="w-6 h-6" />} 
              label="Практика" 
              active={activeTab === "practice"}
              onClick={() => setActiveTab("practice")}
            />
          </Link>
          
          {/* Profile Tab */}
          <Link href="/profile">
            <NavItem 
              icon={<User className="w-6 h-6" />} 
              label="Профиль" 
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <motion.button
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
        active 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground"
      }`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
}
