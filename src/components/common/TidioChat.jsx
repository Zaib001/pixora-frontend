import { useEffect, useState, useCallback } from 'react';
import { getPublicConfig } from '../../services/modelService';

const TidioChat = () => {
    // Default config provided by user
    const DEFAULT_ID = "hq4xyf3vsguzrmfqwys6kodan18zxbdk";

    const getStoredConfig = useCallback(() => {
        const storedEnabled = localStorage.getItem('pixora_tidio_enabled');
        const storedId = localStorage.getItem('pixora_tidio_script_id');

        return {
            // Default to true if not set, otherwise parse string
            enabled: storedEnabled === null ? true : storedEnabled === 'true',
            // Default to provided ID if not set
            scriptId: storedId || DEFAULT_ID
        };
    }, [DEFAULT_ID]);

    const [config, setConfig] = useState(getStoredConfig());
    const [isLoading, setIsLoading] = useState(true);

    const fetchGlobalConfig = useCallback(async () => {
        try {
            const response = await getPublicConfig();
            if (response.success && response.data.integrations) {
                const { tidioEnabled, tidioScriptId } = response.data.integrations;

                // Keep localStorage in sync for fast initial load next time
                localStorage.setItem('pixora_tidio_enabled', tidioEnabled);
                localStorage.setItem('pixora_tidio_script_id', tidioScriptId || DEFAULT_ID);

                console.log(`[TidioChat] Global sync: ${tidioEnabled ? 'ENABLED' : 'DISABLED'}`);

                setConfig({
                    enabled: tidioEnabled,
                    scriptId: tidioScriptId || DEFAULT_ID
                });
            }
        } catch (error) {
            console.error("[TidioChat] Failed to fetch global config", error);
        } finally {
            setIsLoading(false);
        }
    }, [DEFAULT_ID]);

    useEffect(() => {
        fetchGlobalConfig();

        const handleUpdate = () => {
            setConfig(getStoredConfig());
        };

        window.addEventListener('storage', handleUpdate);
        window.addEventListener('tidio_config_updated', handleUpdate);

        // Periodically sync with server every 5 minutes to catch admin changes
        const interval = setInterval(fetchGlobalConfig, 300000);

        return () => {
            window.removeEventListener('storage', handleUpdate);
            window.removeEventListener('tidio_config_updated', handleUpdate);
            clearInterval(interval);
        };
    }, [fetchGlobalConfig, getStoredConfig]);

    useEffect(() => {
        if (isLoading) return;

        const scriptId = 'tidio-chat-script';

        // Handle hiding/removing the widget if disabled
        if (!config.enabled) {
            // CSS Fallback to hide potential containers
            const styleId = 'tidio-hide-style';
            if (!document.getElementById(styleId)) {
                const style = document.createElement('style');
                style.id = styleId;
                style.innerHTML = '#tidio-chat, #tidio-chat-iframe, .tidio-chat-widget { display: none !important; }';
                document.head.appendChild(style);
            }

            if (window.tidioChatApi) {
                try {
                    window.tidioChatApi.hide();
                    window.tidioChatApi.close();
                } catch (e) { }
            }
            return;
        }

        // Handle showing if enabled
        const styleId = 'tidio-hide-style';
        const existingStyle = document.getElementById(styleId);
        if (existingStyle) existingStyle.remove();

        if (window.tidioChatApi) {
            try {
                window.tidioChatApi.show();
            } catch (e) { }
        }

        if (!config.scriptId) return;

        // Prevent loading if the ID is definitely the placeholder (legacy cleanup)
        if (config.scriptId.includes('placeholder_key_here')) {
            console.warn("Tidio: Ignoring placeholder ID");
            return;
        }

        // Tidio Script
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            const src = config.scriptId.includes('http')
                ? config.scriptId
                : `//code.tidio.co/${config.scriptId}.js`;

            script.src = src;
            script.async = true;
            document.body.appendChild(script);
        }

    }, [config.enabled, config.scriptId, isLoading]);

    return null;
};

export default TidioChat;
