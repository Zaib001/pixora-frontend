// src/components/feedback/LoadingSpinner.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

export default function LoadingSpinner({ isSuspense = false }) {
  const { loading } = useSelector((state) => state.ui);

  const shouldShow = isSuspense || loading;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-t-transparent border-white rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
