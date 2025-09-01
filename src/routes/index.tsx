import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { AboutPomodoro } from "../pages/AboutPomodoro";
import { useEffect } from "react";
import { History } from "../pages/History";
import { Settings } from "../pages/Settings";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);
    return null;
};




export const AppRoutes = () => {



    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about-pomodoro" element={<AboutPomodoro />} />
                    <Route path="history" element={<History />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            <ScrollToTop />
        </BrowserRouter>
    );
};