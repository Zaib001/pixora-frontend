// src/components/dashboard/QuickActions.jsx
import { motion } from "framer-motion";
import { Rocket, Video, FileText, Zap, Settings, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/uiSlice";

export default function QuickActions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const actions = [
    {
      icon: Rocket,
      label: "New Project",
      description: "Start creating AI videos",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/20",
      onClick: () => navigate('/projects/new')
    },
    {
      icon: Video,
      label: "My Projects",
      description: "View your creations",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/20",
      onClick: () => navigate('/projects')
    },
    {
      icon: FileText,
      label: "Templates",
      description: "Use pre-made templates",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/20",
      onClick: () => navigate('/templates')
    },
    {
      icon: Zap,
      label: "AI Generator",
      description: "Generate content instantly",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/20",
      onClick: () => dispatch(openModal('aiGenerator'))
    },
    {
      icon: Settings,
      label: "Settings",
      description: "Configure your account",
      color: "from-gray-500 to-gray-700",
      bgColor: "bg-gray-500/20",
      onClick: () => navigate('/settings')
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "Get assistance",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/20",
      onClick: () => navigate('/support')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className={`p-4 rounded-xl backdrop-blur-md border border-white/10 ${action.bgColor} hover:shadow-lg transition-all duration-300 group text-left`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex flex-col space-y-2">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} w-fit shadow-lg`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm group-hover:text-white/90">
                  {action.label}
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  {action.description}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}