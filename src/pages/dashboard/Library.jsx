import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Download, 
  Share2, 
  Trash2, 
  Play,
  Image as ImageIcon,
  Video,
  Sparkles,
  Calendar,
  Clock,
  FolderOpen,
  Plus,
  Zap
} from "lucide-react";
import CreditsBadge from "../../components/dashboard/CreditsBadge";

// Mock data for library items
const libraryItems = [
  {
    id: 1,
    type: 'image',
    title: 'Cyberpunk Cityscape',
    description: 'Futuristic neon-lit city with flying cars',
    thumbnail: 'https://picsum.photos/seed/cyberpunk/400/300',
    createdAt: '2024-01-15',
    size: '2.4 MB',
    dimensions: '1024×1024',
    style: 'Cinematic'
  },
  {
    id: 2,
    type: 'video',
    title: 'Mountain Sunrise Timelapse',
    description: 'Golden hour over snow-capped peaks',
    thumbnail: 'https://picsum.photos/seed/mountain/400/300',
    createdAt: '2024-01-14',
    duration: '15s',
    size: '45.2 MB',
    style: 'Realistic'
  },
  {
    id: 3,
    type: 'image',
    title: 'Fantasy Dragon Portrait',
    description: 'Mythical dragon in enchanted forest',
    thumbnail: 'https://picsum.photos/seed/dragon/400/300',
    createdAt: '2024-01-13',
    size: '3.1 MB',
    dimensions: '1024×1024',
    style: 'Fantasy'
  },
  {
    id: 4,
    type: 'video',
    title: 'Underwater Coral Reef',
    description: 'Colorful marine life in clear blue waters',
    thumbnail: 'https://picsum.photos/seed/underwater/400/300',
    createdAt: '2024-01-12',
    duration: '12s',
    size: '38.7 MB',
    style: 'Realistic'
  },
  {
    id: 5,
    type: 'image',
    title: 'Steampunk Workshop',
    description: 'Victorian era machinery with brass and gears',
    thumbnail: 'https://picsum.photos/seed/steampunk/400/300',
    createdAt: '2024-01-11',
    size: '2.8 MB',
    dimensions: '1024×1024',
    style: 'Artistic'
  },
  {
    id: 6,
    type: 'video',
    title: 'Space Nebula Journey',
    description: 'Travel through colorful cosmic clouds',
    thumbnail: 'https://picsum.photos/seed/space/400/300',
    createdAt: '2024-01-10',
    duration: '20s',
    size: '52.1 MB',
    style: 'Cinematic'
  }
];

const filters = [
  { id: 'all', name: 'All Content', icon: FolderOpen },
  { id: 'images', name: 'Images', icon: ImageIcon },
  { id: 'videos', name: 'Videos', icon: Video },
  { id: 'recent', name: 'Recent', icon: Clock },
];

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'images' && item.type === 'image') ||
                         (activeFilter === 'videos' && item.type === 'video') ||
                         (activeFilter === 'recent' && item.id <= 3);
    return matchesSearch && matchesFilter;
  });

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDownload = (item) => {
    console.log('Downloading:', item.title);
  };

  const handleShare = (item) => {
    console.log('Sharing:', item.title);
  };

  const handleDelete = (item) => {
    console.log('Deleting:', item.title);
  };

  return (
    <div className="min-h-screen p-8">

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-500/25">
                <FolderOpen size={28} className="text-white" />
              </div>
              Your Library
            </h1>
            <p className="text-xl text-gray-300">
              Manage and organize your generated content
            </p>
          </div>
          <CreditsBadge />
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FolderOpen size={24} className="text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">24</p>
            <p className="text-gray-400 text-sm">Total Items</p>
          </div>
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <ImageIcon size={24} className="text-pink-400" />
            </div>
            <p className="text-2xl font-bold text-white">16</p>
            <p className="text-gray-400 text-sm">Images</p>
          </div>
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Video size={24} className="text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">8</p>
            <p className="text-gray-400 text-sm">Videos</p>
          </div>
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Sparkles size={24} className="text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">1.2GB</p>
            <p className="text-gray-400 text-sm">Storage Used</p>
          </div>
        </motion.div>

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search your library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:bg-white/10 outline-none transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.id;
                return (
                  <motion.button
                    key={filter.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-500/20 border-purple-500 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">{filter.name}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg border transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-purple-500/20 border-purple-500 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Grid size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg border transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-purple-500/20 border-purple-500 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <List size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
              : 'space-y-4'
          }`}
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-300 ${
                  viewMode === 'list' && 'flex'
                }`}
              >
                {/* Thumbnail */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'
                }`}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${
                        item.type === 'image' ? 'bg-pink-500/20' : 'bg-blue-500/20'
                      }`}>
                        {item.type === 'image' ? (
                          <ImageIcon size={14} className="text-pink-400" />
                        ) : (
                          <Video size={14} className="text-blue-400" />
                        )}
                      </div>
                      <span className="text-white text-sm font-medium">
                        {item.type === 'image' ? 'Image' : 'Video'}
                      </span>
                    </div>
                    {item.type === 'video' && (
                      <div className="flex items-center gap-1 text-white text-sm">
                        <Play size={14} />
                        <span>{item.duration}</span>
                      </div>
                    )}
                  </div>

                  {/* Selection Checkbox */}
                  <div className="absolute top-3 left-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                      className="w-5 h-5 rounded border-white/20 bg-black/50 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold text-lg truncate">{item.title}</h3>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDownload(item)}
                        className="p-1.5 hover:bg-white/10 rounded transition-colors"
                        title="Download"
                      >
                        <Download size={16} className="text-gray-400 hover:text-white" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleShare(item)}
                        className="p-1.5 hover:bg-white/10 rounded transition-colors"
                        title="Share"
                      >
                        <Share2 size={16} className="text-gray-400 hover:text-white" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(item)}
                        className="p-1.5 hover:bg-white/10 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-gray-400 hover:text-red-400" />
                      </motion.button>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{item.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap size={12} />
                        <span>{item.style}</span>
                      </div>
                    </div>
                    <span className="bg-white/5 px-2 py-1 rounded">{item.size}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-16 text-center"
          >
            <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FolderOpen size={40} className="text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Your Library is Empty</h3>
            <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
              Generated images and videos will appear here. Start creating amazing content with AI!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Sparkles size={20} />
              Start Creating
              <Plus size={20} />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}