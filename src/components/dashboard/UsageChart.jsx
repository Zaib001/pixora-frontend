// src/components/dashboard/UsageChart.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function UsageChart() {
  const [usageData, setUsageData] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const data = [
      { day: 'Mon', credits: 12 },
      { day: 'Tue', credits: 19 },
      { day: 'Wed', credits: 8 },
      { day: 'Thu', credits: 15 },
      { day: 'Fri', credits: 22 },
      { day: 'Sat', credits: 18 },
      { day: 'Sun', credits: 14 }
    ];
    setUsageData(data);
  }, []);

  const maxUsage = Math.max(...usageData.map(d => d.credits));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Weekly Usage</h3>
        <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="flex items-end justify-between h-40 gap-2">
        {usageData.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ height: 0 }}
            animate={{ height: `${(day.credits / maxUsage) * 100}%` }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="flex-1 flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg relative group"
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {day.credits} credits
              </div>
            </motion.div>
            <span className="text-gray-400 text-sm mt-2">{day.day}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}