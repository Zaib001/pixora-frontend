// src/pages/Library.jsx
import { useState, useEffect, useMemo, useRef } from "react";
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
  Eye,
  Check,
  Copy,
  ExternalLink,
  MoreVertical,
  TrendingUp,
  BarChart3,
  HardDrive,
  Pause
} from "lucide-react";
import CreditsBadge from "../../components/dashboard/CreditsBadge";
import { getGenerationHistory, deleteContent } from "../../services/generationService";
import { toast } from "react-hot-toast";
import { downloadFile } from "../../utils/fileUtils";
import { useTranslation } from "react-i18next";
import { serverURL } from "../../api/axios";

const filters = [
  { id: 'all', name: 'library.filters.all', icon: FolderOpen, color: 'from-violet-500 to-indigo-500' },
  { id: 'image', name: 'library.filters.images', icon: ImageIcon, color: 'from-emerald-500 to-green-500' },
  { id: 'video', name: 'library.filters.videos', icon: Video, color: 'from-blue-500 to-cyan-500' },
];

const LibraryItemCard = ({
  item,
  index,
  viewMode,
  selectedItems,
  toggleItemSelection,
  setSelectedMedia,
  handleDownload,
  handleShare,
  handleCopyPrompt,
  handleDelete,
  formatDate,
  copiedId,
  t
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (item.type === 'video' && videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(err => console.log("Hover play blocked", err));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, item.type]);

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="group relative bg-[#13131a] border border-white/5 rounded-2xl overflow-hidden flex h-32 hover:border-purple-500/40 transition-all duration-300"
      >
        <div className="relative w-48 flex-shrink-0 overflow-hidden bg-black">
          {item.type === 'video' ? (
            <video ref={videoRef} src={item.url} poster={item.thumbnailUrl} muted loop playsInline className="w-full h-full object-cover" />
          ) : (
            <img src={item.thumbnailUrl || item.url} alt="" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.type === 'image' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                {item.type}
              </span>
              <span className="text-[10px] text-gray-500">{formatDate(item.createdAt)}</span>
            </div>
            <h3 className="text-white text-sm font-medium line-clamp-1">{item.prompt || "Untitled Creation"}</h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={() => setSelectedMedia(item)} className="p-1.5 text-gray-400 hover:text-white transition-colors"><Eye size={14} /></button>
              <button onClick={() => handleDownload(item)} className="p-1.5 text-gray-400 hover:text-white transition-colors"><Download size={14} /></button>
              <button onClick={() => handleCopyPrompt(item.prompt, item._id)} className="p-1.5 text-gray-400 hover:text-white transition-colors">
                {copiedId === item._id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
            </div>
            <button onClick={() => handleDelete(item)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative aspect-[3/4] bg-[#0a0a0f] rounded-[2rem] overflow-hidden border border-white/5 hover:border-purple-500/40 transition-all duration-500 shadow-2xl"
    >
      {/* Media Background - The Hero */}
      <div className="absolute inset-0 z-0">
        {item.type === 'video' ? (
          <>
            <video
              ref={videoRef}
              src={item.url.includes('#t=') ? item.url : `${item.url}#t=0.001`}
              poster={item.thumbnailUrl}
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
            src={item.thumbnailUrl || item.url}
            alt=""
            className={`w-full h-full object-cover transition-transform duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800'; }}
          />
        )}
        {/* Default Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
      </div>

      {/* Top Bar - Type Badge & Selection */}
      <div className="absolute top-5 inset-x-5 z-20 flex justify-between items-start">
        <div
          onClick={(e) => { e.stopPropagation(); toggleItemSelection(item._id); }}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${selectedItems.includes(item._id)
            ? 'bg-purple-500 border-purple-500 shadow-lg shadow-purple-500/50'
            : 'bg-black/20 border-white/20 hover:border-white/40'
            }`}
        >
          {selectedItems.includes(item._id) && <Check size={12} className="text-white" />}
        </div>

        <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/10 ${item.type === 'image' ? 'bg-emerald-500/20' : 'bg-blue-500/20'
          }`}>
          {item.type}
        </div>
      </div>

      {/* Hover Overlay - The Magic */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent backdrop-blur-[2px]"
          >
            {/* Play/Pause Indicator for Video */}
            {item.type === 'video' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white">
                  <Play size={24} fill="currentColor" />
                </motion.div>
              </div>
            )}

            <div className="space-y-4">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Calendar size={10} className="text-purple-400" />
                  {formatDate(item.createdAt)}
                </p>
                <h3 className="text-white font-bold text-lg line-clamp-2 leading-tight drop-shadow-lg">
                  {item.prompt || "Digital Masterpiece"}
                </h3>
              </motion.div>

              {/* Action Grid */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-4 gap-2 pt-2">
                <button onClick={() => setSelectedMedia(item)} title="Preview" className="flex items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all">
                  <Eye size={18} />
                </button>
                <button onClick={() => handleDownload(item)} title="Download" className="flex items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all">
                  <Download size={18} />
                </button>
                <button onClick={() => handleCopyPrompt(item.prompt, item._id)} title="Copy Prompt" className="flex items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all">
                  {copiedId === item._id ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
                <button onClick={() => handleDelete(item)} title="Delete" className="flex items-center justify-center p-3 rounded-2xl bg-red-500/20 hover:bg-red-500/40 border border-red-500/20 text-red-300 transition-all">
                  <Trash2 size={18} />
                </button>
              </motion.div>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => handleShare(item)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all flex items-center justify-center gap-2"
              >
                <Share2 size={14} />
                Share Creation
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

export default function Library() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [shareDialog, setShareDialog] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Real Data State
  const [libraryItems, setLibraryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    images: 0,
    videos: 0,
    storage: "0MB",
    recent: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const historyData = await getGenerationHistory({ page: 1, limit: 100 });

        if (historyData.success) {
          const items = historyData.data?.content || [];
          // Process items to ensure video URLs are properly formatted
          const processedItems = items.map(item => ({
            ...item,
            url: item.url?.startsWith('http') ? item.url : `${serverURL}/${item.url?.replace(/^\//, '')}`,
            thumbnailUrl: item.thumbnailUrl?.startsWith('http')
              ? item.thumbnailUrl
              : item.thumbnailUrl
                ? `${serverURL}/${item.thumbnailUrl.replace(/^\//, '')}`
                : null
          }));

          setLibraryItems(processedItems);

          // Calculate stats
          const imagesCount = processedItems.filter(i => i.type === 'image').length;
          const videosCount = processedItems.filter(i => i.type === 'video').length;
          const recentCount = processedItems.filter(i => {
            const itemDate = new Date(i.createdAt);
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return itemDate > sevenDaysAgo;
          }).length;

          setStats({
            total: processedItems.length,
            images: imagesCount,
            videos: videosCount,
            recent: recentCount,
            storage: `${(processedItems.length * 2.5).toFixed(1)}MB`
          });
        }
      } catch (error) {
        console.error("Failed to load library:", error);
        toast.error("Failed to load library content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const filteredItems = useMemo(() => {
    return libraryItems.filter(item => {
      const prompt = item.prompt || "";
      const matchesSearch = prompt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [libraryItems, searchQuery, activeFilter]);

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDownload = async (item) => {
    if (!item.url) {
      toast.error(t("library.messages.noUrl"));
      return;
    }

    const extension = item.type === 'video' ? 'mp4' : 'png';
    const filename = `pixora-${item.type}-${item._id || Date.now()}.${extension}`;

    const loadingToast = toast.loading(t("library.messages.downloadStart"));
    try {
      await downloadFile(item.url, filename);
      toast.success(t("library.messages.downloadStarted"), {
        id: loadingToast,
        style: {
          background: '#111827',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      });
    } catch (error) {
      toast.error(t("library.messages.downloadError"), {
        id: loadingToast,
        style: {
          background: '#111827',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      });
    }
  };

  const handleShare = (item) => {
    try {
      const url = item.url || "";
      if (!url) {
        toast.error(t("library.messages.noUrl"));
        return;
      }

      const absoluteUrl = url.startsWith('http')
        ? url
        : `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;

      setShareDialog({
        open: true,
        title: t("library.messages.shareTitle"),
        url: absoluteUrl,
        prompt: item.prompt || t("library.messages.shareDefault"),
        type: item.type,
        thumbnail: item.thumbnailUrl || item.url
      });
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  const handleDelete = (item) => {
    setDeleteConfirm(item);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;

    try {
      await deleteContent(deleteConfirm._id);

      setLibraryItems(prev => prev.filter(i => i._id !== deleteConfirm._id));

      setStats(prev => ({
        ...prev,
        total: prev.total - 1,
        images: deleteConfirm.type === 'image' ? prev.images - 1 : prev.images,
        videos: deleteConfirm.type === 'video' ? prev.videos - 1 : prev.videos
      }));

      toast.success(t("library.messages.deleteSuccess"), {
        style: {
          background: '#111827',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      });
      setDeleteConfirm(null);
    } catch (error) {
      toast.error(error.message || t("library.messages.deleteError"));
    }
  };

  const handleCopyPrompt = async (prompt, itemId) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedId(itemId);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 start-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 end-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 start-1/2 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl shadow-lg">
                <FolderOpen size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {t("library.title") || "My Library"}
                </h1>
                <p className="text-gray-400 text-sm md:text-base mt-1">
                  {t("library.subtitle") || "All your AI-generated content in one place"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            {
              label: "Total Items",
              value: stats.total,
              icon: <FolderOpen className="w-5 h-5" />,
              color: "from-violet-500 to-indigo-500",
              bgColor: "bg-violet-500/10",
              change: "+12%"
            },
            {
              label: "Images",
              value: stats.images,
              icon: <ImageIcon className="w-5 h-5" />,
              color: "from-emerald-500 to-green-500",
              bgColor: "bg-emerald-500/10",
              change: "+8%"
            },
            {
              label: "Videos",
              value: stats.videos,
              icon: <Video className="w-5 h-5" />,
              color: "from-blue-500 to-cyan-500",
              bgColor: "bg-blue-500/10",
              change: "+23%"
            },
            {
              label: "Storage Used",
              value: stats.storage,
              icon: <HardDrive className="w-5 h-5" />,
              color: "from-amber-500 to-orange-500",
              bgColor: "bg-amber-500/10",
              change: "+5%"
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
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
              <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full`} style={{ width: `${Math.random() * 40 + 60}%` }} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-violet-400 transition-colors" />
                <input
                  type="text"
                  placeholder={t("library.search") || "Search by prompt, type, or date..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all hover:border-white/20"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.id;
                return (
                  <motion.button
                    key={filter.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${isActive
                      ? `bg-gradient-to-r ${filter.color} text-white shadow-lg`
                      : 'bg-white/5 backdrop-blur-sm text-gray-300 hover:bg-white/10 border border-white/10 hover:border-white/20'
                      }`}
                  >
                    <Icon size={16} />
                    <span className="font-medium">{t(filter.name)}</span>
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
                className={`p-2.5 rounded-xl border transition-all ${viewMode === 'grid'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/5 backdrop-blur-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
              >
                <Grid size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl border transition-all ${viewMode === 'list'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/5 backdrop-blur-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
              >
                <List size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bulk Actions Bar */}
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-violet-500/20 to-indigo-500/20 backdrop-blur-sm rounded-2xl border border-white/10 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">
                    {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                  </p>
                  <p className="text-sm text-white/60">Select actions to perform</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download All
                </button>
                <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl font-medium transition-colors text-sm flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete All
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`${viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
            }`}
        >
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-violet-500/20 rounded-full" />
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="mt-6 text-gray-400 font-medium">Loading your library...</p>
              <p className="text-sm text-gray-500 mt-2">Fetching your generated content</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <LibraryItemCard
                  key={item._id}
                  item={item}
                  index={index}
                  viewMode={viewMode}
                  selectedItems={selectedItems}
                  toggleItemSelection={toggleItemSelection}
                  setSelectedMedia={setSelectedMedia}
                  handleDownload={handleDownload}
                  handleShare={handleShare}
                  handleCopyPrompt={handleCopyPrompt}
                  handleDelete={handleDelete}
                  formatDate={formatDate}
                  copiedId={copiedId}
                  t={t}
                />
              ))}
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-16 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                <FolderOpen size={40} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {searchQuery || activeFilter !== 'all' ? t("library.empty.noResults") : t("library.empty.title")}
              </h3>
              <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
                {searchQuery || activeFilter !== 'all'
                  ? t("library.empty.noResultsSub")
                  : t("library.empty.subtitle")}
              </p>
              {!searchQuery && activeFilter === 'all' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/generate/text-to-video')}
                  className="px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-violet-500/25 transition-all flex items-center gap-2 mx-auto"
                >
                  <Sparkles size={20} />
                  {t("library.empty.start")}
                  <Plus size={20} />
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Media Preview Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-6xl w-full bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/10"
              >
                <X size={24} />
              </button>

              {/* Media Container */}
              <div className="flex-1 flex items-center justify-center bg-black/20 p-8 overflow-hidden">
                {selectedMedia.type === 'video' ? (
                  <video
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    controlsList="nodownload"
                  />
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.prompt}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />
                )}
              </div>

              {/* Media Details */}
              <div className="p-6 bg-black/80 backdrop-blur-xl border-t border-white/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-2 truncate">
                      {selectedMedia.prompt || t("library.ui.untitled")}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                      <span className={`px-2.5 py-1 rounded-lg capitalize ${selectedMedia.type === 'image'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                        {selectedMedia.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {formatDate(selectedMedia.createdAt)}
                      </span>
                      {selectedMedia.duration && (
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {selectedMedia.duration}s
                        </span>
                      )}
                      {selectedMedia.style && (
                        <span className="px-2 py-1 bg-white/5 rounded-lg capitalize">
                          {selectedMedia.style}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCopyPrompt(selectedMedia.prompt, selectedMedia._id)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all flex items-center gap-2"
                    >
                      {copiedId === selectedMedia._id ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Prompt
                        </>
                      )}
                    </motion.button>
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
                      className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Download size={18} />
                      Download
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <Trash2 size={32} className="text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                {t("library.ui.deleteTitle")}
              </h3>
              <p className="text-gray-400 text-center mb-6">
                {t("library.ui.deleteConfirm", {
                  title: deleteConfirm.prompt?.substring(0, 50) || t("library.ui.untitled")
                })}
              </p>
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
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Dialog Modal */}
      <AnimatePresence>
        {shareDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
            onClick={() => setShareDialog(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShareDialog(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl">
                    <Share2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Share Content</h3>
                    <p className="text-gray-400">Share your AI-generated content with others</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Preview */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  {shareDialog.type === 'video' ? (
                    <video
                      src={shareDialog.thumbnail}
                      className="w-16 h-16 rounded-lg object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={shareDialog.thumbnail}
                      alt="Preview"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {shareDialog.prompt?.substring(0, 60) || 'AI Generated Content'}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {shareDialog.url?.substring(0, 80)}...
                    </p>
                  </div>
                </div>

                {/* URL Copy */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Share URL
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-black/50 border border-white/10 rounded-xl p-3">
                      <p className="text-sm text-gray-400 font-mono truncate">
                        {shareDialog.url}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(shareDialog.url);
                          toast.success("URL copied to clipboard!", {
                            style: {
                              background: '#111827',
                              color: '#fff',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                            }
                          });
                        } catch (error) {
                          toast.error("Failed to copy URL");
                        }
                      }}
                      className="px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Copy size={16} />
                      Copy
                    </motion.button>
                  </div>
                </div>

                {/* Social Share Buttons */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">
                    Share to social media
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { name: 'Twitter', icon: '🐦', color: 'from-blue-400 to-blue-500' },
                      { name: 'Facebook', icon: '📘', color: 'from-blue-600 to-blue-700' },
                      { name: 'LinkedIn', icon: '💼', color: 'from-blue-700 to-blue-800' },
                      { name: 'WhatsApp', icon: '💚', color: 'from-green-500 to-green-600' },
                      { name: 'Telegram', icon: '📲', color: 'from-blue-500 to-cyan-500' },
                      { name: 'Reddit', icon: '👨', color: 'from-orange-500 to-red-500' }
                    ].map((platform) => (
                      <motion.button
                        key={platform.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const text = `Check out this AI-generated ${shareDialog.type}!\n\n${shareDialog.url}`;
                          const urls = {
                            Twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
                            Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareDialog.url)}`,
                            LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareDialog.url)}`,
                            WhatsApp: `https://wa.me/?text=${encodeURIComponent(text)}`,
                            Telegram: `https://t.me/share/url?url=${encodeURIComponent(shareDialog.url)}&text=${encodeURIComponent(text)}`,
                            Reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareDialog.url)}&title=${encodeURIComponent(shareDialog.prompt?.substring(0, 100) || 'AI Generated Content')}`
                          };
                          window.open(urls[platform.name], '_blank', 'noopener,noreferrer');
                          setShareDialog(null);
                        }}
                        className={`p-4 bg-gradient-to-r ${platform.color} text-white rounded-xl font-bold hover:shadow-lg transition-all flex flex-col items-center gap-2`}
                      >
                        <span className="text-xl">{platform.icon}</span>
                        <span className="text-sm">{platform.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}