import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Trash2,
    Eye,
    Layout,
    Film,
    Clock,
    Star,
    X,
    Upload,
    CheckCircle,
    Zap,
    TestTube,
    Globe,
    Lock,
    BarChart,
    Copy,
    Sparkles
} from "lucide-react";
import { toast } from "react-hot-toast";
import debounce from 'lodash.debounce';
import API from "../../api/endpoints";
import api from "../../api/axios";

export default function AdminTemplates() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showTestModal, setShowTestModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [filters, setFilters] = useState({
        category: "all",
        contentType: "all",
        status: "all",
        sortBy: "createdAt",
        sortOrder: "desc"
    });
    const [pagination, setPagination] = useState({
        page: 1,
        total: 0,
        pages: 1,
        limit: 20
    });

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "business",
        duration: "",
        credits: 1,
        isPopular: false,
        promptText: "",
        contentType: "textToVideo",
        isActive: true,
        isPublic: false,
        isTested: false,
        qualityScore: 0,
        tags: []
    });
    const [currentTag, setCurrentTag] = useState("");
    const [editingId, setEditingId] = useState(null);

    const categories = ['business', 'social', 'education', 'entertainment', 'personal', 'other'];
    const contentTypes = [
        { id: 'textToVideo', label: 'Text → Video', icon: Film },
        { id: 'imageToVideo', label: 'Image → Video', icon: Film },
        { id: 'textToImage', label: 'Text → Image', icon: Layout },
        { id: 'imageToImage', label: 'Image → Image', icon: Layout }
    ];
    const statuses = [
        { id: 'all', label: 'All Templates' },
        { id: 'active', label: 'Active & Public', color: 'green' },
        { id: 'hidden', label: 'Hidden', color: 'blue' },
        { id: 'disabled', label: 'Disabled', color: 'red' },
        { id: 'untested', label: 'Untested', color: 'yellow' }
    ];

    const promptExamples = [
        "Cinematic shot with dramatic lighting, professional business animation with smooth transitions and modern typography",
        "Vibrant social media reel with dynamic transitions, trendy text animations, and upbeat background music",
        "Educational explainer animation with clear visual hierarchy, step-by-step progression, and engaging visual metaphors",
        "Professional corporate video with clean transitions, subtle motion graphics, and authoritative voiceover pacing"
    ];
    const statusColorMap = {
        green: 'text-green-400',
        red: 'text-red-400',
        blue: 'text-blue-400',
        yellow: 'text-yellow-400'
    };

    const bgColorMap = {
        green: 'bg-green-500',
        red: 'bg-red-500',
        blue: 'bg-blue-500',
        yellow: 'bg-yellow-500'
    };
    useEffect(() => {
        fetchTemplates();
    }, [filters, pagination.page]);

    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                ...filters,
                page: pagination.page,
                limit: pagination.limit,
                search: searchTerm
            });

            const response = await api.get(`${API.TEMPLATES}?${params}`);
            if (response.data.success) {
                setTemplates(response.data.data);
                setPagination(response.data.pagination);
            }
        } catch (error) {
            console.error("Failed to fetch templates:", error);
            toast.error("Failed to load templates");
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = useCallback(
        debounce((value) => {
            setSearchTerm(value);
            setPagination(prev => ({ ...prev, page: 1 }));
        }, 500),
        []
    );

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this template? This action cannot be undone.")) return;

        try {
            await api.delete(`${API.TEMPLATES}/${id}`);
            setTemplates(templates.filter(t => t._id !== id));
            toast.success("Template deleted successfully");
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete template");
        }
    };

    const handleStatusToggle = async (template, action) => {
        try {
            const response = await api.patch(`${API.TEMPLATES}/${template._id}/toggle-status`, { action });
            if (response.data.success) {
                setTemplates(templates.map(t =>
                    t._id === template._id ? response.data.data : t
                ));
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error("Toggle status error:", error);
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    const handleTestTemplate = async (template, qualityScore) => {
        try {

            const response = await api.post(`${API.TEMPLATES}/${template._id}/test`, {
                qualityScore: Number(qualityScore)
            });

            console.log('Test response:', response.data);

            if (response.data.success) {
                const updatedTemplate = response.data.data;
                setTemplates(templates.map(t =>
                    t._id === template._id ? updatedTemplate : t
                ));
                setShowTestModal(false);
                setSelectedTemplate(null);
                toast.success(`Template tested with score ${updatedTemplate.qualityScore}/10`);
            }
        } catch (error) {
            console.error("Test template error:", error);
            console.error("Error response:", error.response?.data);

            if (error.response?.data?.error) {
                toast.error(`Failed: ${error.response.data.error}`);
            } else {
                toast.error(error.response?.data?.message || "Failed to test template");
            }
        }
    };

    const handleEdit = (template) => {
        setEditingId(template._id);
        setFormData({
            title: template.title || "",
            description: template.description || "",
            category: template.category || "business",
            duration: template.duration || "",
            credits: template.credits || 1,
            isPopular: template.isPopular || false,
            promptText: template.promptText || "",
            contentType: template.contentType || "textToVideo",
            isActive: template.isActive !== undefined ? template.isActive : true,
            isPublic: template.isPublic || false,
            isTested: template.isTested || false,
            qualityScore: template.qualityScore || 0,
            tags: template.tags || []
        });
        setShowCreateModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (!formData.title || !formData.description || !formData.promptText || !formData.contentType) {
                toast.error("Please fill in all required fields");
                return;
            }

            if (formData.promptText.length < 20) {
                toast.error("Prompt text must be at least 20 characters to properly affect AI generation");
                return;
            }

            if (editingId) {
                const response = await api.patch(`${API.TEMPLATES}/${editingId}`, formData);
                if (response.data.success) {
                    setTemplates(templates.map(t => t._id === editingId ? response.data.data : t));
                    toast.success("Template updated successfully");
                    setShowCreateModal(false);
                    resetForm();
                }
            } else {
                const response = await api.post(API.TEMPLATES, formData);
                if (response.data.success) {
                    setTemplates([response.data.data, ...templates]);
                    toast.success("Template created successfully");
                    setShowCreateModal(false);
                    resetForm();
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(error.response?.data?.message || "Failed to save template");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            title: "",
            description: "",
            category: "business",
            duration: "",
            credits: 1,
            isPopular: false,
            promptText: "",
            contentType: "textToVideo",
            isActive: true,
            isPublic: false,
            isTested: false,
            qualityScore: 0,
            tags: []
        });
        setCurrentTag("");
    };

    const addTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, currentTag.trim()]
            });
            setCurrentTag("");
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const copyPrompt = (prompt) => {
        navigator.clipboard.writeText(prompt);
        toast.success("Prompt copied to clipboard");
    };

    const getStatusColor = (template) => {
        if (!template.isActive) return "red";
        if (!template.isPublic) return "blue";
        if (!template.isTested) return "yellow";
        return "green";
    };

    const getStatusText = (template) => {
        if (!template.isActive) return "Disabled";
        if (!template.isPublic) return "Hidden";
        if (!template.isTested) return "Untested";
        return "Active";
    };

    return (
        <div className="p-8 space-y-8 min-h-screen">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Sparkles className="text-purple-400" size={32} />
                        AI Template Management
                    </h1>
                    <p className="text-gray-400 mt-1">Create and manage AI-powered content templates</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCreateModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                    <Plus size={20} />
                    Create Template
                </motion.button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search templates by title, description, or prompt..."
                            onChange={(e) => debouncedSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>
                </div>

                <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500"
                >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-gray-900 capitalize">{cat}</option>
                    ))}
                </select>

                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500"
                >
                    {statuses.map(status => (
                        <option key={status.id} value={status.id} className="bg-gray-900">
                            {status.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total Templates</p>
                            <p className="text-2xl font-bold text-white">{pagination.total}</p>
                        </div>
                        <Layout className="text-purple-400" size={24} />
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Active & Public</p>
                            <p className="text-2xl font-bold text-white">
                                {templates.filter(t => t.isActive && t.isPublic).length}
                            </p>
                        </div>
                        <Globe className="text-green-400" size={24} />
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total Uses</p>
                            <p className="text-2xl font-bold text-white">
                                {templates.reduce((sum, t) => sum + t.uses, 0)}
                            </p>
                        </div>
                        <BarChart className="text-blue-400" size={24} />
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Untested</p>
                            <p className="text-2xl font-bold text-white">
                                {templates.filter(t => !t.isTested).length}
                            </p>
                        </div>
                        <TestTube className="text-yellow-400" size={24} />
                    </div>
                </div>
            </div>

            {/* Templates Table */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading templates...</p>
                </div>
            ) : (
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left p-4 text-gray-400 font-medium">Template</th>
                                    <th className="text-left p-4 text-gray-400 font-medium">Type</th>
                                    <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                                    <th className="text-left p-4 text-gray-400 font-medium">Uses</th>
                                    <th className="text-left p-4 text-gray-400 font-medium">Quality</th>
                                    <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {templates.map((template) => {
                                    const TypeIcon = contentTypes.find(t => t.id === template.contentType)?.icon || Film;
                                    const statusColor = getStatusColor(template);
                                    const statusText = getStatusText(template);

                                    return (
                                        <tr key={template._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                            <td className="p-4">
                                                <div>
                                                    <h3 className="text-white font-medium">{template.title}</h3>
                                                    <p className="text-gray-400 text-sm line-clamp-1">{template.description}</p>
                                                    <div className="flex gap-2 mt-1">
                                                        <span className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-300 capitalize">
                                                            {template.category}
                                                        </span>
                                                        {template.isPopular && (
                                                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-xs">
                                                                Popular
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <TypeIcon size={16} className="text-purple-400" />
                                                    <span className="text-gray-300 capitalize">
                                                        {template.contentType.replace(/([A-Z])/g, ' $1')}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${bgColorMap[statusColor]}`} />
                                                    <span className={`${statusColorMap[statusColor]} font-medium`}>
                                                        {statusText}
                                                    </span>
                                                </div>
                                                {template.duration && (
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        <Clock size={12} className="inline mr-1" />
                                                        {template.duration}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="text-white font-medium">{template.uses}</div>
                                                <div className="text-xs text-gray-500">{template.credits} credits</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                                                            style={{ width: `${template.qualityScore * 10}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-white">{template.qualityScore}/10</span>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {template.isTested ? 'Tested' : 'Not tested'}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(template)}
                                                        className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Plus className="rotate-45" size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => copyPrompt(template.promptText)}
                                                        className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                                        title="Copy Prompt"
                                                    >
                                                        <Copy size={16} />
                                                    </button>
                                                    {!template.isTested && (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedTemplate(template);
                                                                setShowTestModal(true);
                                                            }}
                                                            className="p-2 bg-yellow-500/20 rounded-lg hover:bg-yellow-500/30 text-yellow-400 transition-colors"
                                                            title="Test Template"
                                                        >
                                                            <TestTube size={16} />
                                                        </button>
                                                    )}
                                                    {template.isActive ? (
                                                        <button
                                                            onClick={() => handleStatusToggle(template, 'deactivate')}
                                                            className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 text-red-400 transition-colors"
                                                            title="Disable"
                                                        >
                                                            <Lock size={16} />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleStatusToggle(template, 'activate')}
                                                            className="p-2 bg-green-500/20 rounded-lg hover:bg-green-500/30 text-green-400 transition-colors"
                                                            title="Enable"
                                                        >
                                                            <CheckCircle size={16} />
                                                        </button>
                                                    )}
                                                    {template.isPublic ? (
                                                        <button
                                                            onClick={() => handleStatusToggle(template, 'hide')}
                                                            className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 text-blue-400 transition-colors"
                                                            title="Hide from Discover"
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                    ) : (
                                                        template.isTested && (
                                                            <button
                                                                onClick={() => handleStatusToggle(template, 'publish')}
                                                                className="p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 text-purple-400 transition-colors"
                                                                title="Publish to Discover"
                                                            >
                                                                <Globe size={16} />
                                                            </button>
                                                        )
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(template._id)}
                                                        className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 text-red-400 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination.pages > 1 && (
                        <div className="flex items-center justify-between p-4 border-t border-white/10">
                            <div className="text-gray-400 text-sm">
                                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} templates
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                                    disabled={pagination.page === 1}
                                    className="px-3 py-1 bg-white/5 rounded-lg text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                                    const pageNum = i + 1;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setPagination({ ...pagination, page: pageNum })}
                                            className={`px-3 py-1 rounded-lg ${pagination.page === pageNum ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                                    disabled={pagination.page === pagination.pages}
                                    className="px-3 py-1 bg-white/5 rounded-lg text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Test Modal */}
            <AnimatePresence>
                {showTestModal && selectedTemplate && (
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
                            className="bg-[#0f0f12] border border-white/10 rounded-2xl p-6 w-full max-w-md"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Test Template</h2>
                                <button
                                    onClick={() => setShowTestModal(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-white font-medium mb-2">{selectedTemplate.title}</h3>
                                    <p className="text-gray-400 text-sm">{selectedTemplate.description}</p>
                                </div>

                                {/* In the Test Modal */}
                                <div className="bg-white/5 rounded-xl p-4">
                                    <label className="text-sm text-gray-400 mb-2 block">Quality Score (0-10)</label>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
                                            <motion.button
                                                key={score}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleTestTemplate(selectedTemplate, score)}
                                                className={`px-3 py-2 rounded-lg font-medium transition-colors
                    ${score <= 3 ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400' :
                                                        score <= 6 ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400' :
                                                            'bg-green-500/20 hover:bg-green-500/30 text-green-400'}`}
                                            >
                                                {score}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-sm text-gray-500 space-y-2">
                                    <p>• 1-3: Poor quality, needs revision</p>
                                    <p>• 4-6: Acceptable, could be improved</p>
                                    <p>• 7-8: Good quality template</p>
                                    <p>• 9-10: Excellent, ready for production</p>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                    <button
                                        onClick={() => setShowTestModal(false)}
                                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleTestTemplate(selectedTemplate, 5)}
                                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                                    >
                                        Mark as Tested
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-[#0f0f12] border border-white/10 rounded-2xl w-full max-w-4xl my-8 max-h-[90vh] flex flex-col"
                        >
                            {/* Fixed Header */}
                            <div className="flex-shrink-0 p-6 border-b border-white/10 bg-[#0f0f12] sticky top-0 z-10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{editingId ? 'Edit Template' : 'Create AI Template'}</h2>
                                        <p className="text-gray-400 text-sm mt-1">Templates directly control AI generation output</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowCreateModal(false);
                                            resetForm();
                                        }}
                                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto">
                                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                    {/* Basic Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm text-white font-medium">Template Name *</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500"
                                                placeholder="e.g. Modern Business Intro"
                                                maxLength={100}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm text-white font-medium">Category</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500"
                                            >
                                                {categories.map(c => (
                                                    <option key={c} value={c} className="bg-gray-900 capitalize">
                                                        {c.charAt(0).toUpperCase() + c.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-white font-medium">Description *</label>
                                        <textarea
                                            required
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 h-24 resize-none"
                                            placeholder="Describe the template's purpose and use cases..."
                                            maxLength={500}
                                        />
                                    </div>

                                    {/* Content Type */}
                                    <div className="space-y-4">
                                        <label className="text-sm text-white font-medium">Content Type *</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {contentTypes.map((type) => {
                                                const Icon = type.icon;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={type.id}
                                                        onClick={() => setFormData({ ...formData, contentType: type.id })}
                                                        className={`p-4 rounded-xl border-2 transition-all ${formData.contentType === type.id
                                                            ? 'border-purple-500 bg-purple-500/10'
                                                            : 'border-white/10 bg-white/5 hover:border-white/20'
                                                            }`}
                                                    >
                                                        <Icon size={20} className={`mx-auto mb-2 ${formData.contentType === type.id ? 'text-purple-400' : 'text-gray-400'}`} />
                                                        <div className="text-sm font-medium text-white">{type.label}</div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* AI Prompt Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm text-white font-medium flex items-center gap-2">
                                                <Zap className="text-yellow-400" size={16} />
                                                AI Prompt Text *
                                                <span className="text-xs bg-yellow-500/20 px-2 py-1 rounded text-yellow-300">
                                                    Controls AI Generation
                                                </span>
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, promptText: promptExamples[Math.floor(Math.random() * promptExamples.length)] })}
                                                className="text-xs text-purple-400 hover:text-purple-300"
                                            >
                                                Try example
                                            </button>
                                        </div>

                                        <textarea
                                            required
                                            value={formData.promptText}
                                            onChange={(e) => setFormData({ ...formData, promptText: e.target.value })}
                                            className="w-full p-4 bg-black/50 border border-purple-500/30 rounded-xl text-white outline-none focus:border-purple-500 h-48 resize-none font-mono text-sm"
                                            placeholder="Describe exactly what the AI should generate. Be specific about style, mood, colors, transitions, etc."
                                        />

                                        <div className="bg-black/30 rounded-lg p-4">
                                            <h4 className="text-sm font-medium text-white mb-2">Prompt Guidelines:</h4>
                                            <ul className="text-xs text-gray-400 space-y-1">
                                                <li>✅ Use descriptive adjectives: cinematic, professional, vibrant, dynamic</li>
                                                <li>✅ Specify style: animation, realistic, 3D render, hand-drawn</li>
                                                <li>✅ Include technical details: lighting, camera angles, transitions</li>
                                                <li>✅ Set mood/tone: professional, casual, dramatic, upbeat</li>
                                                <li>✅ Mention duration/format: 30-second video, square image, vertical reel</li>
                                                <li>❌ Avoid generic terms: "nice video", "good image", "make it cool"</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Additional Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm text-white font-medium">Duration</label>
                                            <input
                                                type="text"
                                                value={formData.duration}
                                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500"
                                                placeholder="MM:SS e.g. 0:30"
                                                pattern="^([0-5]?[0-9]):([0-5][0-9])$"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm text-white font-medium">Credits Cost</label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={formData.credits}
                                                onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 0 })}
                                                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm text-white font-medium">Tags</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={currentTag}
                                                    onChange={(e) => setCurrentTag(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                                    className="flex-1 p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500"
                                                    placeholder="Add tag and press Enter"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={addTag}
                                                    className="px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.tags.map(tag => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm flex items-center gap-1"
                                                    >
                                                        {tag}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTag(tag)}
                                                            className="hover:text-purple-100"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Template Controls */}
                                    <div className="border-t border-white/10 pt-6">
                                        <h3 className="text-sm text-white font-medium mb-4">Template Controls</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className={`p-4 rounded-xl border-2 ${formData.isPopular ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 bg-white/5'}`}>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-white font-medium">Popular</div>
                                                        <div className="text-xs text-gray-400">Show in featured section</div>
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        id="isPopular"
                                                        checked={formData.isPopular}
                                                        onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                                                        className="w-5 h-5 rounded border-gray-600 bg-white/5 text-yellow-500 focus:ring-yellow-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className={`p-4 rounded-xl border-2 ${formData.isActive ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-white font-medium">Active</div>
                                                        <div className="text-xs text-gray-400">Enable/disable template</div>
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        id="isActive"
                                                        checked={formData.isActive}
                                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                                        className="w-5 h-5 rounded border-gray-600 bg-white/5 text-green-500 focus:ring-green-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className={`p-4 rounded-xl border-2 ${formData.isPublic ? 'border-blue-500 bg-blue-500/10' : 'border-gray-500 bg-gray-500/10'}`}>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-white font-medium">Public</div>
                                                        <div className="text-xs text-gray-400">Visible in Discover</div>
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        id="isPublic"
                                                        checked={formData.isPublic}
                                                        onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                                                        className="w-5 h-5 rounded border-gray-600 bg-white/5 text-blue-500 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex justify-between items-center pt-6 border-t border-white/10 sticky bottom-0 bg-[#0f0f12] pb-2">
                                        <div className="text-sm text-gray-400">
                                            {editingId ? 'Editing existing template' : 'Creating new AI template'}
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowCreateModal(false);
                                                    resetForm();
                                                }}
                                                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="px-8 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        {editingId ? 'Updating...' : 'Creating...'}
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle size={16} />
                                                        {editingId ? 'Update Template' : 'Create Template'}
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 