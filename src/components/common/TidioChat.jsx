import { useEffect, useState } from 'react';

const TidioChat = () => {
    // Default config provided by user
    const DEFAULT_ID = "hq4xyf3vsguzrmfqwys6kodan18zxbdk";

    const getStoredConfig = () => {
        const storedEnabled = localStorage.getItem('pixora_tidio_enabled');
        const storedId = localStorage.getItem('pixora_tidio_script_id');

        return {
            // Default to true if not set, otherwise parse string
            enabled: storedEnabled === null ? true : storedEnabled === 'true',
            // Default to provided ID if not set
            scriptId: storedId || DEFAULT_ID
        };
    };

    const [config, setConfig] = useState(getStoredConfig());

    // Listen for storage changes to update instantly
    useEffect(() => {
        const handleStorageChange = () => {
            setConfig(getStoredConfig());
        };

        window.addEventListener('storage', handleStorageChange);
        // Custom event for same-window updates
        window.addEventListener('tidio_config_updated', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('tidio_config_updated', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        if (!config.enabled || !config.scriptId) return;

        // Prevent loading if the ID is definitely the placeholder (legacy cleanup)
        if (config.scriptId.includes('placeholder_key_here')) {
            console.warn("Tidio: Ignoring placeholder ID");
            return;
        }


        // Tidio Script
        const script = document.createElement('script');
        // Handle both full URL and just ID
        const src = config.scriptId.includes('http')
            ? config.scriptId
            : `//code.tidio.co/${config.scriptId}.js`;

        script.src = src;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [config.enabled, config.scriptId]);

    return null;
};

export default TidioChat;
