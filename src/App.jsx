import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppRouter from "./routes/AppRouter";
import ToastContainer from "./components/feedback/ToastContainer";
import LoadingSpinner from "./components/feedback/LoadingSpinner";
import TidioChat from "./components/common/TidioChat";

export default function App() {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Page Transition Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Application Router */}
          <AppRouter />
        </motion.div>
      </AnimatePresence>

      {/* Global UI Components */}
      <ToastContainer />
      <LoadingSpinner />
      <TidioChat />
    </div>
  );
}
