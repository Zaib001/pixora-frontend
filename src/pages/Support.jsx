// src/pages/Support.jsx
import { motion } from "framer-motion";
import { ArrowLeft, Search, MessageCircle, Book, Mail, Phone, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Support() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('getting-started');

  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: Book,
      articles: [
        'How to create your first video',
        'Understanding credits system',
        'Video export settings',
        'Template usage guide'
      ]
    },
    {
      id: 'billing',
      name: 'Billing & Plans',
      icon: Book,
      articles: [
        'How to upgrade your plan',
        'Understanding credit packages',
        'Payment method issues',
        'Cancel subscription'
      ]
    },
    {
      id: 'technical',
      name: 'Technical Issues',
      icon: Book,
      articles: [
        'Video rendering problems',
        'Audio sync issues',
        'Export quality settings',
        'Browser compatibility'
      ]
    },
    {
      id: 'account',
      name: 'Account Management',
      icon: Book,
      articles: [
        'Reset password',
        'Update profile information',
        'Account security',
        'Delete account'
      ]
    }
  ];

  const popularArticles = [
    'How to create viral videos with AI',
    'Best practices for video exports',
    'Credit usage optimization',
    'Troubleshooting common issues'
  ];

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
          <h1 className="text-3xl font-bold text-white">Help & Support</h1>
          <p className="text-gray-300">Get help with your video creation journey</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search help articles..."
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Help Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveCategory(category.id)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      activeCategory === category.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <category.icon className="w-5 h-5" />
                      <span className="font-semibold">{category.name}</span>
                    </div>
                    <p className="text-sm opacity-75">
                      {category.articles.length} articles
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Articles List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
            >
              <h2 className="text-xl font-semibold text-white mb-6">
                {categories.find(cat => cat.id === activeCategory)?.name} Articles
              </h2>
              <div className="space-y-3">
                {categories
                  .find(cat => cat.id === activeCategory)
                  ?.articles.map((article, index) => (
                    <motion.button
                      key={article}
                      whileHover={{ x: 5 }}
                      className="w-full p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white">{article}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    </motion.button>
                  ))}
              </div>
            </motion.div>
          </div>

          {/* Contact & Popular */}
          <div className="space-y-6">
            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Contact Support</h2>
              <div className="space-y-4">
                <button className="w-full p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Live Chat</span>
                </button>
                <button className="w-full p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Email Support</span>
                </button>
                <button className="w-full p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Call Support</span>
                </button>
              </div>
            </motion.div>

            {/* Popular Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Popular Articles</h2>
              <div className="space-y-3">
                {popularArticles.map((article, index) => (
                  <motion.button
                    key={article}
                    whileHover={{ x: 5 }}
                    className="w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="text-white text-sm">{article}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div>
                  <p className="text-white font-semibold">All Systems Operational</p>
                  <p className="text-green-300 text-sm">No ongoing issues</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
