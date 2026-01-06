import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Camera, ImageIcon, Video, Star, Zap, Play, TrendingUp, Clock, Rocket, ArrowRight, Plus } from "lucide-react";
import FreeTierBadge from "../../components/dashboard/FreeTierBadge";
import QuickStartCards from "../../components/dashboard/QuickStartCards";
import RecentProjectsGrid from "../../components/dashboard/RecentProjectsGrid";
import { getDashboardStats } from "../../services/generationService";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import API from "../../api/endpoints";
import api from "../../api/axios";





export default function DashboardHome() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        if (data.success) {
          setDashboardData(data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTemplates = async () => {
      try {
        setLoadingTemplates(true);
        const response = await api.get(API.TEMPLATES);
        if (response.data.success) {
          // Filter out inactive templates
          const activeTemplates = response.data.data.filter(template =>
            template.isActive && template.isPublic && template.isTested
          );
          setTemplates(activeTemplates.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      } finally {
        setLoadingTemplates(false);
      }
    };

    fetchStats();
    fetchTemplates();
  }, []);

  const stats = [
    { label: t("dashboard.stats.projects"), value: dashboardData?.stats?.projectsCreated || "0", change: "+12%", icon: TrendingUp },
    { label: t("dashboard.stats.credits"), value: dashboardData?.stats?.creditsUsed || "0", change: "+8%", icon: Zap },
    { label: t("dashboard.stats.timeSaved"), value: dashboardData?.stats?.timeSaved || "0h", change: "+23%", icon: Clock },
  ];

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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden ">



      <motion.div
        className="relative z-10 space-y-12 p-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Header Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl font-bold text-white mb-3"
              >
                {t("dashboard.welcomeTitle")} <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{t("common.brandName") || "Pixora Studio"}</span> ✨
              </motion.h1>
              <p className="text-gray-300 text-xl max-w-2xl leading-relaxed">
                {t("dashboard.welcomeSubtitle")}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass-card p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{loading ? "..." : stat.value}</p>
                  </div>
                  <div className="p-3 bg-white/10 rounded-xl">
                    <stat.icon size={24} className="text-purple-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>


        </motion.div>

        {/* Creative Tools */}
        <QuickStartCards />

        {/* Templates (Real Data) */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl">
                <Star size={24} className="text-white" />
              </div>
              {t("dashboard.exploreTemplates.title")}
            </h2>
            <button
              onClick={() => navigate("/dashboard/templates")}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors duration-300 text-sm"
            >
              {t("dashboard.browseAll")}
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingTemplates ? (
              [1, 2, 3].map((n) => (
                <div key={n} className="h-64 bg-white/5 animate-pulse rounded-2xl border border-white/10" />
              ))
            ) : templates.length > 0 ? (
              templates.map((template, i) => {
                // Content type colors
                const contentTypeColors = {
                  textToVideo: "from-purple-600 to-blue-600",
                  imageToVideo: "from-blue-600 to-cyan-600",
                  textToImage: "from-green-600 to-emerald-600",
                  imageToImage: "from-orange-600 to-red-600"
                };

                return (
                  <motion.div
                    key={template._id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="group relative cursor-pointer"
                    onClick={() => {
                      const generatorPaths = {
                        textToVideo: '/generate/text-to-video',
                        imageToVideo: '/generate/image-to-video',
                        textToImage: '/generate/text-to-image',
                        imageToImage: '/generate/image-to-image'
                      };
                      const targetPath = generatorPaths[template.contentType] || '/generate/text-to-video';
                      navigate(targetPath, {
                        state: {
                          templateData: {
                            prompt: template.promptText || template.description || template.title,
                            style: 'cinematic',
                            duration: template.duration,
                            contentType: template.contentType,
                            templateId: template._id,
                            credits: template.credits,
                            category: template.category
                          }
                        }
                      });
                    }}
                  >
                    <div className="relative bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/10">
                      {/* Template Status Badge */}
                      {!template.isActive || !template.isPublic || !template.isTested ? (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-lg">
                            {t("dashboard.exploreTemplates.unavailable")}
                          </div>
                        </div>
                      ) : template.isPopular && (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-lg flex items-center gap-1">
                            <Star size={10} fill="currentColor" />
                            {t("dashboard.exploreTemplates.popular") || "POPULAR"}
                          </div>
                        </div>
                      )}

                      {/* Template Header */}
                      <div className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${contentTypeColors[template.contentType] || 'from-purple-600 to-blue-600'} shadow-md`}>
                            {/* Icon based on content type */}
                            {template.contentType.includes('video') ? (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-lg truncate" title={template.title}>
                              {template.title}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-2 mt-1">{template.description}</p>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-lg capitalize border border-white/5">
                            {template.category}
                          </span>
                          <span className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded-lg border border-purple-500/20">
                            {template.contentType.replace(/([A-Z])/g, ' $1')}
                          </span>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                            <svg className="w-4 h-4 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-white font-bold text-sm">{template.duration || 'N/A'}</span>
                            <span className="text-gray-400 text-[10px]">{t("dashboard.exploreTemplates.duration")}</span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
                              <span className="text-white font-bold text-sm">{template.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-gray-400 text-[10px]">{t("dashboard.exploreTemplates.rating")}</span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                            <svg className="w-4 h-4 text-blue-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-4.201a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="text-white font-bold text-sm">{template.uses.toLocaleString()}</span>
                            <span className="text-gray-400 text-[10px]">{t("dashboard.exploreTemplates.uses")}</span>
                          </div>
                        </div>

                        {/* Credits & Action */}
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <div>
                              <span className="text-white font-medium text-sm">{t("dashboard.exploreTemplates.cost")}</span>
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-400 font-bold text-lg">{template.credits}</span>
                                <span className="text-gray-400 text-sm">{t("common.credits") || "credits"}</span>
                              </div>
                            </div>
                          </div>

                          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all text-sm">
                            {t("dashboard.exploreTemplates.useTemplate")}
                          </button>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t("dashboard.exploreTemplates.noTemplates")}</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  {t("dashboard.exploreTemplates.noTemplatesDesc")}
                </p>
                <button
                  onClick={() => navigate("/dashboard/templates")}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  {t("dashboard.exploreTemplates.exploreAll")}
                </button>
              </div>
            )}
          </div>
        </motion.section>



        {/* Recent Projects */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">{t("dashboard.recentProjects")}</h2>
            <button onClick={() => navigate("/dashboard/library")} className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1 text-sm font-medium">
              {t("dashboard.viewAll") || "View all"} <ArrowRight size={16} />
            </button>
          </div>
          <RecentProjectsGrid projects={dashboardData?.recentProjects || []} loading={loading} />
        </motion.section>

      </motion.div>
    </div>
  );
}
