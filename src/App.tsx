import { Toaster } from "@/components/ui/sonner";
import { Route, Switch } from "wouter";
import { useEffect } from "react";
import { initTelegramWebApp } from "./lib/telegram";
import Home from "./pages/Home";
import Words from "./pages/Words";
import Lesson from "./pages/Lesson";
import Practice from "./pages/Practice";
import Profile from "./pages/Profile";
import Path from "./pages/Path";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/words" component={Words} />
      <Route path="/lesson" component={Lesson} />
      <Route path="/practice" component={Practice} />
      <Route path="/profile" component={Profile} />
      <Route path="/path" component={Path} />
      <Route>
        <div className="min-h-screen flex items-center justify-center">
          <p>Страница не найдена</p>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  // Инициализация Telegram WebApp при загрузке приложения
  useEffect(() => {
    initTelegramWebApp();
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <Router />
    </>
  );
}

export default App;
