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
import api, { serverURL } from '../../api/axios';

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
        category: "video", // image or video
        subcategory: "other", // business, social, etc.
        generatorType: "text-to-video",
        modelId: "",
        promptText: "",
        promptEditable: true,
        previewFile: null,
        previewUrl: "", // For showing current preview when editing
        parameters: {},
        inputRequirements: {
            requiresImage: false,
            requiresVideo: false,
            maxUploads: 1
        },
        duration: "",
        credits: 1,
        isPopular: false,
        isActive: true,
        isPublic: false,
        isTested: false,
        qualityScore: 0,
        tags: []
    });
    const [models, setModels] = useState([]);
    const [modelsLoading, setModelsLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState(null);
    const [currentTag, setCurrentTag] = useState("");
    const [editingId, setEditingId] = useState(null);

    const templateCategories = [
        { id: 'video', label: 'Video Template', icon: Film },
        { id: 'image', label: 'Image Template', icon: Layout }
    ];
    const categories = ['video', 'image'];
    const contentTypes = [
        { id: 'textToVideo', label: 'Text → Video', icon: Film },
        { id: 'imageToVideo', label: 'Image → Video', icon: Film },
        { id: 'textToImage', label: 'Text → Image', icon: Layout },
        { id: 'imageToImage', label: 'Image → Image', icon: Layout }
    ];

    const subcategories = ['business', 'social', 'education', 'entertainment', 'personal', 'design', 'other'];

    const generatorTypes = [
        { id: 'text-to-video', label: 'Text → Video', category: 'video' },
        { id: 'image-to-video', label: 'Image → Video', category: 'video' },
        { id: 'text-to-image', label: 'Text → Image', category: 'image' },
        { id: 'image-to-image', label: 'Image → Image', category: 'image' }
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

    useEffect(() => {
        fetchActiveModels();
    }, [formData.category]);

    const fetchActiveModels = async () => {
        try {
            setModelsLoading(true);
            const response = await api.get(`/models/active?type=${formData.category}`);
            if (response.data.success) {
                setModels(response.data.data);

                // If editing and we have a modelId, find and set selected model
                if (formData.modelId) {
                    const model = response.data.data.find(m => m.modelId === formData.modelId);
                    setSelectedModel(model);
                }
            }
        } catch (error) {
            console.error("Failed to fetch models:", error);
            toast.error("Failed to load models for this category");
        } finally {
            setModelsLoading(false);
        }
    };

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
        const model = models.find(m => m.modelId === template.modelId);
        setSelectedModel(model);

        setFormData({
            title: template.title || "",
            description: template.description || "",
            category: template.category || "video",
            subcategory: template.subcategory || "other",
            generatorType: template.generatorType || template.contentType || "text-to-video",
            modelId: template.modelId || "",
            promptText: template.promptText || "",
            promptEditable: template.promptEditable !== undefined ? template.promptEditable : true,
            previewFile: null,
            previewUrl: template.previewUrl || "",
            parameters: template.parameters || {},
            inputRequirements: template.inputRequirements || {
                requiresImage: false,
                requiresVideo: false,
                maxUploads: 1
            },
            duration: template.duration || "",
            credits: template.credits || 1,
            isPopular: template.isPopular || false,
            isActive: template.isActive !== undefined ? template.isActive : true,
            isPublic: template.isPublic !== undefined ? template.isPublic : false,
            isTested: template.isTested || false,
            qualityScore: template.qualityScore || 0,
            tags: template.tags || []
        });
        setShowCreateModal(true);
    };

    const handleParameterChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            parameters: {
                ...prev.parameters,
                [key]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        console.log("[AdminTemplates] Submitting form...", { editingId, formData });

        // Immediate UI feedback
        const loadingToast = toast.loading(editingId ? "Updating template..." : "Creating template...");
        setIsSubmitting(true);

        try {
            // Validation
            const requiredFields = [
                { key: 'title', label: 'Template Name' },
                { key: 'description', label: 'Description' },
                { key: 'promptText', label: 'Prompt Text' },
                { key: 'generatorType', label: 'Generator Type' },
                { key: 'category', label: 'Category' },
                { key: 'modelId', label: 'AI Model' }
            ];

            const missingFields = requiredFields.filter(f => !formData[f.key]);
            if (missingFields.length > 0) {
                const errorMsg = `Missing fields: ${missingFields.map(f => f.label).join(", ")}`;
                console.warn("[AdminTemplates] Validation failed:", errorMsg);
                toast.error(errorMsg, { id: loadingToast });
                setIsSubmitting(false);
                return;
            }

            if (!editingId && !formData.previewFile) {
                toast.error("Please upload an animated preview file (MP4/WebM/GIF)", { id: loadingToast });
                setIsSubmitting(false);
                return;
            }

            if (formData.promptText.length < 20) {
                toast.error("Prompt text is too short (min 20 chars)", { id: loadingToast });
                setIsSubmitting(false);
                return;
            }

            // Create FormData for multipart upload
            const submitData = new FormData();

            // Append basic fields
            Object.keys(formData).forEach(key => {
                if (key === 'previewFile') {
                    if (formData[key]) submitData.append(key, formData[key]);
                } else if (key === 'parameters' || key === 'inputRequirements' || key === 'tags') {
                    submitData.append(key, JSON.stringify(formData[key]));
                } else if (formData[key] !== null && formData[key] !== undefined) {
                    submitData.append(key, formData[key]);
                }
            });

            console.log("[AdminTemplates] Sending request to backend...");

            if (editingId) {
                const response = await api.patch(`${API.TEMPLATES}/${editingId}`, submitData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (response.data.success) {
                    setTemplates(templates.map(t => t._id === editingId ? response.data.data : t));
                    toast.success("Template updated successfully", { id: loadingToast });
                    setShowCreateModal(false);
                    resetForm();
                } else {
                    toast.error(response.data.message || "Failed to update template", { id: loadingToast });
                }
            } else {
                const response = await api.post(API.TEMPLATES, submitData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (response.data.success) {
                    setTemplates([response.data.data, ...templates]);
                    toast.success("Template created successfully", { id: loadingToast });
                    setShowCreateModal(false);
                    resetForm();
                } else {
                    toast.error(response.data.message || "Failed to create template", { id: loadingToast });
                }
            }
        } catch (error) {
            console.error("[AdminTemplates] Submission error:", error);
            const errorMessage = typeof error === 'string' ? error : (error.response?.data?.message || "Failed to save template");
            toast.error(errorMessage, { id: loadingToast });
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setSelectedModel(null);
        setFormData({
            title: "",
            description: "",
            category: "video",
            subcategory: "other",
            generatorType: "text-to-video",
            modelId: "",
            promptText: "",
            promptEditable: true,
            previewFile: null,
            previewUrl: "",
            parameters: {},
            inputRequirements: {
                requiresImage: false,
                requiresVideo: false,
                maxUploads: 1
            },
            duration: "",
            credits: 1,
            isPopular: false,
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Sparkles className="text-purple-400" size={32} />
                        AI Template Management
                    </h1>
                    <p className="text-gray-400 mt-1">Create and manage AI-powered content templates</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                        resetForm();
                        setShowCreateModal(true);
                    }}
                    className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
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

            {
                loading ? (
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
                                        const genType = template.generatorType || template.contentType;
                                        const TypeIcon = (generatorTypes.find(g => g.id === genType) ||
                                            contentTypes.find(c => c.id === genType))?.icon || Film;

                                        const statusColor = getStatusColor(template);
                                        const statusText = getStatusText(template);

                                        return (
                                            <tr key={template._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-4">
                                                        {/* Animated Preview Thumbnail */}
                                                        <div className="w-16 h-16 rounded-lg bg-black border border-white/10 overflow-hidden flex-shrink-0 relative group/preview">
                                                            {template.previewUrl ? (
                                                                <>
                                                                    {template.previewType === 'video' ? (
                                                                        <video
                                                                            src={template.previewUrl.startsWith('http') ? template.previewUrl : `${serverURL}${template.previewUrl}`}
                                                                            autoPlay
                                                                            loop
                                                                            muted
                                                                            className="w-full h-full object-cover"
                                                                            onMouseOver={(e) => e.target.play()}
                                                                            onMouseOut={(e) => e.target.pause()}
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={template.previewUrl.startsWith('http') ? template.previewUrl : `${serverURL}${template.previewUrl}`}
                                                                            alt={template.title}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-700">
                                                                    <Film size={24} />
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <h3 className="text-white font-medium truncate">{template.title}</h3>
                                                            <p className="text-gray-400 text-xs line-clamp-1">{template.description}</p>
                                                            <div className="flex gap-2 mt-1">
                                                                <span className="px-1.5 py-0.5 bg-white/5 rounded text-[10px] text-gray-400 uppercase tracking-wider">
                                                                    {template.category}
                                                                </span>
                                                                <span className="px-1.5 py-0.5 bg-purple-500/10 rounded text-[10px] text-purple-400 uppercase tracking-wider">
                                                                    {template.subcategory}
                                                                </span>
                                                                {template.isPopular && (
                                                                    <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-[10px]">
                                                                        POPULAR
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <TypeIcon size={14} className="text-purple-400" />
                                                            <span className="text-white text-sm font-medium">
                                                                {(template.generatorType || template.contentType).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                            </span>
                                                        </div>
                                                        <div className="text-[10px] text-gray-500 font-mono">
                                                            {template.modelId}
                                                        </div>
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
                                                            className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 text-red-500 transition-all hover:scale-110"
                                                            title="Delete Template"
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
                )
            }

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
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm text-white font-medium flex items-center gap-2">
                                                    <Layout size={14} className="text-purple-400" />
                                                    Template Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-all"
                                                    placeholder="e.g. Modern Business Intro"
                                                    maxLength={100}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm text-white font-medium flex items-center gap-2">
                                                    <Filter size={14} className="text-purple-400" />
                                                    Subcategory
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.subcategory}
                                                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                                                        className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 appearance-none pr-10"
                                                    >
                                                        {subcategories.map(s => (
                                                            <option key={s} value={s} className="bg-[#0f0f12] capitalize">
                                                                {s.charAt(0).toUpperCase() + s.slice(1)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                        <Filter size={14} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm text-white font-medium flex items-center gap-2">
                                                <Eye size={14} className="text-purple-400" />
                                                Description (User-facing) *
                                            </label>
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 min-h-[80px] h-20 resize-none transition-all"
                                                placeholder="Explain what this template does for your users..."
                                                maxLength={250}
                                            />
                                            <div className="text-[10px] text-gray-500 text-right">{formData.description?.length}/250</div>
                                        </div>
                                    </div>

                                    {/* Template Category Selectors */}
                                    <div className="space-y-4">
                                        <label className="text-sm text-white font-medium block">Select Engine Type *</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {templateCategories.map((cat) => {
                                                const Icon = cat.icon;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={cat.id}
                                                        onClick={() => setFormData({ ...formData, category: cat.id, modelId: "", parameters: {} })}
                                                        className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden group ${formData.category === cat.id
                                                            ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10'
                                                            : 'border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/5'
                                                            }`}
                                                    >
                                                        {formData.category === cat.id && (
                                                            <div className="absolute top-2 right-2">
                                                                <CheckCircle size={16} className="text-purple-400" />
                                                            </div>
                                                        )}
                                                        <div className={`p-3 rounded-xl transition-colors ${formData.category === cat.id ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-gray-400 group-hover:text-gray-300'}`}>
                                                            <Icon size={24} />
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-white font-bold">{cat.label}</div>
                                                            <div className="text-[10px] text-gray-500 mt-0.5">Base generation engine</div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Generator Mapping & Model Selection */}
                                    <div className="p-6 bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/20 rounded-2xl space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-white flex items-center gap-2">
                                                    <Zap size={14} className="text-yellow-400" />
                                                    Generator Type
                                                </label>
                                                <p className="text-[10px] text-gray-400 mb-2">Maps to the frontend generation page</p>
                                                <select
                                                    value={formData.generatorType}
                                                    onChange={(e) => setFormData({ ...formData, generatorType: e.target.value })}
                                                    className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-all font-medium appearance-none"
                                                >
                                                    {generatorTypes.filter(g => g.category === formData.category).map(g => (
                                                        <option key={g.id} value={g.id} className="bg-[#0f0f12]">
                                                            {g.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-white flex items-center gap-2">
                                                    <Lock size={14} className="text-purple-400" />
                                                    Backend AI Model
                                                </label>
                                                <p className="text-[10px] text-gray-400 mb-2">Choose the specific model to use</p>
                                                <div className="relative">
                                                    {modelsLoading ? (
                                                        <div className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-gray-500 italic flex items-center gap-2">
                                                            <div className="w-3 h-3 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                                            Loading {formData.category} models...
                                                        </div>
                                                    ) : (
                                                        <select
                                                            value={formData.modelId}
                                                            onChange={(e) => {
                                                                const model = models.find(m => m.modelId === e.target.value);
                                                                setSelectedModel(model);
                                                                setFormData({ ...formData, modelId: e.target.value, parameters: {} });
                                                            }}
                                                            className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 font-bold appearance-none shadow-inner"
                                                        >
                                                            <option value="" className="bg-[#0f0f12]">--- Select Global Model ---</option>
                                                            {models.map(m => (
                                                                <option key={m.modelId} value={m.modelId} className="bg-[#0f0f12]">
                                                                    {m.name} ({m.provider})
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Animated Preview Upload */}
                                    <div className="space-y-4">
                                        <label className="text-sm text-white font-medium block">Animated Preview Upload *</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div
                                                onClick={() => document.getElementById('preview-upload').click()}
                                                className={`relative h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all gap-2 group
                                                    ${formData.previewFile ? 'border-purple-500/50 bg-purple-500/5' : 'border-white/10 hover:border-white/20 hover:bg-white/5'}`}
                                            >
                                                <input
                                                    id="preview-upload"
                                                    type="file"
                                                    onChange={(e) => setFormData({ ...formData, previewFile: e.target.files[0] })}
                                                    className="hidden"
                                                    accept=".mp4,.webm,.gif"
                                                />
                                                {formData.previewFile ? (
                                                    <div className="text-center p-4">
                                                        <CheckCircle className="text-purple-400 mx-auto mb-2" size={32} />
                                                        <p className="text-white font-medium text-sm truncate max-w-[200px]">
                                                            {formData.previewFile.name}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">Click to replace</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Upload className="text-gray-400 group-hover:text-purple-400 group-hover:-translate-y-1 transition-all" size={32} />
                                                        <div className="text-center">
                                                            <p className="text-white font-medium">Upload Preview File</p>
                                                            <p className="text-xs text-gray-500 mt-1">MP4, WebM, or GIF (Max 15MB)</p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            <div className="h-48 rounded-2xl bg-black border border-white/10 flex items-center justify-center overflow-hidden relative">
                                                {formData.previewFile ? (
                                                    <video
                                                        src={URL.createObjectURL(formData.previewFile)}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : formData.previewUrl ? (
                                                    <video
                                                        src={formData.previewUrl.startsWith('http') ? formData.previewUrl : `${serverURL}${formData.previewUrl}`}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="text-center p-6">
                                                        <Film size={32} className="text-gray-800 mx-auto mb-2" />
                                                        <p className="text-xs text-gray-600">Sample preview will appear here</p>
                                                    </div>
                                                )}
                                                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] text-white">Preview</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Prompt Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm text-white font-medium flex items-center gap-2">
                                                <Zap className="text-yellow-400" size={16} />
                                                Template Prompt Text *
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, promptText: promptExamples[Math.floor(Math.random() * promptExamples.length)] })}
                                                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                                                >
                                                    Try example
                                                </button>
                                                <label className="flex items-center gap-2 cursor-pointer group">
                                                    <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Editable by User</span>
                                                    <div className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={formData.promptEditable}
                                                            onChange={(e) => setFormData({ ...formData, promptEditable: e.target.checked })}
                                                        />
                                                        <div className="w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-600"></div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <textarea
                                            value={formData.promptText}
                                            onChange={(e) => setFormData({ ...formData, promptText: e.target.value })}
                                            className="w-full p-4 bg-black/50 border border-purple-500/30 rounded-xl text-white outline-none focus:border-purple-500 h-32 resize-none font-mono text-sm leading-relaxed"
                                            placeholder="Describe exactly what the AI should generate. Be specific about style, mood, colors..."
                                        />
                                    </div>

                                    {/* Technical Model Parameters (New) */}
                                    {selectedModel && selectedModel.parameters && selectedModel.parameters.length > 0 && (
                                        <div className="space-y-4 p-6 bg-white/2 border border-white/5 rounded-2xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Zap className="text-purple-400" size={16} />
                                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Model Preset Parameters</h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                                {selectedModel.parameters.map((param) => (
                                                    <div key={param.key} className="space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <label className="text-xs font-medium text-gray-400">{param.label}</label>
                                                            {param.type === 'slider' && (
                                                                <span className="text-xs text-purple-400 font-mono">
                                                                    {formData.parameters[param.key] ?? param.defaultValue}
                                                                    {param.unit}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {param.type === 'number' || param.type === 'slider' ? (
                                                            <input
                                                                type={param.type === 'slider' ? 'range' : 'number'}
                                                                min={param.min}
                                                                max={param.max}
                                                                step={param.step || 1}
                                                                value={formData.parameters[param.key] ?? param.defaultValue}
                                                                onChange={(e) => handleParameterChange(param.key, Number(e.target.value))}
                                                                className={`w-full ${param.type === 'slider' ? 'accent-purple-500' : 'p-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none'}`}
                                                            />
                                                        ) : param.type === 'select' ? (
                                                            <select
                                                                value={formData.parameters[param.key] ?? param.defaultValue}
                                                                onChange={(e) => handleParameterChange(param.key, e.target.value)}
                                                                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500"
                                                            >
                                                                {param.options.map(opt => (
                                                                    <option key={opt} value={opt} className="bg-[#0f0f12]">{opt}</option>
                                                                ))}
                                                            </select>
                                                        ) : (
                                                            <input
                                                                type="text"
                                                                value={formData.parameters[param.key] ?? param.defaultValue}
                                                                onChange={(e) => handleParameterChange(param.key, e.target.value)}
                                                                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500"
                                                            />
                                                        )}
                                                        {param.description && <p className="text-[10px] text-gray-500 italic">{param.description}</p>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Input Requirements (New) */}
                                    <div className="space-y-4 p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Upload className="text-blue-400" size={16} />
                                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Generator Input Requirements</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                                                <span className="text-sm text-gray-300">Requires Image</span>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.inputRequirements.requiresImage}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        inputRequirements: { ...formData.inputRequirements, requiresImage: e.target.checked }
                                                    })}
                                                    className="w-4 h-4 accent-blue-500"
                                                />
                                            </label>
                                            <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                                                <span className="text-sm text-gray-300">Requires Video</span>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.inputRequirements.requiresVideo}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        inputRequirements: { ...formData.inputRequirements, requiresVideo: e.target.checked }
                                                    })}
                                                    className="w-4 h-4 accent-blue-500"
                                                />
                                            </label>
                                            <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                                                <label className="text-xs text-gray-400 block">Max Upload Count</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="10"
                                                    value={formData.inputRequirements.maxUploads}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        inputRequirements: { ...formData.inputRequirements, maxUploads: parseInt(e.target.value) || 1 }
                                                    })}
                                                    className="w-full bg-transparent text-white outline-none font-medium"
                                                />
                                            </div>
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
                                    <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10 sticky bottom-0 bg-[#0f0f12] pb-4 px-6 -mx-6">
                                        <div className="text-sm text-gray-400">
                                            {editingId ? 'Editing existing template' : 'Creating new AI template'}
                                        </div>
                                        <div className="flex gap-3 w-full sm:w-auto">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowCreateModal(false);
                                                    resetForm();
                                                }}
                                                className="flex-1 sm:flex-none px-6 py-3 text-gray-400 hover:text-white transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <motion.button
                                                type="submit"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                disabled={isSubmitting}
                                                className="flex-1 sm:flex-none px-10 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        {editingId ? 'Updating...' : 'Creating...'}
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle size={18} />
                                                        {editingId ? 'Update Template' : 'Create Template'}
                                                    </>
                                                )}
                                            </motion.button>
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