
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Filter,
    MoreVertical,
    Trash2,
    Eye,
    EyeOff,
    AlertTriangle,
    CheckCircle,
    FileVideo,
    Image as ImageIcon,
    Music,
    Film,
    Calendar,
    User
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../api/axios";

export default function AdminCommunity() {
    const { t } = useTranslation();
    const [content, setContent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all"); // all, video, image
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchContent = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/admin/content`, {
                params: {
                    page,
                    limit: 10,
                    search: searchQuery,
                    type: filterType !== "all" ? filterType : undefined
                }
            });

            if (response.data.success) {
                setContent(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
            }
        } catch (error) {
            console.error("Failed to fetch content:", error);
            // Fallback for demo/dev if API fails
            // toast.error("Failed to load community content");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, [page, searchQuery, filterType]);

    const handleDelete = async (id) => {
        if (!window.confirm(t("admin.community.deleteConfirm"))) return;

        try {
            await api.delete(`/admin/content/${id}`);
            toast.success(t("admin.community.deleteSuccess"));
            fetchContent();
        } catch (error) {
            console.error("Delete error:", error);
            toast.error(t("admin.community.deleteError"));
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case "video": return <FileVideo size={18} className="text-purple-400" />;
            case "image": return <ImageIcon size={18} className="text-blue-400" />;
            case "audio": return <Music size={18} className="text-green-400" />;
            default: return <Film size={18} className="text-gray-400" />;
        }
    };

    return (
        <div className="p-8 space-y-8 min-h-screen ">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{t("admin.community.title", "Community Content")}</h1>
                    <p className="text-gray-400">{t("admin.community.subtitle", "Manage public content and moderation")}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search prompts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    {["all", "video", "image"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterType === type
                                ? "bg-purple-500 text-white"
                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                                }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content List */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Content</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Creator</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                                        Loading content...
                                    </td>
                                </tr>
                            ) : content.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                                        No community content found.
                                    </td>
                                </tr>
                            ) : (
                                content.map((item) => (
                                    <tr key={item._id} className="group hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                                                    {item.thumbnailUrl ? (
                                                        <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                            {getTypeIcon(item.type)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="max-w-xs truncate">
                                                    <p className="text-sm font-medium text-white truncate" title={item.prompt}>
                                                        {item.prompt}
                                                    </p>
                                                    <p className="text-xs text-gray-500">ID: {item._id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm text-gray-300 capitalize">
                                                {getTypeIcon(item.type)}
                                                {item.type}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs">
                                                    {item.user?.name?.[0] || "U"}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-white">{item.user?.name || "Unknown"}</p>
                                                    <p className="text-xs text-gray-500">{item.user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.isPublic ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                                    <Eye size={12} /> Public
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
                                                    <EyeOff size={12} /> Private
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors"
                                                    title="View"
                                                >
                                                    <Eye size={16} />
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors border border-red-500/20"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-400 bg-white/5 rounded-lg hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-400">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-400 bg-white/5 rounded-lg hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
