// src/components/feedback/ToastContainer.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../redux/slices/uiSlice";
import { CheckCircle, XCircle, Info } from "lucide-react";

export default function ToastContainer() {
  const dispatch = useDispatch();
  const { toast } = useSelector((state) => state.ui);

  if (!toast.visible) return null;

  const getIcon = () => {
    switch (toast.type) {
      case "success": return <CheckCircle className="w-6 h-6 text-green-400" />;
      case "error":   return <XCircle className="w-6 h-6 text-red-400" />;
      default:        return <Info className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="fixed top-6 right-6 z-50"
      >
        <div
          className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg backdrop-blur-md
            ${toast.type === "success" ? "bg-green-600/20 border border-green-400/30"
              : toast.type === "error" ? "bg-red-600/20 border border-red-400/30"
              : "bg-blue-600/20 border border-blue-400/30"}`}
        >
          {getIcon()}
          <p className="text-white font-medium">{toast.message}</p>
          <button
            onClick={() => dispatch(hideToast())}
            className="text-gray-300 hover:text-white ml-2 text-sm"
          >
            ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
