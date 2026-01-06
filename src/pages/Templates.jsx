// src/pages/Templates.jsx
import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, Star, Play, Zap, Clock, Users, Eye, X, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/endpoints";
import api from "../api/axios";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

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

  const categories = [
    'all', 'business', 'social', 'education', 'entertainment', 'personal', 'other'
  ];
  // Add these icons if not already imported
  const Film = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
  );
  const Image = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
  const contentTypeIcons = {
    textToVideo: <Film className="w-4 h-4" />,
    imageToVideo: <Film className="w-4 h-4" />,
    textToImage: <Image className="w-4 h-4" />,
    imageToImage: <Image className="w-4 h-4" />
  };

  const contentTypeColors = {
    textToVideo: "from-purple-600 to-blue-600",
    imageToVideo: "from-blue-600 to-cyan-600",
    textToImage: "from-green-600 to-emerald-600",
    imageToImage: "from-orange-600 to-red-600"
  };





  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        // Use the public endpoint for users
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

  const handleUseTemplate = async (template) => {
    console.log('Template clicked:', template);
    console.log('Template data to send:', {
      prompt: template.promptText,
      contentType: template.contentType,
      templateId: template._id,
      credits: template.credits,
      duration: template.duration,
      category: template.category
    });

    const generatorPaths = {
      textToVideo: '/generate/text-to-video',
      imageToVideo: '/generate/image-to-video',
      textToImage: '/generate/text-to-image',
      imageToImage: '/generate/image-to-image'
    };

    const targetPath = generatorPaths[template.contentType] || '/generate/text-to-video';
    console.log('Navigating to:', targetPath);

    navigate(targetPath, {
      state: {
        templateData: {
          prompt: template.promptText,
          contentType: template.contentType,
          templateId: template._id,
          credits: template.credits,
          duration: template.duration,
          category: template.category
        }
      }
    });
  };

  const handlePreview = (template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleCopyPrompt = async (prompt) => {
    try {
      await navigator.clipboard.writeText(prompt);

      // Show success toast with the copied text preview
      toast.success(
        <div>
          <div className="font-bold">Prompt copied!</div>
          <div className="text-xs text-gray-300 truncate max-w-xs mt-1">
            {prompt.length > 50 ? `${prompt.substring(0, 50)}...` : prompt}
          </div>
        </div>,
        {
          duration: 3000,
          icon: '📋',
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }
      );
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error("Failed to copy prompt");
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || template.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_70%)]" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors border border-white/10"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </motion.button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">{t("templates.title")}</h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base">{t("templates.subtitle")}</p>
        </div>

        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-white font-medium">{templates.length}</span>
          <span className="text-gray-400 text-sm">Templates</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="relative z-10 flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t("templates.searchPlaceholder") || "Search templates..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:overflow-visible md:pb-0">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(cat)}
              className={`px-4 py-3 rounded-xl font-medium capitalize whitespace-nowrap transition-all ${category === cat
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                : 'bg-white/5 backdrop-blur-sm text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
            >
              {t(`templates.categories.${cat}`) || cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Available</p>
              <p className="text-xl font-bold text-white">{filteredTemplates.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Uses</p>
              <p className="text-xl font-bold text-white">
                {templates.reduce((sum, t) => sum + t.uses, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Star className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg. Rating</p>
              <p className="text-xl font-bold text-white">
                {(templates.reduce((sum, t) => sum + t.rating, 0) / templates.length || 0).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Zap className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Popular</p>
              <p className="text-xl font-bold text-white">
                {templates.filter(t => t.isPopular).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      {loading ? (
        <div className="relative z-10 text-center py-20">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">{t("templates.loading") || "Loading templates..."}</p>
        </div>
      ) : (
        <>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/10"
              >
                {/* Template Status Badge */}
                {!template.isActive || !template.isPublic || !template.isTested ? (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-lg">
                      Unavailable
                    </div>
                  </div>
                ) : template.isPopular && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-lg flex items-center gap-1">
                      <Star size={10} fill="currentColor" />
                      POPULAR
                    </div>
                  </div>
                )}

                {/* Template Header */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${contentTypeColors[template.contentType] || 'from-purple-600 to-blue-600'} shadow-md`}>
                      {contentTypeIcons[template.contentType]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-lg truncate" title={template.title}>
                        {template.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mt-1">{template.description}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-lg capitalize border border-white/5">
                      {template.category}
                    </span>
                    <span className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded-lg border border-purple-500/20">
                      {template.contentType.replace(/([A-Z])/g, ' $1')}
                    </span>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                      <Clock className="w-4 h-4 text-gray-400 mb-1" />
                      <span className="text-white font-bold text-sm">{template.duration || 'N/A'}</span>
                      <span className="text-gray-400 text-[10px]">Duration</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
                        <span className="text-white font-bold text-sm">{template.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-gray-400 text-[10px]">Rating</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                      <Users className="w-4 h-4 text-blue-400 mb-1" />
                      <span className="text-white font-bold text-sm">{template.uses.toLocaleString()}</span>
                      <span className="text-gray-400 text-[10px]">Uses</span>
                    </div>
                  </div>

                  {/* Credits & Quality */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-medium">Credits</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 font-bold text-lg">{template.credits}</span>
                        <span className="text-gray-400 text-sm">each</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-8 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                            style={{ width: `${(template.qualityScore || 0) * 10}%` }}
                          />
                        </div>
                        <span className="text-white text-xs font-bold">{template.qualityScore || 0}/10</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleUseTemplate(template)}
                      disabled={isLoadingTemplate || !template.isActive || !template.isPublic || !template.isTested}
                      className={`w-full py-3 bg-gradient-to-r ${contentTypeColors[template.contentType] || 'from-purple-600 to-blue-600'} text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                    >
                      {isLoadingTemplate ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Use Template
                          <span className="text-xs opacity-80">({template.credits} credits)</span>
                        </>
                      )}
                    </motion.button>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePreview(template)}
                        className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Preview
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyPrompt(template.promptText);
                        }}
                        className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Prompt
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {!loading && filteredTemplates.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative z-10 text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
                <Filter className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t("templates.noResults") || "No templates found"}</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                {t("templates.noResultsSub") || "Try adjusting your search or filter criteria"}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategory('all');
                }}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-[#0f0f12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedTemplate.title}</h2>
                  <p className="text-gray-400">{selectedTemplate.description}</p>
                </div>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                {/* Template Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-gray-400 mb-2">Category</h3>
                      <div className="px-3 py-2 bg-white/5 rounded-lg text-white capitalize">
                        {selectedTemplate.category}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-400 mb-2">Content Type</h3>
                      <div className="px-3 py-2 bg-white/5 rounded-lg text-white">
                        {selectedTemplate.contentType.replace(/([A-Z])/g, ' $1')}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-400 mb-2">Duration</h3>
                      <div className="px-3 py-2 bg-white/5 rounded-lg text-white flex items-center gap-2">
                        <Clock size={16} />
                        {selectedTemplate.duration || 'Not specified'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-gray-400 mb-2">Credits Required</h3>
                      <div className="px-3 py-2 bg-yellow-500/20 rounded-lg text-yellow-400 flex items-center gap-2">
                        <Zap size={16} />
                        {selectedTemplate.credits} credit{selectedTemplate.credits > 1 ? 's' : ''}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-400 mb-2">Usage Stats</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="px-3 py-2 bg-white/5 rounded-lg text-center">
                          <div className="text-white font-bold">{selectedTemplate.uses.toLocaleString()}</div>
                          <div className="text-gray-400 text-xs">Uses</div>
                        </div>
                        <div className="px-3 py-2 bg-white/5 rounded-lg text-center">
                          <div className="text-white font-bold">{selectedTemplate.rating.toFixed(1)}</div>
                          <div className="text-gray-400 text-xs">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Prompt Preview */}
                <div className="mb-6">
                  <h3 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                    <Zap className="text-yellow-400" size={16} />
                    AI Prompt (What controls generation)
                  </h3>
                  <div className="relative">
                    <div className="p-4 bg-black/50 border border-purple-500/30 rounded-xl text-gray-300 font-mono text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
                      {selectedTemplate.promptText}
                    </div>
                    <button
                      onClick={() => handleCopyPrompt(selectedTemplate.promptText)}
                      className="absolute top-2 right-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-lg transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-white/10">
                  <button
                    onClick={() => handleCopyPrompt(selectedTemplate.promptText)}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
                  >
                    Copy Prompt
                  </button>
                  <button
                    onClick={() => {
                      setIsPreviewOpen(false);
                      handleUseTemplate(selectedTemplate);
                    }}
                    disabled={!selectedTemplate.isActive || !selectedTemplate.isPublic || !selectedTemplate.isTested}
                    className={`flex-1 py-3 bg-gradient-to-r ${contentTypeColors[selectedTemplate.contentType] || 'from-purple-600 to-blue-600'} text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoadingTemplate ? 'Loading...' : 'Use This Template'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}