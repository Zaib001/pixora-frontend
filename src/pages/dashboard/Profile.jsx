import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  Edit3,
  Camera,
  Save,
  Shield,
  Bell,
  Globe,
  CreditCard,
  Download,
  Sparkles,
  Zap,
  Loader2
} from "lucide-react";
import CreditsBadge from "../../components/dashboard/CreditsBadge";
import { updateProfile, fetchUserProfile } from "../../redux/actions/authActions";
import { getDashboardStats } from "../../services/generationService";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((s) => s.auth);
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    projects: 0,
    creditsUsed: 0,
  });

  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    website: ""
  });

  // Sync state with user data
  useEffect(() => {
    if (user) {
      setEditedUser({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || ""
      });
    }
  }, [user]);

  // Fetch stats and profile on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure profile is up to date
        dispatch(fetchUserProfile());

        // Get usage stats
        const statsData = await getDashboardStats();
        if (statsData.success) {
          setDashboardStats({
            projects: statsData.stats.projectsCreated,
            creditsUsed: statsData.stats.creditsUsed
          });
        }
      } catch (error) {
        console.error("Failed to load profile data", error);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);


  const handleSave = async () => {
    if (!editedUser.name || !editedUser.email) {
      toast.error("Name and Email are required");
      return;
    }

    try {
      await dispatch(updateProfile(editedUser)).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
      // Toast handled by action
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", { month: 'short', year: 'numeric' });
  };

  const detailedDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const stats = [
    { label: t("common.projects"), value: dashboardStats.projects, icon: Sparkles },
    { label: t("common.credits"), value: dashboardStats.creditsUsed, icon: Zap },
    { label: t("profile.stats.memberSince"), value: formatDate(user?.createdAt), icon: Calendar },
    { label: t("profile.stats.successRate"), value: "100%", icon: Shield }
  ];

  return (
    <div className="min-h-screen p-8">

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-500/25">
                <User size={28} className="text-white" />
              </div>
              {t("profile.title")}
            </h1>
            <p className="text-xl text-gray-300">
              {t("profile.subtitle")}
            </p>
          </div>
          <CreditsBadge />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Left Column - Profile Overview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-2 space-y-6"
          >
            {/* Profile Card */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{t("profile.personalInfo")}</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={isEditing ? handleSave : handleEdit}
                  disabled={authLoading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${isEditing
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                    } ${authLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {authLoading ? <Loader2 size={16} className="animate-spin" /> : (isEditing ? <Save size={16} /> : <Edit3 size={16} />)}
                  {isEditing ? t("profile.save") : t("profile.edit")}
                </motion.button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar Section */}
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">{t("profile.labels.name")}</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedUser.name}
                          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all duration-300"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                          <User size={18} className="text-purple-400" />
                          <span className="text-white">{user?.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">{t("profile.labels.email")}</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedUser.email}
                          onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all duration-300"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                          <Mail size={18} className="text-purple-400" />
                          <span className="text-white">{user?.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">{t("profile.labels.bio")}</label>
                    {isEditing ? (
                      <textarea
                        value={editedUser.bio}
                        onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                        placeholder="Tell us about yourself..."
                        rows="3"
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all duration-300 resize-none"
                      />
                    ) : (
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl min-h-[5rem]">
                        <p className="text-gray-300">{user?.bio || "No bio added yet."}</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">{t("profile.labels.location")}</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedUser.location}
                          onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                          placeholder="City, Country"
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all duration-300"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                          <Globe size={18} className="text-purple-400" />
                          <span className="text-white">{user?.location || "Not specified"}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">{t("profile.labels.website")}</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={editedUser.website}
                          onChange={(e) => setEditedUser({ ...editedUser, website: e.target.value })}
                          placeholder="https://yourwebsite.com"
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all duration-300"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                          <Globe size={18} className="text-purple-400" />
                          {user?.website ? (
                            <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors truncate">
                              {user.website}
                            </a>
                          ) : (
                            <span className="text-gray-500">Not specified</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-4 text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Icon size={20} className="text-purple-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">{statsLoading ? "..." : stat.value}</p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column - Actions & Settings */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t("profile.quickActions.title")}</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all duration-300"
                >
                  <Download size={18} className="text-purple-400" />
                  <span>{t("profile.quickActions.export")}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all duration-300"
                >
                  <Bell size={18} className="text-purple-400" />
                  <span>{t("profile.quickActions.notifications")}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all duration-300"
                >
                  <Shield size={18} className="text-purple-400" />
                  <span>{t("profile.quickActions.privacy")}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all duration-300"
                >
                  <CreditCard size={18} className="text-purple-400" />
                  <span>{t("profile.quickActions.billing")}</span>
                </motion.button>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl border border-purple-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">{t("profile.accountStatus.title")}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t("profile.accountStatus.plan")}</span>
                  <span className="text-purple-400 font-semibold uppercase">{user?.subscriptionPlan || "Free"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t("profile.accountStatus.subscription")}</span>
                  <span className="text-green-400 font-semibold capitalize">{user?.subscriptionStatus || "Active"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t("profile.accountStatus.renewal")}</span>
                  <span className="text-white">{user?.subscriptionEndsAt ? detailedDate(user.subscriptionEndsAt) : "N/A"}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full mt-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                <Link to='/dashboard/billing' className="block w-full h-full">
                  {t("profile.accountStatus.manage")}
                </Link>
              </motion.button>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
