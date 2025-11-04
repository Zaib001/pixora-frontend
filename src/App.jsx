import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import ToastContainer from "./components/feedback/ToastContainer";
import LoadingSpinner from "./components/feedback/LoadingSpinner";

export default function App() {
  const location = useLocation();

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
    </div>
  );
}
