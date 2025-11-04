// src/pages/dashboard/DashboardHome.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCredits, fetchTransactions } from "../../redux/actions/creditActions";
import { fetchUserProfile, logoutUser } from "../../redux/actions/authActions";
import CreditCard from "../../components/dashboard/CreditCard";
import TransactionList from "../../components/dashboard/TransactionList";
import ProfileCard from "../../components/dashboard/ProfileCard";
import StatsOverview from "../../components/dashboard/StatsOverview";
import QuickActions from "../../components/dashboard/QuickActions";
import UsageChart from "../../components/dashboard/UsageChart";
import { motion } from "framer-motion";
import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { credits, transactions, loading, stats } = useSelector((state) => state.credits);
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchCredits());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6"
    >
      {/* Header with Logout */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user?.name || "User"}! 👋
            </h1>
            <p className="text-gray-300 text-lg">
              Here's what's happening with your projects today.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Profile Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all text-white"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:block">Profile</span>
            </motion.button>

            {/* Settings Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all text-white"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:block">Settings</span>
            </motion.button>

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-xl hover:bg-red-600/30 transition-all text-red-300 hover:text-red-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={itemVariants} className="mb-8">
        <StatsOverview stats={stats} loading={loading} />
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Left Column - Credit Card & Profile */}
        <div className="xl:col-span-2 space-y-6">
          <motion.div variants={itemVariants}>
            <CreditCard credits={credits} loading={loading} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <UsageChart />
          </motion.div>
        </div>

        {/* Right Column - Profile & Quick Actions */}
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <ProfileCard user={user} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <QuickActions />
          </motion.div>
        </div>
      </div>

      {/* Transactions Section */}
      <motion.div variants={itemVariants}>
        <TransactionList transactions={transactions} loading={loading} />
      </motion.div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8 text-red-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                Logout Confirmation
              </h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to logout? You'll need to sign in again to access your account.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={authLoading}
                  className="flex-1 py-3 bg-red-600 rounded-xl hover:bg-red-700 transition-colors text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {authLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Logging out...
                    </>
                  ) : (
                    'Logout'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}