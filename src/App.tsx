import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Route, Switch, Router as WouterRouter } from "wouter";

import { initTelegramWebApp } from "./lib/telegram";
import { loadUserFromApi } from "./store/userStore";

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
      <Route path="/practice" component={Practice} />
      <Route path="/profile" component={Profile} />
      <Route path="/path" component={Path} />
      <Route path="/lesson/:id" component={Lesson} />  {/* ДОБАВЛЕНО */}
      <Route path="/lesson" component={Lesson} />
      <Route>
        <div className="min-h-screen flex items-center justify-center text-muted-foreground">
          Страница не найдена
        </div>
      </Route>
    </Switch>
  );
}

export default function App() {
  useEffect(() => {
    // 1) Инициализация Telegram WebApp (expand, theme и т.д.)
    initTelegramWebApp();

    // 2) Загружаем пользователя С СЕРВЕРА (Worker → D1)
    loadUserFromApi();
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </>
  );
}