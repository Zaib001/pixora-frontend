import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: "en", label: "English", flag: "🇺🇸" },
        { code: "es", label: "Español", flag: "🇪🇸" },
        { code: "fr", label: "Français", flag: "🇫🇷" },
        { code: "ar", label: "العربية", flag: "🇸🇦" }
    ];

    const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
                <Globe size={18} />
                <span className="text-sm font-medium uppercase">{currentLang.code}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-0 mb-2 w-32 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-white/5 transition-colors ${i18n.language === lang.code ? "text-purple-400 bg-white/5" : "text-gray-300"
                                    }`}
                            >
                                <span>{lang.flag}</span>
                                <span>{lang.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
