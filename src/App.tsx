import { Toaster } from "@/components/ui/sonner";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { useEffect } from "react";
import { initTelegramWebApp } from "./lib/telegram";

import Home from "./pages/Home";
import Words from "./pages/Words";
import Lesson from "./pages/Lesson";
import Practice from "./pages/Practice";
import Profile from "./pages/Profile";
import Path from "./pages/Path";

export default function App() {
  useEffect(() => {
    initTelegramWebApp();
  }, []);

  return (
    <>
      <Toaster position="top-center" />

      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/words" component={Words} />
          <Route path="/lesson" component={Lesson} />
          <Route path="/practice" component={Practice} />
          <Route path="/profile" component={Profile} />
          <Route path="/path" component={Path} />

          {/* fallback */}
          <Route>
            <div className="min-h-screen flex items-center justify-center">
              <p>Страница не найдена</p>
            </div>
          </Route>
        </Switch>
      </WouterRouter>
    </>
  );
}