import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Save,
    Cpu,
    RefreshCw,
    CheckCircle,
    AlertTriangle,
    ToggleLeft,
    ToggleRight
} from "lucide-react";
import { toast } from "react-hot-toast";
import { getAllModels, toggleModelStatus, saveAPIKeys, getAPIKeys, testModel } from "../../services/modelService";

export default function AdminModelManagement() {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [models, setModels] = useState([]);

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

    useEffect(() => {
        loadModels();
        loadAPIConfig();

        // Load Tidio settings from localStorage (kept for backwards compatibility)
        const savedTidioEnabled = localStorage.getItem('pixora_tidio_enabled');
        const savedTidioId = localStorage.getItem('pixora_tidio_script_id');
        const DEFAULT_ID = "hq4xyf3vsguzrmfqwys6kodan18zxbdk";

        setApiConfig(prev => ({
            ...prev,
            tidioEnabled: savedTidioEnabled === null ? true : savedTidioEnabled === 'true',
            tidioScriptId: savedTidioId || DEFAULT_ID
        }));
    }, []);

    const loadModels = async () => {
        setLoading(true);
        try {
            const response = await getAllModels();
            if (response.success) {
                setModels(response.data.models);
            }
        } catch (error) {
            console.error("Failed to load models:", error);
            toast.error("Failed to load models");
        } finally {
            setLoading(false);
        }
    };

    const loadAPIConfig = async () => {
        try {
            const response = await getAPIKeys();
            if (response.success) {
                setMaskedKeys(response.data.maskedKeys || {});
                // Merge with existing config without overwriting user input
                if (response.data.rateLimits) {
                    setApiConfig(prev => ({ ...prev, ...response.data.rateLimits }));
                }
            }
        } catch (error) {
            console.error("Failed to load API config:", error);
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
            if (apiConfig.competapi) apiKeysToSave.competapi = apiConfig.competapi;
            if (apiConfig.openai) apiKeysToSave.openai = apiConfig.openai;
            if (apiConfig.deepseek) apiKeysToSave.deepseek = apiConfig.deepseek;

            await saveAPIKeys({
                ...apiKeysToSave,
                rateLimits: {
                    maxConcurrentGenerations: apiConfig.maxConcurrentGenerations,
                },
                timeouts: {
                    requestTimeout: apiConfig.requestTimeout * 1000, // Convert to ms
                },
            });

            // Persist Tidio Settings to localStorage
            localStorage.setItem('pixora_tidio_enabled', apiConfig.tidioEnabled);
            localStorage.setItem('pixora_tidio_script_id', apiConfig.tidioScriptId);

            // Dispatch events for immediate update
            window.dispatchEvent(new Event('storage'));
            window.dispatchEvent(new Event('tidio_config_updated'));

            // Reload to get masked keys
            await loadAPIConfig();

            toast.success("Configuration saved successfully");
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
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-cyan-500 rounded-full" />
                        Active Models
                    </h2>
                    <div className="space-y-4">
                        {models.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">
                                No models found. Run the seed script to add initial models.
                            </div>
                        ) : (
                            models.map((model) => (
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
                                        <p className="text-xs text-gray-600 mt-1">{model.description}</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-gray-300 text-sm">
                                                {model.type === 'video'
                                                    ? `${model.pricing?.costPerSecond || 0}cr/s`
                                                    : `${model.pricing?.costPerImage || 0}cr/img`}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleToggleModel(model._id)}
                                            className={`p-2 rounded-lg transition-colors ${model.status === 'active'
                                                ? 'text-green-400 hover:bg-green-500/10'
                                                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                                }`}
                                        >
                                            {model.status === 'active' ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                                        </button>
                                    </div>
                                </div>
                            ))
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
                                        onClick={() => setApiConfig({ ...apiConfig, tidioEnabled: !apiConfig.tidioEnabled })}
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
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <h3 className="text-lg font-bold text-white mb-4">Localization</h3>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Default Language</label>
                                <select className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500">
                                    <option value="en">English (US)</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                </select>
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
            </div>
        </div>
    );
}
