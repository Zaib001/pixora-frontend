// src/pages/Templates.jsx
import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, Star, Play, Zap, Clock, Users, Eye, X, Sparkles, Copy, TrendingUp, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import API from "../api/endpoints";
import api, { serverURL } from "../api/axios";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useRef } from "react";

const TemplateCard = ({
  template,
  index,
  handlePreview,
  handleCopyPrompt,
  handleUseTemplate,
  copiedId,
  contentTypeColors,
  contentTypeIcons,
  contentTypeLabels
}) => {
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

  // Zigzag Height Logic: Alternating aspect ratios
  const aspectClass = index % 3 === 0 ? 'aspect-[3/4.5]' : index % 3 === 1 ? 'aspect-[3/4]' : 'aspect-[3/5]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative mb-6 break-inside-avoid bg-[#0a0a0f] rounded-[2rem] overflow-hidden border border-white/5 hover:border-purple-500/40 transition-all duration-500 shadow-2xl ${aspectClass}`}
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
            onError={(e) => { e.target.src = `https://images.unsplash.com/photo-${['1618005182384', '1618005182395', '1618005182406'][index % 3]}?q=80&w=800&auto=format&fit=crop`; }}
          />
        )}
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
      </div>

      {/* Top Bar - Type Badge & Status */}
      <div className="absolute top-5 inset-x-5 z-20 flex justify-between items-start">
        <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/10 bg-gradient-to-r ${contentTypeColors[template.generatorType || template.contentType]}`}>
          {contentTypeLabels[template.generatorType || template.contentType]}
        </div>

        {!template.isActive || !template.isPublic || !template.isTested ? (
          <div className="px-3 py-1 bg-red-500/20 text-red-300 text-[10px] font-bold uppercase rounded-lg border border-red-500/30 backdrop-blur-md">
            Dev
          </div>
        ) : template.isPopular && (
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
                <h3 className="text-white font-bold text-lg line-clamp-2 leading-tight drop-shadow-lg">
                  {template.title}
                </h3>
              </motion.div>

              {/* Action Grid */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-2 pt-2">
                <button onClick={() => handlePreview(template)} className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all text-[10px] font-bold uppercase tracking-wider">
                  <Eye size={16} />
                  Details
                </button>
                <button onClick={() => handleCopyPrompt(template.promptText, template._id)} className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all text-[10px] font-bold uppercase tracking-wider">
                  {copiedId === template._id ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  Prompt
                </button>
              </motion.div>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => handleUseTemplate(template)}
                className={`w-full py-4 rounded-2xl bg-gradient-to-r ${contentTypeColors[template.contentType]} text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all flex items-center justify-center gap-3`}
              >
                <Sparkles size={16} />
                Create Now
                <span className="px-2 py-0.5 rounded-lg bg-black/20 text-[10px]">
                  {template.credits}C
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </motion.div>
  );
};


export default function Templates() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    'all', 'business', 'social', 'education', 'entertainment', 'personal', 'other'
  ];

  // Content type icons with better styling
  // Content type icons with better styling
  const contentTypeIcons = {
    'text-to-video': (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    'image-to-video': (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'text-to-image': (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    'image-to-image': (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    // Fallbacks for legacy camelCase
    textToVideo: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    imageToVideo: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    textToImage: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    imageToImage: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    )
  };

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

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await api.get(API.TEMPLATES_PUBLIC || `${API.TEMPLATES}/public`);
        if (response.data.success) {
          setTemplates(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch templates:", error);
        toast.error("Failed to load templates");
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = template.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || template.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [templates, searchTerm, category]);

  const handleUseTemplate = async (template) => {
    console.log('Using template:', template);
    const generatorPaths = {
      'text-to-video': '/generate/text-to-video',
      'image-to-video': '/generate/image-to-video',
      'text-to-image': '/generate/text-to-image',
      'image-to-image': '/generate/image-to-image',
      // Legacy support
      textToVideo: '/generate/text-to-video',
      imageToVideo: '/generate/image-to-video',
      textToImage: '/generate/text-to-image',
      imageToImage: '/generate/image-to-image'
    };

    const type = template.generatorType || template.contentType;
    const targetPath = generatorPaths[type] || '/generate/text-to-video';

    navigate(targetPath, {
      state: {
        templateData: template
      }
    });
  };

  const handlePreview = (template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleCopyPrompt = async (prompt, templateId) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedId(templateId);

      toast.success(
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-400" />
          <div>
            <div className="font-semibold">Prompt copied!</div>
            <div className="text-xs text-gray-300 truncate max-w-xs">
              {prompt.length > 40 ? `${prompt.substring(0, 40)}...` : prompt}
            </div>
          </div>
        </div>,
        {
          duration: 2000,
          style: {
            background: '#111827',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }
      );

      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error("Failed to copy prompt");
    }
  };

  const stats = useMemo(() => {
    const totalUses = templates.reduce((sum, t) => sum + (t.uses || 0), 0);
    const avgRating = templates.length > 0
      ? (templates.reduce((sum, t) => sum + (t.rating || 0), 0) / templates.length).toFixed(1)
      : 0;
    const popularCount = templates.filter(t => t.isPopular).length;

    return { totalUses, avgRating, popularCount };
  }, [templates]);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 start-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 end-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 start-1/2 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="p-2.5 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </motion.button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                      {t("templates.title") || "AI Templates"}
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base mt-1">
                      {t("templates.subtitle") || "Ready-to-use templates for instant creation"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{templates.length}</div>
                <div className="text-sm text-gray-400">Templates</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Available Templates",
              value: filteredTemplates.length,
              icon: <Sparkles className="w-5 h-5" />,
              color: "from-violet-500 to-indigo-500",
              bgColor: "bg-violet-500/10"
            },
            {
              label: "Total Uses",
              value: stats.totalUses.toLocaleString(),
              icon: <Users className="w-5 h-5" />,
              color: "from-blue-500 to-cyan-500",
              bgColor: "bg-blue-500/10"
            },
            {
              label: "Average Rating",
              value: stats.avgRating,
              icon: <Star className="w-5 h-5" />,
              color: "from-amber-500 to-orange-500",
              bgColor: "bg-amber-500/10"
            },
            {
              label: "Popular Templates",
              value: stats.popularCount,
              icon: <TrendingUp className="w-5 h-5" />,
              color: "from-emerald-500 to-green-500",
              bgColor: "bg-emerald-500/10"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                  <div className={`text-white bg-gradient-to-r ${stat.color} bg-clip-text`}>
                    {stat.icon}
                  </div>
                </div>
                <div className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${stat.bgColor} text-white`}>
                  +{Math.floor(Math.random() * 20) + 5}%
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
              <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full`} style={{ width: `${Math.random() * 40 + 60}%` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Search and Filter Section */}
      <div className="relative z-10 max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row gap-6">


          {/* Category Filters */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm capitalize transition-all ${category === cat
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-white/5 backdrop-blur-sm text-gray-300 hover:bg-white/10 border border-white/10 hover:border-white/20'
                    }`}
                >
                  {t(`templates.categories.${cat}`) || cat.charAt(0).toUpperCase() + cat.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

        </div>
      </div>




      {/* Templates Grid */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-violet-500/20 rounded-full" />
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="mt-6 text-gray-400 font-medium">Loading templates...</p>
            <p className="text-sm text-gray-500 mt-2">Please wait while we prepare your creative tools</p>
          </div>
        ) : filteredTemplates.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredTemplates.map((template, index) => (
              <TemplateCard
                key={template._id}
                template={template}
                index={index}
                handlePreview={handlePreview}
                handleCopyPrompt={handleCopyPrompt}
                handleUseTemplate={handleUseTemplate}
                copiedId={copiedId}
                contentTypeColors={contentTypeColors}
                contentTypeIcons={contentTypeIcons}
                contentTypeLabels={contentTypeLabels}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border border-white/10">
              <Filter className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {t("templates.noResults") || "No templates found"}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              {t("templates.noResultsSub") || "We couldn't find any templates matching your criteria. Try adjusting your search or filters."}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors border border-white/10 hover:border-white/20"
              >
                Clear Search
              </button>
              <button
                onClick={() => setCategory('all')}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all"
              >
                Show All Templates
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${contentTypeColors[selectedTemplate.contentType]}`}>
                    {contentTypeIcons[selectedTemplate.contentType]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedTemplate.title}</h2>
                    <p className="text-gray-400">{selectedTemplate.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {/* Template Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Category</h3>
                      <div className="px-4 py-3 bg-white/5 rounded-xl text-white capitalize border border-white/10">
                        {selectedTemplate.category}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Content Type</h3>
                      <div className="px-4 py-3 bg-white/5 rounded-xl text-white border border-white/10">
                        {contentTypeLabels[selectedTemplate.contentType]}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Usage Stats</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                          <div className="text-2xl font-bold text-white">{selectedTemplate.uses?.toLocaleString() || '0'}</div>
                          <div className="text-sm text-gray-400">Total Uses</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                          <div className="text-2xl font-bold text-white">{selectedTemplate.rating?.toFixed(1) || '0.0'}</div>
                          <div className="text-sm text-gray-400">Avg. Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Prompt Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-400" />
                      AI Generation Prompt
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCopyPrompt(selectedTemplate.promptText, selectedTemplate._id)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-xl transition-colors flex items-center gap-2 border border-white/10"
                    >
                      {copiedId === selectedTemplate._id ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Prompt
                        </>
                      )}
                    </motion.button>
                  </div>
                  <div className="relative">
                    <div className="p-5 bg-black/50 border border-violet-500/30 rounded-2xl">
                      <pre className="text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                        {selectedTemplate.promptText}
                      </pre>
                    </div>
                    <div className="absolute top-3 right-3 text-xs text-violet-400 font-medium">
                      {selectedTemplate.promptText?.length || 0} chars
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleCopyPrompt(selectedTemplate.promptText, selectedTemplate._id)}
                    className="flex-1 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors border border-white/10 hover:border-white/20 flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Prompt
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setIsPreviewOpen(false);
                      handleUseTemplate(selectedTemplate);
                    }}
                    disabled={!selectedTemplate.isActive || !selectedTemplate.isPublic || !selectedTemplate.isTested}
                    className={`flex-1 py-3.5 bg-gradient-to-r ${contentTypeColors[selectedTemplate.contentType]} text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                  >
                    <Sparkles className="w-4 h-4" />
                    Use This Template
                    <span className="text-xs opacity-90 ml-1">({selectedTemplate.credits} credits)</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}