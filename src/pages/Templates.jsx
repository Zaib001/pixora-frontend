// src/pages/Templates.jsx
import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, Star, Download, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/endpoints";
import api from "../api/axios";
import { useTranslation } from "react-i18next";

export default function Templates() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    'all', 'business', 'social', 'education', 'entertainment', 'personal', 'other'
  ];

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await api.get(API.TEMPLATES);
        if (response.data.success) {
          setTemplates(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleUseTemplate = (template) => {
    navigate('/generate/text-to-video', {
      state: {
        templateData: {
          prompt: template.description || template.title,
          style: 'cinematic',
          duration: template.duration
        }
      }
    });
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || template.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </motion.button>
        <div>
          <h1 className="text-3xl font-bold text-white">{t("templates.title")}</h1>
          <p className="text-gray-300">{t("templates.subtitle")}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t("templates.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-3 rounded-xl font-medium capitalize transition-all ${category === cat
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
            >
              {t(`templates.categories.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">{t("templates.loading")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-lg hover:border-white/20 transition-all duration-300 group"
            >
              {/* Template Preview */}
              <div className="aspect-video bg-white/10 relative overflow-hidden">
                <img
                  src={template.thumbnailUrl}
                  alt={template.title}
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = "https://placehold.co/600x400?text=No+Thumbnail"}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <Play className="w-6 h-6 text-white" />
                  </button>
                  <button className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors">
                    <Download className="w-6 h-6 text-white" />
                  </button>
                </div>
                {template.isPopular && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-yellow-500 text-yellow-900 text-xs font-bold rounded-full">
                      {t("templates.popular")}
                    </span>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-white font-semibold text-lg">{template.title}</h3>
                  <span className="text-purple-400 font-bold">{template.credits} {t("templates.credits")}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center gap-1">
                    <span>{template.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{template.rating}</span>
                  </div>
                  <div>
                    <span>{template.uses.toLocaleString()} {t("templates.uses")}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.open(template.previewUrl, '_blank')}
                    className="flex-1 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white font-medium">
                    {t("templates.preview")}
                  </button>
                  <button
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-white font-medium">
                    {t("templates.useTemplate")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredTemplates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">{t("templates.noResults")}</h3>
          <p className="text-gray-400">{t("templates.noResultsSub")}</p>
        </motion.div>
      )}
    </div>
  );
}
