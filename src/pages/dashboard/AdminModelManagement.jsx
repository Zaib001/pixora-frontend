import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Save,
    Cpu,
    RefreshCw,
    CheckCircle,
    AlertTriangle,
    ToggleLeft,
    ToggleRight,
    Plus,
    X,
    Trash2,
    Edit
} from "lucide-react";
import { toast } from "react-hot-toast";
import { getAllModels, toggleModelStatus, saveAPIKeys, getAPIKeys, testModel, createModel, updateModel } from "../../services/modelService";

export default function AdminModelManagement() {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [models, setModels] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('all'); // 'all', 'image', 'video'
    const [showModelModal, setShowModelModal] = useState(false);
    const [editingModel, setEditingModel] = useState(null);
    const [modelForm, setModelForm] = useState({
        modelId: '',
        name: '',
        provider: 'competapi',
        type: 'image',
        description: '',
        pricing: { costPerSecond: 0, costPerImage: 0 },
        parameters: [],
        supportedContexts: []
    });

    const [apiConfig, setApiConfig] = useState({
        competapi: '',
        openai: '',
        deepseek: '',
        maxConcurrentGenerations: 10,
        requestTimeout: 300,
        tidioEnabled: false,
        tidioScriptId: ''
    });

    const [maskedKeys, setMaskedKeys] = useState({});

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalModels, setTotalModels] = useState(0);

    useEffect(() => {
        loadModels(1, true);
    }, [categoryFilter]);

    useEffect(() => {
        // Initial Load is handled by the categoryFilter effect since it initializes as 'all'
    }, []);

    const loadModels = async (pageNum = 1, reset = false) => {
        setLoading(true);
        try {
            const params = {
                page: pageNum,
                limit: 20,
                sortBy: 'createdAt',
                sortOrder: 'desc'
            };

            if (categoryFilter !== 'all') {
                params.type = categoryFilter;
            }

            const response = await getAllModels(params);
            if (response.success) {
                if (reset) {
                    setModels(response.data.models);
                } else {
                    setModels(prev => [...prev, ...response.data.models]);
                }

                setTotalModels(response.data.total);
                setHasMore(response.data.currentPage < response.data.totalPages);
                setPage(pageNum);
            }
        } catch (error) {
            console.error("Failed to load models:", error);
            toast.error("Failed to load models");
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            loadModels(page + 1, false);
        }
    };

    const loadAPIConfig = async () => {
        try {
            const response = await getAPIKeys();
            if (response.success) {
                setMaskedKeys(response.data.maskedKeys || {});

                // Merge all config from server
                setApiConfig(prev => ({
                    ...prev,
                    ...(response.data.rateLimits || {}),
                    ...(response.data.integrations || {}),
                    ...(response.data.features || {}),
                    // Ensure timeouts are converted back to seconds for UI
                    requestTimeout: response.data.timeouts?.requestTimeout ? response.data.timeouts.requestTimeout / 1000 : prev.requestTimeout
                }));

                // Update localStorage to keep it in sync for Tidio fallback
                if (response.data.integrations) {
                    const { tidioEnabled, tidioScriptId } = response.data.integrations;
                    localStorage.setItem('pixora_tidio_enabled', tidioEnabled);
                    localStorage.setItem('pixora_tidio_script_id', tidioScriptId);
                    window.dispatchEvent(new Event('tidio_config_updated'));
                }
            }
        } catch (error) {
            console.error("Failed to load API config:", error);
        }
    };

    const handleOpenModal = (model = null) => {
        if (model) {
            setEditingModel(model);
            setModelForm({
                modelId: model.modelId,
                name: model.name,
                provider: model.provider,
                type: model.type,
                description: model.description || '',
                pricing: model.pricing || { costPerSecond: 0, costPerImage: 0 },
                parameters: model.parameters || [],
                supportedContexts: model.supportedContexts || []
            });
        } else {
            setEditingModel(null);
            setModelForm({
                modelId: '',
                name: '',
                provider: 'competapi',
                type: 'image',
                description: '',
                pricing: { costPerSecond: 0, costPerImage: 0 },
                parameters: [],
                supportedContexts: []
            });
        }
        setShowModelModal(true);
    };

    const handleFormChange = (field, value) => {
        setModelForm(prev => ({ ...prev, [field]: value }));
    };

    const handlePricingChange = (field, value) => {
        setModelForm(prev => ({
            ...prev,
            pricing: { ...prev.pricing, [field]: parseFloat(value) || 0 }
        }));
    };

    const handleAddParameter = () => {
        setModelForm(prev => ({
            ...prev,
            parameters: [
                ...prev.parameters,
                {
                    key: '',
                    label: '',
                    type: 'string',
                    defaultValue: '',
                    required: false,
                    options: [], // For select
                    min: 0,
                    max: 100,
                    step: 1
                }
            ]
        }));
    };

    const handleUpdateParameter = (index, field, value) => {
        const newParams = [...modelForm.parameters];
        newParams[index] = { ...newParams[index], [field]: value };
        setModelForm(prev => ({ ...prev, parameters: newParams }));
    };

    const handleRemoveParameter = (index) => {
        setModelForm(prev => ({
            ...prev,
            parameters: prev.parameters.filter((_, i) => i !== index)
        }));
    };

    const handleToggleContext = (context) => {
        setModelForm(prev => ({
            ...prev,
            supportedContexts: prev.supportedContexts.includes(context)
                ? prev.supportedContexts.filter(c => c !== context)
                : [...prev.supportedContexts, context]
        }));
    };

    const handleSaveModel = async () => {
        if (!modelForm.modelId || !modelForm.name) {
            toast.error("Model ID and Name are required");
            return;
        }

        setSaving(true);
        try {
            if (editingModel) {
                await updateModel(editingModel._id, modelForm);
                toast.success("Model updated successfully");
            } else {
                await createModel(modelForm);
                toast.success("Model created successfully");
            }
            setShowModelModal(false);
            loadModels();
        } catch (error) {
            console.error("Failed to save model:", error);
            toast.error(error.message || "Failed to save model");
        } finally {
            setSaving(false);
        }
    };

    const handleToggleModel = async (id) => {
        try {
            const model = models.find(m => m._id === id);
            const newStatus = model.status === 'active' ? 'inactive' : 'active';

            await toggleModelStatus(id, newStatus);

            setModels(models.map(m => {
                if (m._id === id) {
                    return { ...m, status: newStatus };
                }
                return m;
            }));

            toast.success(`Model ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
        } catch (error) {
            console.error("Failed to toggle model:", error);
            toast.error("Failed to update model status");
        }
    };

    const handleSaveConfig = async () => {
        setSaving(true);
        try {
            // Save API keys to backend
            const apiKeysToSave = {};
            if (apiConfig.competapi && !apiConfig.competapi.startsWith('****')) apiKeysToSave.competapi = apiConfig.competapi;
            if (apiConfig.openai && !apiConfig.openai.startsWith('****')) apiKeysToSave.openai = apiConfig.openai;
            if (apiConfig.deepseek && !apiConfig.deepseek.startsWith('****')) apiKeysToSave.deepseek = apiConfig.deepseek;

            await saveAPIKeys({
                ...apiKeysToSave,
                rateLimits: {
                    maxConcurrentGenerations: apiConfig.maxConcurrentGenerations,
                },
                timeouts: {
                    requestTimeout: apiConfig.requestTimeout * 1000, // Convert to ms
                },
                integrations: {
                    tidioEnabled: apiConfig.tidioEnabled,
                    tidioScriptId: apiConfig.tidioScriptId
                },
                features: {
                    enableAIIdeas: apiConfig.enableAIIdeas ?? true,
                    enableAsyncGeneration: apiConfig.enableAsyncGeneration ?? true
                }
            });

            // Fallback: Persist Tidio Settings to localStorage for immediate local feedback
            localStorage.setItem('pixora_tidio_enabled', apiConfig.tidioEnabled);
            localStorage.setItem('pixora_tidio_script_id', apiConfig.tidioScriptId);

            // Dispatch events for immediate update
            window.dispatchEvent(new Event('storage'));
            window.dispatchEvent(new Event('tidio_config_updated'));

            // Reload to get masked keys and updated config
            await loadAPIConfig();

            toast.success("Configuration saved globally");
        } catch (error) {
            console.error("Save config error:", error);
            toast.error("Failed to save configuration");
        } finally {
            setSaving(false);
        }
    };

    const handleTestConnection = async () => {
        try {
            const response = await testModel("competapi");
            if (response.connected) {
                toast.success("Successfully connected to CompetAPI!");
            } else {
                toast.error("Failed to connect to CompetAPI");
            }
        } catch (error) {
            console.error("Test connection error:", error);
            toast.error("Connection test failed");
        }
    };

    return (
        <div className="p-8 space-y-8 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Cpu className="text-cyan-400" size={32} />
                        Model Management
                    </h1>
                    <p className="text-gray-400 mt-1">Configure AI models and API settings</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveConfig}
                    disabled={saving}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50"
                >
                    {saving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
                    Save Changes
                </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Model List */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-8 bg-cyan-500 rounded-full" />
                                Models
                            </h2>
                            <div className="flex p-1 bg-white/5 rounded-lg border border-white/5">
                                <button
                                    onClick={() => setCategoryFilter('all')}
                                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${categoryFilter === 'all' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setCategoryFilter('image')}
                                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${categoryFilter === 'image' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    Image
                                </button>
                                <button
                                    onClick={() => setCategoryFilter('video')}
                                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${categoryFilter === 'video' ? 'bg-blue-500/20 text-blue-300' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    Video
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white hover:shadow-lg transition-all"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {models.length === 0 && !loading ? (
                            <div className="text-center text-gray-500 py-8">
                                No models found.
                            </div>
                        ) : (
                            <>
                                {models.map((model) => (
                                    <div key={model._id || model.modelId} className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center justify-between group hover:border-white/10 transition-all">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-white font-medium">{model.name}</h3>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${model.type === 'video' ? 'bg-purple-500/20 text-purple-400' : 'bg-pink-500/20 text-pink-400'
                                                    }`}>
                                                    {model.type}
                                                </span>
                                                {model.isPopular && (
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider bg-yellow-500/20 text-yellow-400">
                                                        POPULAR
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 font-mono">{model.modelId}</p>
                                            <p className="text-xs text-gray-600 mt-1 line-clamp-1">{model.description}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="text-right mr-2">
                                                <p className="text-gray-300 text-xs">
                                                    {model.type === 'video'
                                                        ? `${model.pricing?.costPerSecond || 0}cr/s`
                                                        : `${model.pricing?.costPerImage || 0}cr/img`}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleOpenModal(model)}
                                                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleToggleModel(model._id)}
                                                className={`p-2 rounded-lg transition-colors ${model.status === 'active'
                                                    ? 'text-green-400 hover:bg-green-500/10'
                                                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                                    }`}
                                            >
                                                {model.status === 'active' ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {hasMore && (
                                    <div className="pt-4 flex justify-center">
                                        <button
                                            onClick={handleLoadMore}
                                            disabled={loading}
                                            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 disabled:opacity-50"
                                        >
                                            {loading ? <RefreshCw className="animate-spin" size={16} /> : <Plus size={16} />}
                                            Load More
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* API Settings */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-500 rounded-full" />
                        API Configuration
                    </h2>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">CompetAPI Key (Video & Image Generation)</label>
                            <input
                                type="password"
                                value={apiConfig.competapi || ''}
                                onChange={(e) => setApiConfig({ ...apiConfig, competapi: e.target.value })}
                                placeholder="sk-****"
                                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm outline-none focus:border-cyan-500 transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">OpenAI API Key (AI Ideas)</label>
                            <input
                                type="password"
                                value={apiConfig.openai || ''}
                                onChange={(e) => setApiConfig({ ...apiConfig, openai: e.target.value })}
                                placeholder="sk-****"
                                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm outline-none focus:border-cyan-500 transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">DeepSeek API Key (Optional)</label>
                            <input
                                type="password"
                                value={apiConfig.deepseek || ''}
                                onChange={(e) => setApiConfig({ ...apiConfig, deepseek: e.target.value })}
                                placeholder="sk-****"
                                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm outline-none focus:border-cyan-500 transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Max Concurrent</label>
                                <input
                                    type="number"
                                    value={apiConfig.maxConcurrentGenerations}
                                    onChange={(e) => setApiConfig({ ...apiConfig, maxConcurrentGenerations: parseInt(e.target.value) })}
                                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Timeout (sec)</label>
                                <input
                                    type="number"
                                    value={apiConfig.requestTimeout}
                                    onChange={(e) => setApiConfig({ ...apiConfig, requestTimeout: parseInt(e.target.value) })}
                                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <h3 className="text-lg font-bold text-white mb-4">Integrations</h3>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Tidio Configuration</label>
                                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl">
                                    <span className="text-white">Enable Chatbot Support</span>
                                    <button
                                        onClick={() => {
                                            const newEnabled = !apiConfig.tidioEnabled;
                                            setApiConfig({ ...apiConfig, tidioEnabled: newEnabled });

                                            // Immediate persistence and event dispatch
                                            localStorage.setItem('pixora_tidio_enabled', newEnabled);
                                            window.dispatchEvent(new Event('storage'));
                                            window.dispatchEvent(new Event('tidio_config_updated'));

                                            toast.success(`Chatbot ${newEnabled ? 'enabled' : 'disabled'}`, {
                                                id: 'tidio-toggle'
                                            });
                                        }}
                                        className={`transition-colors ${apiConfig.tidioEnabled ? 'text-green-400' : 'text-gray-500'}`}
                                    >
                                        {apiConfig.tidioEnabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    value={apiConfig.tidioScriptId}
                                    onChange={(e) => setApiConfig({ ...apiConfig, tidioScriptId: e.target.value })}
                                    placeholder="Tidio Script URL / ID (e.g. 4jo...)"
                                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm outline-none focus:border-cyan-500 transition-colors mt-2"
                                />
                                <p className="text-[10px] text-yellow-500/70 mt-1 italic">
                                    * Note: Click "Save Changes" at the top of the page to apply these settings globally to all users.
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <div className="flex items-start gap-3 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                <AlertTriangle className="text-yellow-400 shrink-0" size={20} />
                                <p className="text-sm text-yellow-200/80">
                                    Changes to API keys will take effect immediately for new requests.
                                    Ensure keys are valid to prevent service interruption.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Add/Edit Model Modal */}
                <AnimatePresence>
                    {showModelModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
                            >
                                {/* Modal Header */}
                                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        {editingModel ? <Edit size={20} className="text-blue-400" /> : <Plus size={20} className="text-green-400" />}
                                        {editingModel ? 'Edit Model' : 'Add New Model'}
                                    </h2>
                                    <button
                                        onClick={() => setShowModelModal(false)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                    {/* Basic Info */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider">Basic Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-400">Model Name</label>
                                                <input
                                                    type="text"
                                                    value={modelForm.name}
                                                    onChange={(e) => handleFormChange('name', e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-cyan-500 transition-all"
                                                    placeholder="e.g. Stable Diffusion XL"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-400">Model ID (Unique)</label>
                                                <input
                                                    type="text"
                                                    value={modelForm.modelId}
                                                    onChange={(e) => handleFormChange('modelId', e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-cyan-500 transition-all font-mono"
                                                    placeholder="e.g. stability-ai/sdxl"
                                                    disabled={!!editingModel}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-400">Provider</label>
                                                <select
                                                    value={modelForm.provider}
                                                    onChange={(e) => handleFormChange('provider', e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-cyan-500 transition-all"
                                                >
                                                    <option value="competapi">CompetAPI</option>
                                                    <option value="openai">OpenAI</option>
                                                    <option value="custom">Custom</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-400">Type</label>
                                                <select
                                                    value={modelForm.type}
                                                    onChange={(e) => handleFormChange('type', e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-cyan-500 transition-all"
                                                >
                                                    <option value="image">Image</option>
                                                    <option value="video">Video</option>
                                                </select>
                                            </div>
                                            <div className="col-span-1 md:col-span-2 space-y-2">
                                                <label className="text-xs text-gray-400">Description</label>
                                                <textarea
                                                    value={modelForm.description}
                                                    onChange={(e) => handleFormChange('description', e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-cyan-500 transition-all min-h-[80px]"
                                                    placeholder="Brief description of the model..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Supported Contexts */}
                                    <div className="space-y-4 pt-4 border-t border-white/10">
                                        <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider">Supported Contexts</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {['text-to-video', 'image-to-video', 'text-to-image', 'image-to-image', 'video-to-video'].map(context => (
                                                <button
                                                    key={context}
                                                    type="button"
                                                    onClick={() => handleToggleContext(context)}
                                                    className={`p-3 rounded-xl border-2 transition-all text-xs font-bold uppercase tracking-tight ${modelForm.supportedContexts.includes(context)
                                                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                                                            : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                                                        }`}
                                                >
                                                    {context}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-500 italic">
                                            Select which generator types this model supports. This determines where it appears in the frontend.
                                        </p>
                                    </div>

                                    {/* Pricing */}
                                    <div className="space-y-4 pt-4 border-t border-white/10">
                                        <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider">Pricing Configuration</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-400">Cost Per Image (Credits)</label>
                                                <input
                                                    type="number"
                                                    value={modelForm.pricing.costPerImage}
                                                    onChange={(e) => handlePricingChange('costPerImage', e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-cyan-500 transition-all"
                                                    min="0"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-400">Cost Per Second (Video Credits)</label>
                                                <input
                                                    type="number"
                                                    value={modelForm.pricing.costPerSecond}
                                                    onChange={(e) => handlePricingChange('costPerSecond', e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-cyan-500 transition-all"
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dynamic Parameters */}
                                    <div className="space-y-4 pt-4 border-t border-white/10">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider">Generative Parameters</h3>
                                            <button
                                                onClick={handleAddParameter}
                                                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-white transition-all flex items-center gap-2"
                                            >
                                                <Plus size={14} /> Add Parameter
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {modelForm.parameters.length === 0 ? (
                                                <div className="text-center p-8 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                                                    <p className="text-sm text-gray-500">No custom parameters defined.</p>
                                                    <p className="text-xs text-gray-600 mt-1">Add parameters like "Guidance Scale", "Steps", or "Negative Prompt" to expose them in the generator UI.</p>
                                                </div>
                                            ) : (
                                                modelForm.parameters.map((param, idx) => (
                                                    <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-3 group hover:border-white/10 transition-all relative">
                                                        <button
                                                            onClick={() => handleRemoveParameter(idx)}
                                                            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>

                                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] text-gray-500 uppercase font-bold">Key (API)</label>
                                                                <input
                                                                    type="text"
                                                                    value={param.key}
                                                                    onChange={(e) => handleUpdateParameter(idx, 'key', e.target.value)}
                                                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white outline-none focus:border-cyan-500/50"
                                                                    placeholder="e.g. guidance_scale"
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] text-gray-500 uppercase font-bold">Label (UI)</label>
                                                                <input
                                                                    type="text"
                                                                    value={param.label}
                                                                    onChange={(e) => handleUpdateParameter(idx, 'label', e.target.value)}
                                                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white outline-none focus:border-cyan-500/50"
                                                                    placeholder="e.g. Guidance Scale"
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] text-gray-500 uppercase font-bold">Type</label>
                                                                <select
                                                                    value={param.type}
                                                                    onChange={(e) => handleUpdateParameter(idx, 'type', e.target.value)}
                                                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white outline-none focus:border-cyan-500/50"
                                                                >
                                                                    <option value="string">String</option>
                                                                    <option value="number">Number</option>
                                                                    <option value="boolean">Boolean</option>
                                                                    <option value="select">Select (Dropdown)</option>
                                                                    <option value="slider">Slider</option>
                                                                </select>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] text-gray-500 uppercase font-bold">Default Value</label>
                                                                <input
                                                                    type="text"
                                                                    value={param.defaultValue}
                                                                    onChange={(e) => handleUpdateParameter(idx, 'defaultValue', e.target.value)}
                                                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white outline-none focus:border-cyan-500/50"
                                                                    placeholder="e.g. 7.5"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="p-6 border-t border-white/10 bg-white/5 flex items-center justify-end gap-3">
                                    <button
                                        onClick={() => setShowModelModal(false)}
                                        className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveModel}
                                        disabled={saving}
                                        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50"
                                    >
                                        {saving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
                                        {editingModel ? 'Update Model' : 'Create Model'}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div >
        </div >
    );
}
