import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  Zap,
  X,
  Maximize2,
  Eye
} from "lucide-react";
import CreditsBadge from "../../components/dashboard/CreditsBadge";
import { getGenerationHistory, deleteContent } from "../../services/generationService";
import { toast } from "react-hot-toast";

const filters = [
  { id: 'all', name: 'All Content', icon: FolderOpen },
  { id: 'image', name: 'Images', icon: ImageIcon },
  { id: 'video', name: 'Videos', icon: Video },
];

export default function Library() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [shareDialog, setShareDialog] = useState(null);
  // Real Data State
  const [libraryItems, setLibraryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    images: 0,
    videos: 0,
    storage: "0MB" // Mock or calc
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch History (Get all or large limit for library view)
        const historyData = await getGenerationHistory({ page: 1, limit: 100 });

        if (historyData.success) {
          // BACKEND RETURNS: { data: { content: [], ... } }
          const items = historyData.data?.content || [];
          setLibraryItems(items);

          // Calculate stats
          const imagesCount = items.filter(i => i.type === 'image').length;
          const videosCount = items.filter(i => i.type === 'video').length;

          setStats({
            total: items.length,
            images: imagesCount,
            videos: videosCount,
            storage: `${(items.length * 2.5).toFixed(1)}MB` // Mock size estimation
          });
        }
      } catch (error) {
        // toast.error("Failed to load library");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = libraryItems.filter(item => {
    const prompt = item.prompt || "";
    const matchesSearch = prompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
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
    if (!item.url) {
      toast.error("No download URL available");
      return;
    }

    // Create filename
    const extension = item.type === 'video' ? 'mp4' : 'png';
    const filename = `pixora-${item.type}-${item._id || Date.now()}.${extension}`;

    // Check if it's a stream URL
    if (item.url.includes('/api/content/stream/')) {
      // Convert stream URL to download URL
      const baseUrl = item.url.split('?')[0];
      const downloadUrl = `${baseUrl}?download=true`;

      // Use fetch with blob for stream URLs
      fetch(downloadUrl, {
        credentials: 'include',
        headers: {
          'Accept': item.type === 'video' ? 'video/mp4' : 'image/png'
        }
      })
        .then(response => {
          if (!response.ok) throw new Error('Download failed');
          return response.blob();
        })
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl);
          toast.success("Download started!");
        })
        .catch(error => {
          // Fallback to direct link
          const link = document.createElement('a');
          link.href = item.url;
          link.target = "_blank";
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast("Opening in new tab. Please right-click and 'Save As'.");
        });
    } else {
      // For external URLs, try direct download
      const link = document.createElement('a');
      link.href = item.url;
      link.download = filename;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Download started!");
    }
  };

  const handleShare = (item) => {
    try {
      const url = item.url || "";
      if (!url) {
        toast.error("No URL available to share");
        return;
      }

      // Ensure URL is absolute
      const absoluteUrl = url.startsWith('http')
        ? url
        : `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;

      // Open the share dialog
      setShareDialog({
        open: true,
        title: "Share Content",
        url: absoluteUrl,
        prompt: item.prompt || "AI Generated Content"
      });

    } catch (error) {

      // Fallback: Try to copy directly
      try {
        navigator.clipboard.writeText(item.url)
          .then(() => {
            toast.success("Link copied to clipboard!");
          })
          .catch(() => {
            toast.error("Failed to share. Please copy the URL manually.");
          });
      } catch (clipboardError) {
        toast.error("Failed to share. Please copy the URL manually.");
      }
    }
  };

  const handleDelete = (item) => {
    setDeleteConfirm(item);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;

    try {
      await deleteContent(deleteConfirm._id);

      // Remove from local state
      setLibraryItems(prev => prev.filter(i => i._id !== deleteConfirm._id));

      // Update stats
      setStats(prev => ({
        ...prev,
        total: prev.total - 1,
        images: deleteConfirm.type === 'image' ? prev.images - 1 : prev.images,
        videos: deleteConfirm.type === 'video' ? prev.videos - 1 : prev.videos
      }));

      toast.success("Content deleted successfully!", {
        icon: "🗑️",
        duration: 2000
      });
      setDeleteConfirm(null);
    } catch (error) {
      toast.error(error.message || "Failed to delete content");
    }
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
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-gray-400 text-sm">Total Items</p>
          </div>
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <ImageIcon size={24} className="text-pink-400" />
            </div>
            <p className="text-2xl font-bold text-white">{stats.images}</p>
            <p className="text-gray-400 text-sm">Images</p>
          </div>
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Video size={24} className="text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{stats.videos}</p>
            <p className="text-gray-400 text-sm">Videos</p>
          </div>
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Sparkles size={24} className="text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">{stats.storage}</p>
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${isActive
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
                className={`p-2 rounded-lg border transition-all duration-300 ${viewMode === 'grid'
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
                className={`p-2 rounded-lg border transition-all duration-300 ${viewMode === 'list'
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
          className={`${viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
            : 'space-y-4'
            }`}
        >
          {loading && (
            <div className="col-span-full py-12 text-center text-gray-400">
              <div className="inline-block w-8 h-8 mb-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              <p>Loading your masterpiece...</p>
            </div>
          )}

          <AnimatePresence>
            {!loading && filteredItems.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`group relative bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 ${viewMode === 'list' && 'flex'}`}
              >
                {/* Thumbnail */}
                <div
                  className={`relative overflow-hidden cursor-pointer ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'}`}
                  onClick={() => setSelectedMedia(item)}
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full relative group/video">
                      <video
                        src={`${item.url}#t=0.001`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={item.thumbnailUrl}
                        onMouseOver={(e) => e.target.play().catch(() => { })}
                        onMouseOut={(e) => {
                          e.target.pause();
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                          <Play size={28} className="text-white fill-white ml-1" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.thumbnailUrl || item.url}
                      alt={item.prompt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}


                  {/* Overlay Gradient & Badges */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-md ${item.type === 'image'
                        ? 'bg-pink-500/20 text-pink-200 border border-pink-500/30'
                        : 'bg-blue-500/20 text-blue-200 border border-blue-500/30'
                        }`}>
                        <div className="flex items-center gap-1.5">
                          {item.type === 'image' ? <ImageIcon size={12} /> : <Video size={12} />}
                          <span className="capitalize">{item.type}</span>
                        </div>
                      </span>
                    </div>

                    {item.type === 'video' && item.duration && (
                      <div className="px-2 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-xs text-white font-medium">
                        <Play size={10} className="fill-white" />
                        <span>{item.duration}s</span>
                      </div>
                    )}
                  </div>

                  {/* Selection Checkbox - Moved inside Overlay for better visibility on hover */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div
                      className="p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item._id)}
                        onChange={() => toggleItemSelection(item._id)}
                        className="w-5 h-5 rounded border-white/30 bg-white/10 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Footer */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-white font-semibold text-lg leading-snug line-clamp-1 group-hover:text-purple-300 transition-colors" title={item.prompt}>
                        {item.prompt || "Untitled Creation"}
                      </h3>
                    </div>

                    <p className="text-gray-400 text-sm line-clamp-2 min-h-[2.5rem]">
                      {item.prompt || "No description provided."}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Action Buttons - Reveal on Hover */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform translate-y-2 group-hover:translate-y-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedMedia(item)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="View Fullscreen"
                      >
                        <Eye size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDownload(item)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Download"
                      >
                        <Download size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleShare(item)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Share Link"
                      >
                        <Share2 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(item)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {
          !loading && filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-16 text-center"
            >
              <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FolderOpen size={40} className="text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {searchQuery || activeFilter !== 'all' ? 'No items found' : 'Your Library is Empty'}
              </h3>
              <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
                {searchQuery || activeFilter !== 'all'
                  ? 'Try adjusting your search or filters.'
                  : 'Generated images and videos will appear here. Start creating amazing content with AI!'}
              </p>
              {activeFilter === 'all' && !searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/generate/text-to-video')}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <Sparkles size={20} />
                  Start Creating
                  <Plus size={20} />
                </motion.button>
              )}
            </motion.div>
          )
        }
      </div >

      {/* Media Viewer Modal */}
      < AnimatePresence >
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-black/50 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-white/10 transition-all z-10 border border-white/10"
              >
                <X size={24} />
              </button>

              {/* Content Container */}
              <div className="flex-1 flex items-center justify-center bg-black/20 overflow-hidden relative p-8">
                {selectedMedia.type === 'video' ? (
                  <video
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.prompt}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />
                )}
              </div>

              {/* Footer Details */}
              <div className="p-6 bg-black/80 backdrop-blur-xl border-t border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{selectedMedia.prompt || "Untitled"}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="capitalize px-2 py-0.5 rounded bg-white/10">{selectedMedia.type}</span>
                      <span>{new Date(selectedMedia.createdAt).toLocaleDateString()}</span>
                      {selectedMedia.duration && <span>{selectedMedia.duration}s</span>}
                      {selectedMedia.style && <span className="capitalize">{selectedMedia.style}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleShare(selectedMedia)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all flex items-center gap-2"
                    >
                      <Share2 size={18} />
                      Share
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(selectedMedia)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all flex items-center gap-2"
                    >
                      <Download size={18} />
                      Download
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )
        }
      </AnimatePresence >

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-md w-full bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden p-6"
              onClick={e => e.stopPropagation()}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} className="text-red-400" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                Delete Content?
              </h3>
              <p className="text-gray-400 text-center mb-6">
                Are you sure you want to delete "{deleteConfirm.prompt?.substring(0, 50) || 'this content'}"? This action cannot be undone.
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <AnimatePresence>
        {shareDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShareDialog(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-md w-full bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden p-6"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShareDialog(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>

              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                <Share2 size={28} className="text-purple-300" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                Share Content
              </h3>
              <p className="text-gray-400 text-center mb-4">
                {shareDialog.prompt?.substring(0, 100) || "AI Generated Content"}
              </p>

              {/* URL Display with Copy */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">Share URL</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(shareDialog.url);
                        toast.success("Copied to clipboard!", {
                          icon: "✅",
                          duration: 2000
                        });
                      } catch (error) {
                        // Fallback for older browsers
                        const textArea = document.createElement('textarea');
                        textArea.value = shareDialog.url;
                        textArea.style.position = 'fixed';
                        textArea.style.opacity = '0';
                        document.body.appendChild(textArea);
                        textArea.select();

                        try {
                          document.execCommand('copy');
                          toast.success("Copied to clipboard!", {
                            icon: "✅",
                            duration: 2000
                          });
                        } catch (execError) {
                          toast.error("Failed to copy. Please copy manually.");
                        } finally {
                          document.body.removeChild(textArea);
                        }
                      }
                    }}
                    className="text-sm text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy Link
                  </motion.button>
                </div>
                <div className="bg-black/50 border border-white/10 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-400 break-all font-mono">
                        {shareDialog.url}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-3 gap-3">
                {/* Copy Link */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(shareDialog.url);
                      toast.success("Copied to clipboard!", {
                        icon: "📋",
                        duration: 2000
                      });
                      setShareDialog(null);
                    } catch (error) {
                      toast.error("Failed to copy");
                    }
                  }}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-xl flex flex-col items-center gap-3 transition-all duration-300 hover:border-purple-500/30 border border-transparent"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full flex items-center justify-center border border-purple-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-white">Copy</span>
                </motion.button>

                {/* Twitter/X */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const tweetText = `${shareDialog.prompt?.substring(0, 100) || "Check out this AI-generated content!"} ${shareDialog.url}`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank', 'noopener,noreferrer');
                    setShareDialog(null);
                  }}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-xl flex flex-col items-center gap-3 transition-all duration-300 hover:border-blue-500/30 border border-transparent"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-blue-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-white">X</span>
                </motion.button>

                {/* WhatsApp */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const text = `${shareDialog.prompt?.substring(0, 100) || "Check this out!"}\n\n${shareDialog.url}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
                    setShareDialog(null);
                  }}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-xl flex flex-col items-center gap-3 transition-all duration-300 hover:border-green-500/30 border border-transparent"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-white">WhatsApp</span>
                </motion.button>

                {/* Facebook */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareDialog.url)}`, '_blank', 'noopener,noreferrer');
                    setShareDialog(null);
                  }}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-xl flex flex-col items-center gap-3 transition-all duration-300 hover:border-blue-600/30 border border-transparent"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-full flex items-center justify-center border border-blue-600/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-white">Facebook</span>
                </motion.button>

                {/* LinkedIn */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const title = shareDialog.prompt?.substring(0, 100) || "AI Generated Content";
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareDialog.url)}`, '_blank', 'noopener,noreferrer');
                    setShareDialog(null);
                  }}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-xl flex flex-col items-center gap-3 transition-all duration-300 hover:border-blue-700/30 border border-transparent"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-700/20 to-blue-800/20 rounded-full flex items-center justify-center border border-blue-700/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-white">LinkedIn</span>
                </motion.button>

                {/* Telegram */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const text = `${shareDialog.prompt?.substring(0, 100) || "Check this out!"}\n\n${shareDialog.url}`;
                    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareDialog.url)}&text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
                    setShareDialog(null);
                  }}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-xl flex flex-col items-center gap-3 transition-all duration-300 hover:border-blue-400/30 border border-transparent"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full flex items-center justify-center border border-blue-400/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.2 2.9c-.4-.2-.9-.1-1.2.2l-4.3 4.3-9.5-5.5c-.4-.2-.9-.1-1.2.2-.3.3-.4.8-.2 1.2l5.5 9.5-4.3 4.3c-.3.3-.4.8-.2 1.2.2.4.7.6 1.2.4l18-7c.4-.2.7-.6.7-1.1s-.3-.9-.7-1.1l-18-7z"></path>
                      <path d="m9.8 9.8-5.5 9.5"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-white">Telegram</span>
                </motion.button>
              </div>

              {/* Quick Copy Section */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">Quick Actions</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={async () => {
                      const markdownLink = `![${shareDialog.prompt?.substring(0, 50) || 'AI Image'}](${shareDialog.url})`;
                      try {
                        await navigator.clipboard.writeText(markdownLink);
                        toast.success("Markdown copied!", { duration: 2000 });
                      } catch (error) {
                        toast.error("Failed to copy");
                      }
                    }}
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="text-gray-400">[</span>
                    <span>Markdown</span>
                    <span className="text-gray-400">]</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={async () => {
                      const htmlLink = `<img src="${shareDialog.url}" alt="${shareDialog.prompt?.substring(0, 50) || 'AI Image'}" />`;
                      try {
                        await navigator.clipboard.writeText(htmlLink);
                        toast.success("HTML copied!", { duration: 2000 });
                      } catch (error) {
                        toast.error("Failed to copy");
                      }
                    }}
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="text-gray-400">&lt;</span>
                    <span>HTML</span>
                    <span className="text-gray-400">&gt;</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >

  );
}
