import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Search,
    Heart,
    Download,
    Share2,
    Play,
    ImageIcon,
    Loader2
} from "lucide-react";
import { getCommunityContent } from "../../services/generationService";
import { toast } from "react-hot-toast";

export default function Community() {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchContent();
    }, [page]);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const data = await getCommunityContent(page);
            if (data.success) {
                // If page 1, replace. If > 1, append? For now replace to keep simple. 
                // Or append for infinite scroll feel? Let's append if I implement "Load More".
                setContent(data.data.content);
                setTotalPages(data.data.totalPages);
            }
        } catch (error) {
            console.error("Failed to load community content", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredContent = content.filter(item =>
        item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.user && item.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen p-8">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-lg shadow-pink-500/25">
                                <Users size={28} className="text-white" />
                            </div>
                            Community Feed
                        </h1>
                        <p className="text-xl text-gray-300">
                            Explore amazing content created by the Pixora community
                        </p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search prompts or creators..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-pink-500 focus:bg-white/5 outline-none transition-all duration-300 backdrop-blur-xl"
                        />
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading && page === 1 ? (
                        <div className="col-span-full flex justify-center py-20">
                            <Loader2 size={48} className="animate-spin text-pink-500" />
                        </div>
                    ) : filteredContent.length > 0 ? (
                        filteredContent.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/10"
                            >
                                <div className="aspect-[4/5] relative overflow-hidden">
                                    <img
                                        src={item.thumbnailUrl || item.url}
                                        alt={item.prompt}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">

                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                                                {item.user?.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                            <span className="text-white font-medium text-sm truncate">{item.user?.name || 'Anonymous'}</span>
                                        </div>

                                        <p className="text-gray-300 text-xs line-clamp-2 mb-3">{item.prompt}</p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-pink-500 hover:text-white transition-colors">
                                                    <Heart size={16} />
                                                </button>
                                                <a
                                                    href={item.url}
                                                    download
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="p-2 bg-white/10 rounded-lg text-white hover:bg-blue-500 hover:text-white transition-colors"
                                                >
                                                    <Download size={16} />
                                                </a>
                                            </div>
                                            <span className="px-2 py-1 rounded-md bg-white/20 text-xs text-white font-medium uppercase">
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Type Badge (Visible when not hovering) */}
                                    <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1 group-hover:opacity-0 transition-opacity">
                                        {item.type === 'video' ? <Play size={12} fill="currentColor" /> : <ImageIcon size={12} />}
                                        {item.type === 'video' ? 'Video' : 'Image'}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            No content found. Be the first to publish!
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 hover:bg-white/10"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-gray-400">Page {page} of {totalPages}</span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 hover:bg-white/10"
                        >
                            Next
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
