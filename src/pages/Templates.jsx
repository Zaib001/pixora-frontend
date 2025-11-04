// src/pages/Templates.jsx
import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, Star, Download, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Templates() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const categories = [
    'all', 'business', 'social', 'education', 'entertainment', 'personal'
  ];

  const templates = [
    {
      id: 1,
      title: "Corporate Presentation",
      category: "business",
      duration: "2:00",
      rating: 4.8,
      uses: 1250,
      credits: 25,
      preview: "📊",
      popular: true
    },
    {
      id: 2,
      title: "Social Media Reel",
      category: "social",
      duration: "0:45",
      rating: 4.9,
      uses: 890,
      credits: 15,
      preview: "📱",
      popular: true
    },
    {
      id: 3,
      title: "Educational Tutorial",
      category: "education",
      duration: "5:30",
      rating: 4.7,
      uses: 670,
      credits: 35,
      preview: "🎓",
      popular: false
    },
    {
      id: 4,
      title: "Music Video",
      category: "entertainment",
      duration: "3:15",
      rating: 4.6,
      uses: 450,
      credits: 30,
      preview: "🎵",
      popular: false
    },
    {
      id: 5,
      title: "Travel Vlog",
      category: "personal",
      duration: "4:20",
      rating: 4.9,
      uses: 1200,
      credits: 40,
      preview: "✈️",
      popular: true
    },
    {
      id: 6,
      title: "Product Demo",
      category: "business",
      duration: "1:30",
      rating: 4.5,
      uses: 340,
      credits: 20,
      preview: "📦",
      popular: false
    }
  ];

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
          <h1 className="text-3xl font-bold text-white">Video Templates</h1>
          <p className="text-gray-300">Choose from professionally designed templates</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-3 rounded-xl font-medium capitalize transition-all ${
                category === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-lg hover:border-white/20 transition-all duration-300 group"
          >
            {/* Template Preview */}
            <div className="aspect-video bg-white/10 relative overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-6xl">
                {template.preview}
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                  <Play className="w-6 h-6 text-white" />
                </button>
                <button className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors">
                  <Download className="w-6 h-6 text-white" />
                </button>
              </div>
              {template.popular && (
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-yellow-500 text-yellow-900 text-xs font-bold rounded-full">
                    POPULAR
                  </span>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-white font-semibold text-lg">{template.title}</h3>
                <span className="text-purple-400 font-bold">{template.credits} credits</span>
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
                  <span>{template.uses.toLocaleString()} uses</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white font-medium">
                  Preview
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-white font-medium">
                  Use Template
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
}