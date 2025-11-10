import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ContentModuleCard({ label, route }) {
  const navigate = useNavigate();
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(route)}
      className="glass rounded-2xl p-6 cursor-pointer text-center transition-all hover:neon"
    >
      <h3 className="text-xl font-medium mb-2">{label}</h3>
      <p className="text-gray-400 text-sm">Click to begin</p>
    </motion.div>
  );
}
