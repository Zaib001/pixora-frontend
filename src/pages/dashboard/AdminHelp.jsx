import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    HelpCircle,
    Plus,
    Edit2,
    Trash2,
    Save,
    X,
    Video,
    MessageCircle,
    Loader2,
    Search
} from "lucide-react";
import {
    getHelpContent,
    createTutorial,
    updateTutorial,
    deleteTutorial,
    createFAQ,
    updateFAQ,
    deleteFAQ
} from "../../services/helpService";
import { toast } from "react-hot-toast";

export default function AdminHelp() {
    const [activeTab, setActiveTab] = useState("tutorials"); // 'tutorials' or 'faqs'
    const [tutorials, setTutorials] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await getHelpContent();
            if (data.success) {
                setTutorials(data.data.tutorials || []);
                setFaqs(data.data.faqs || []);
            }
        } catch (error) {
            console.error("Failed to load help content", error);
            toast.error("Failed to load content");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (item = null) => {
        setEditingItem(item);
        if (item) {
            setFormData({ ...item });
        } else {
            // Default form data based on tab
            if (activeTab === "tutorials") {
                setFormData({
                    title: "",
                    description: "",
                    duration: "",
                    level: "Beginner",
                    category: "Video AI",
                    thumbnail: "https://picsum.photos/seed/new/400/225",
                    isFeatured: false
                });
            } else {
                setFormData({
                    question: "",
                    answer: "",
                    category: "getting-started",
                    order: 0
                });
            }
        }
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            setActionLoading(true);
            let result;

            if (activeTab === "tutorials") {
                if (editingItem) {
                    result = await updateTutorial(editingItem._id, formData);
                } else {
                    result = await createTutorial(formData);
                }
            } else {
                if (editingItem) {
                    result = await updateFAQ(editingItem._id, formData);
                } else {
                    result = await createFAQ(formData);
                }
            }

            if (result.success) {
                toast.success(`${activeTab === "tutorials" ? "Tutorial" : "FAQ"} saved successfully!`);
                loadData();
                setShowModal(false);
            }
        } catch (error) {
            console.error("Save error:", error);
            toast.error(error.message || "Failed to save");
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            setActionLoading(true); // Global loading or specific? Global is easier for now.
            if (activeTab === "tutorials") {
                await deleteTutorial(id);
            } else {
                await deleteFAQ(id);
            }
            toast.success("Item deleted");
            loadData();
        } catch (error) {
            console.error("Delete error:", error);
            toast.error(error.message || "Failed to delete");
        } finally {
            setActionLoading(false);
        }
    };

    const filteredItems = activeTab === "tutorials"
        ? tutorials.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
        : faqs.filter(f => f.question.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen p-8">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-500/25">
                            <HelpCircle size={28} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">Help Content Management</h1>
                            <p className="text-gray-300 text-lg">Manage tutorials and FAQs</p>
                        </div>
                    </div>
                </div>

                {/* Filters & Actions */}
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 flex flex-col md:flex-row gap-4 justify-between items-center">

                    {/* Tabs */}
                    <div className="flex bg-white/5 rounded-xl p-1">
                        <button
                            onClick={() => setActiveTab("tutorials")}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === "tutorials" ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                        >
                            Tutorials
                        </button>
                        <button
                            onClick={() => setActiveTab("faqs")}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === "faqs" ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                        >
                            FAQs
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
                    >
                        <Plus size={20} />
                        Add New
                    </button>
                </div>

                {/* List Content */}
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden min-h-[400px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <Loader2 size={48} className="animate-spin text-purple-500" />
                        </div>
                    ) : (
                        <div className="divide-y divide-white/10">
                            {filteredItems.map((item) => (
                                <div key={item._id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        {activeTab === "tutorials" ? (
                                            <>
                                                <div className="w-24 h-16 rounded-lg bg-gray-800 overflow-hidden">
                                                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                                                    <p className="text-gray-400 text-sm">{item.category} • {item.level} • {item.duration}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex-1">
                                                <h3 className="text-white font-medium mb-1">{item.question}</h3>
                                                <p className="text-gray-400 text-sm line-clamp-1">{item.answer}</p>
                                                <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded mt-1 inline-block">
                                                    {item.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleOpenModal(item)}
                                            className="p-2 bg-white/5 rounded-lg text-blue-400 hover:bg-white/10 hover:text-blue-300 transition-colors"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="p-2 bg-white/5 rounded-lg text-red-400 hover:bg-white/10 hover:text-red-300 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {filteredItems.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-400">No items found.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-900 border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white">
                                    {editingItem ? "Edit" : "Add New"} {activeTab === "tutorials" ? "Tutorial" : "FAQ"}
                                </h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                {activeTab === "tutorials" ? (
                                    <>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1">Title</label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1">Description</label>
                                            <textarea
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                                                rows={3}
                                                value={formData.description}
                                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Duration</label>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                                                    value={formData.duration}
                                                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Level</label>
                                                <select
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                                                    value={formData.level}
                                                    onChange={e => setFormData({ ...formData, level: e.target.value })}
                                                >
                                                    <option>Beginner</option>
                                                    <option>Intermediate</option>
                                                    <option>Advanced</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Category</label>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                                                    value={formData.category}
                                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Thumbnail URL</label>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                                                    value={formData.thumbnail}
                                                    onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={formData.isFeatured}
                                                onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                                            />
                                            <label className="text-white">Featured Tutorial</label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1">Question</label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                                                value={formData.question}
                                                onChange={e => setFormData({ ...formData, question: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1">Answer</label>
                                            <textarea
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                                                rows={4}
                                                value={formData.answer}
                                                onChange={e => setFormData({ ...formData, answer: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Category</label>
                                                <select
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                                                    value={formData.category}
                                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                >
                                                    <option value="getting-started">Getting Started</option>
                                                    <option value="technical">Technical Issues</option>
                                                    <option value="billing">Billing & Credits</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Order</label>
                                                <input
                                                    type="number"
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                                                    value={formData.order}
                                                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="p-6 border-t border-white/10 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-white/5 rounded-lg text-white hover:bg-white/10"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={actionLoading}
                                    className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {actionLoading && <Loader2 size={16} className="animate-spin" />}
                                    Save
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
