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
import api, { serverURL } from "../../api/axios";
import { AnimatePresence } from "framer-motion";
import { useRef } from "react";





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

  const contentTypeColors = {
    'text-to-video': "from-violet-600 to-indigo-600",
    'image-to-video': "from-blue-600 to-cyan-600",
    'text-to-image': "from-emerald-600 to-green-600",
    'image-to-image': "from-amber-600 to-orange-600",
    // Fallbacks
    textToVideo: "from-violet-600 to-indigo-600",
    imageToVideo: "from-blue-600 to-cyan-600",
    textToImage: "from-emerald-600 to-green-600",
    imageToImage: "from-amber-600 to-orange-600"
  };

  const contentTypeLabels = {
    'text-to-video': "Text to Video",
    'image-to-video': "Image to Video",
    'text-to-image': "Text to Image",
    'image-to-image': "Image to Image",
    // Fallbacks
    textToVideo: "Text to Video",
    imageToVideo: "Image to Video",
    textToImage: "Text to Image",
    imageToImage: "Image to Image"
  };

  const DashboardTemplateCard = ({ template, index, t }) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
      if (template.previewType === 'video' && videoRef.current) {
        if (isHovered) {
          videoRef.current.play().catch(err => console.log("Hover play blocked", err));
        } else {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }
    }, [isHovered, template.previewType]);

    const previewUrl = template.previewUrl?.startsWith('http') ? template.previewUrl : `${serverURL}${template.previewUrl}`;

    return (
      <motion.div
        variants={itemVariants}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          const generatorPaths = {
            'text-to-video': '/generate/text-to-video',
            'image-to-video': '/generate/image-to-video',
            'text-to-image': '/generate/text-to-image',
            'image-to-image': '/generate/image-to-image'
          };
          const type = template.generatorType || template.contentType;
          const targetPath = generatorPaths[type] || '/generate/text-to-video';
          navigate(targetPath, {
            state: {
              templateData: {
                ...template,
                prompt: template.promptText || template.description || template.title
              }
            }
          });
        }}
        className="group relative aspect-[3/4] bg-[#0a0a0f] rounded-[2rem] overflow-hidden border border-white/5 hover:border-purple-500/40 transition-all duration-500 shadow-2xl cursor-pointer"
      >
        {/* Media Background */}
        <div className="absolute inset-0 z-0">
          {template.previewType === 'video' ? (
            <>
              <video
                ref={videoRef}
                src={previewUrl.includes('#t=') ? previewUrl : `${previewUrl}#t=0.001`}
                poster={template.thumbnail}
                muted
                loop
                playsInline
                preload="metadata"
                className={`w-full h-full object-cover transition-transform duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}
              />
              {!isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-80 group-hover:opacity-0 transition-opacity">
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <img
              src={previewUrl || template.thumbnail}
              alt={template.title}
              className={`w-full h-full object-cover transition-transform duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}
              onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800`; }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
        </div>

        {/* Top Bar - Type Badge */}
        <div className="absolute top-5 inset-x-5 z-20 flex justify-between items-start">
          <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/10 bg-gradient-to-r ${contentTypeColors[template.generatorType || template.contentType]}`}>
            {contentTypeLabels[template.generatorType || template.contentType]}
          </div>
          {template.isPopular && (
            <div className="p-2 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30 backdrop-blur-md">
              <Star size={12} fill="currentColor" />
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-t from-black/95 via-black/40 to-transparent backdrop-blur-[2px]"
            >
              <div className="space-y-4">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star size={12} fill="currentColor" />
                      <span className="text-[10px] font-black">{template.rating?.toFixed(1) || '4.5'}</span>
                    </div>
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                    <span className="text-gray-400 text-[10px] font-bold">{template.uses?.toLocaleString() || '1.2k'} Uses</span>
                  </div>
                  <h3 className="text-white font-bold text-lg line-clamp-1 leading-tight drop-shadow-lg">
                    {template.title}
                  </h3>
                </motion.div>

                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`w-full py-4 rounded-2xl bg-gradient-to-r ${contentTypeColors[template.contentType]} text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all flex items-center justify-center gap-2`}
                >
                  <Sparkles size={16} />
                  {t("dashboard.exploreTemplates.useTemplate")}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden ">



      <motion.div
        className="relative z-10 space-y-12 p-6 md:p-8 max-w-7xl mx-auto"
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
              templates.map((template, i) => (
                <DashboardTemplateCard
                  key={template._id}
                  template={template}
                  index={i}
                  t={t}
                />
              ))
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
