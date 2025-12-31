import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Trash2,
    Eye,
    Layout,
    Image as ImageIcon,
    Film,
    Clock,
    Star,
    X,
    Upload,
    CheckCircle
} from "lucide-react";
import { toast } from "react-hot-toast";
import API from "../../api/endpoints";
import api from "../../api/axios"; // Assuming axios instance is here, check path if error

export default function AdminTemplates() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // New Template Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnailUrl: "",
        previewUrl: "",
        category: "business",
        duration: "",
        credits: 1,
        isPopular: false
    });

    const categories = ['business', 'social', 'education', 'entertainment', 'personal', 'other'];

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const response = await api.get(API.TEMPLATES);
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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this template?")) return;

        try {
            await api.delete(`${API.TEMPLATES}/${id}`);
            setTemplates(templates.filter(t => t._id !== id));
            toast.success("Template deleted successfully");
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete template");
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Basic validation
            if (!formData.title || !formData.thumbnailUrl || !formData.previewUrl) {
                toast.error("Please fill in all required fields");
                return;
            }

            const response = await api.post(API.TEMPLATES, formData);
            if (response.data.success) {
                setTemplates([response.data.data, ...templates]);
                setShowCreateModal(false);
                setFormData({
                    title: "",
                    description: "",
                    thumbnailUrl: "",
                    previewUrl: "",
                    category: "business",
                    duration: "",
                    credits: 1,
                    isPopular: false
                });
                toast.success("Template created successfully");
            }
        } catch (error) {
            console.error("Create error:", error);
            toast.error(error.response?.data?.message || "Failed to create template");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredTemplates = templates.filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Layout className="text-purple-400" size={32} />
                        Template Management
                    </h1>
                    <p className="text-gray-400 mt-1">Create and manage content templates</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCreateModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                    <Plus size={20} />
                    Add Template
                </motion.button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                    />
                </div>
            </div>

            {/* Templates Grid */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading templates...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTemplates.map((template) => (
                        <motion.div
                            key={template._id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group hover:border-purple-500/30 transition-all"
                        >
                            <div className="aspect-video relative overflow-hidden bg-gray-900">
                                <img
                                    src={template.thumbnailUrl}
                                    alt={template.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    onError={(e) => e.target.src = "https://placehold.co/600x400?text=No+Thumbnail"}
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => window.open(template.previewUrl, '_blank')}
                                        className="p-2 bg-white/10 rounded-lg hover:bg-white/20 text-white transition-colors"
                                        title="Preview"
                                    >
                                        <Eye size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(template._id)}
                                        className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 text-red-400 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                                {template.isPopular && (
                                    <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-lg flex items-center gap-1">
                                        <Star size={10} fill="currentColor" /> POPULAR
                                    </div>
                                )}
                            </div>

                            <div className="p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-white font-medium line-clamp-1">{template.title}</h3>
                                        <p className="text-xs text-gray-400 capitalize">{template.category}</p>
                                    </div>
                                    <span className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-300 border border-white/10">
                                        {template.credits} Credits
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                    <span className="flex items-center gap-1"><Clock size={12} /> {template.duration || 'N/A'}</span>
                                    <span className="flex items-center gap-1"><Upload size={12} /> {template.uses} uses</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Create Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#0f0f12] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Create New Template</h2>
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleCreate} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Title</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500"
                                            placeholder="e.g. Modern Business Intro"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500"
                                        >
                                            {categories.map(c => (
                                                <option key={c} value={c} className="bg-gray-900 capitalize">{c}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm text-gray-400">Description</label>
                                        <textarea
                                            required
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 h-24 resize-none"
                                            placeholder="Describe the template..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Thumbnail URL</label>
                                        <input
                                            required
                                            type="url"
                                            value={formData.thumbnailUrl}
                                            onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Preview/Video URL</label>
                                        <input
                                            required
                                            type="url"
                                            value={formData.previewUrl}
                                            onChange={(e) => setFormData({ ...formData, previewUrl: e.target.value })}
                                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500"
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Duration (e.g. 0:30)</label>
                                        <input
                                            type="text"
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500"
                                            placeholder="0:30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Credits Cost</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData.credits}
                                            onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
                                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isPopular"
                                        checked={formData.isPopular}
                                        onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-600 bg-white/5 text-purple-600 focus:ring-purple-500"
                                    />
                                    <label htmlFor="isPopular" className="text-sm text-white select-none">Mark as Popular</label>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {isSubmitting ? 'Creating...' : 'Create Template'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
