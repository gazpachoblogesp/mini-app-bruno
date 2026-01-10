import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Mic, Volume2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { toast } from "sonner";

interface Message {
  id: number;
  sender: "bruno" | "user";
  text: string;
  translation?: string;
  timestamp: Date;
}

interface DialogueOption {
  text: string;
  translation: string;
}

const dialogueScenario = {
  title: "В кафе",
  description: "Практикуй заказ еды в испанском кафе",
  initialMessage: {
    text: "¡Hola! Bienvenido al café. ¿Qué desea tomar?",
    translation: "Привет! Добро пожаловать в кафе. Что желаете заказать?",
  },
  responses: [
    {
      trigger: ["café", "coffee", "кофе"],
      response: {
        text: "¡Excelente elección! ¿Lo quiere con leche o solo?",
        translation: "Отличный выбор! Хотите с молоком или чёрный?",
      },
    },
    {
      trigger: ["leche", "молоко", "milk"],
      response: {
        text: "Perfecto, un café con leche. ¿Algo más?",
        translation: "Отлично, кофе с молоком. Что-нибудь ещё?",
      },
    },
    {
      trigger: ["solo", "negro", "чёрный", "black"],
      response: {
        text: "Muy bien, un café solo. ¿Desea algo para comer?",
        translation: "Хорошо, чёрный кофе. Желаете что-нибудь поесть?",
      },
    },
    {
      trigger: ["gracias", "спасибо", "thanks", "no"],
      response: {
        text: "¡De nada! Su pedido estará listo en un momento. ¡Que lo disfrute!",
        translation: "Пожалуйста! Ваш заказ будет готов через минуту. Приятного аппетита!",
      },
    },
  ],
  defaultResponse: {
    text: "Lo siento, no entendí. ¿Puede repetir, por favor?",
    translation: "Извините, не понял. Можете повторить, пожалуйста?",
  },
  suggestions: [
    { text: "Un café, por favor", translation: "Кофе, пожалуйста" },
    { text: "Con leche", translation: "С молоком" },
    { text: "Gracias", translation: "Спасибо" },
  ],
};

export default function Practice() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bruno",
      text: dialogueScenario.initialMessage.text,
      translation: dialogueScenario.initialMessage.translation,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTranslations] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findResponse = (userText: string) => {
    const lowerText = userText.toLowerCase();
    for (const item of dialogueScenario.responses) {
      if (item.trigger.some(t => lowerText.includes(t.toLowerCase()))) {
        return item.response;
      }
    }
    return dialogueScenario.defaultResponse;
  };

  const handleSend = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: messageText,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Simulate Bruno typing
    setIsTyping(true);
    setTimeout(() => {
      const response = findResponse(messageText);
      const brunoMessage: Message = {
        id: messages.length + 2,
        sender: "bruno",
        text: response.text,
        translation: response.translation,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, brunoMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleSuggestion = (suggestion: DialogueOption) => {
    handleSend(suggestion.text);
  };

  const handleVoiceInput = () => {
    toast.info("Голосовой ввод", { description: "Функция скоро будет доступна" });
  };

  const handlePlayAudio = (text: string) => {
    toast.info("Аудио", { description: text });
  };

  const handleRestart = () => {
    setMessages([
      {
        id: 1,
        sender: "bruno",
        text: dialogueScenario.initialMessage.text,
        translation: dialogueScenario.initialMessage.translation,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        
        <div className="flex items-center gap-3 flex-1">
          <img 
            src="/images/mascot-avatar.png" 
            alt="Бруно" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h1 className="font-bold text-foreground">Бруно</h1>
            <p className="text-xs text-muted-foreground">{dialogueScenario.title}</p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-xl"
          onClick={handleRestart}
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </header>

      {/* Scenario Description */}
      <div className="px-4 py-3 bg-muted/50 border-b border-border/50">
        <p className="text-sm text-muted-foreground text-center">
          {dialogueScenario.description}
        </p>
      </div>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] ${message.sender === "user" ? "order-1" : ""}`}>
                {message.sender === "bruno" && (
                  <div className="flex items-end gap-2 mb-1">
                    <img 
                      src="/images/mascot-avatar.png" 
                      alt="Бруно" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                )}
                
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card shadow-md border border-border/50 rounded-bl-md"
                  }`}
                >
                  <p className="font-medium">{message.text}</p>
                  
                  {message.translation && showTranslations && message.sender === "bruno" && (
                    <p className="text-sm mt-1 opacity-70">{message.translation}</p>
                  )}
                </div>
                
                {message.sender === "bruno" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1 h-7 px-2 text-muted-foreground"
                    onClick={() => handlePlayAudio(message.text)}
                  >
                    <Volume2 className="w-4 h-4 mr-1" />
                    <span className="text-xs">Слушать</span>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-2"
          >
            <img 
              src="/images/mascot-avatar.png" 
              alt="Бруно" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="bg-card shadow-md border border-border/50 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <motion.span
                  className="w-2 h-2 bg-muted-foreground rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                />
                <motion.span
                  className="w-2 h-2 bg-muted-foreground rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                />
                <motion.span
                  className="w-2 h-2 bg-muted-foreground rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Suggestions */}
      <div className="px-4 py-2 border-t border-border/50 bg-card/50">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dialogueScenario.suggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              className="flex-shrink-0 px-3 py-2 bg-muted rounded-xl text-sm font-medium hover:bg-muted/80 transition-colors"
              onClick={() => handleSuggestion(suggestion)}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-foreground">{suggestion.text}</span>
              {showTranslations && (
                <span className="text-muted-foreground ml-1">({suggestion.translation})</span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border/50 bg-card">
        <div className="flex gap-2">
          <Input
            placeholder="Напиши по-испански..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-muted/50 border-0 rounded-xl py-5"
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
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
