// src/components/dashboard/StatsOverview.jsx
import { motion } from "framer-motion";
import { Video, FileText, Zap, TrendingUp } from "lucide-react";
import CountUp from "react-countup";

export default function StatsOverview({ stats, loading }) {
  const statCards = [
    {
      icon: Video,
      label: "Projects Created",
      value: stats?.projectsCreated || 0,
      color: "from-blue-500 to-cyan-500",
      change: "+12%"
    },
    {
      icon: FileText,
      label: "Templates Used",
      value: stats?.templatesUsed || 0,
      color: "from-green-500 to-emerald-500",
      change: "+8%"
    },
    {
      icon: Zap,
      label: "Credits Spent",
      value: stats?.creditsSpent || 0,
      color: "from-purple-500 to-pink-500",
      change: "+23%"
    },
    {
      icon: TrendingUp,
      label: "Monthly Usage",
      value: stats?.monthlyUsage || 0,
      color: "from-orange-500 to-red-500",
      change: "+15%"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg group-hover:shadow-xl transition-shadow`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-medium text-green-400 bg-green-400/20 px-2 py-1 rounded-full">
              {stat.change}
            </span>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">
              {loading ? (
                <div className="h-7 w-16 bg-white/10 rounded animate-pulse"></div>
              ) : (
                <CountUp end={stat.value} duration={2.5} separator="," />
              )}
            </h3>
            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}