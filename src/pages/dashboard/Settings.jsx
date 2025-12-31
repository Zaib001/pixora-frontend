import { motion } from "framer-motion";
import { ArrowLeft, Save, Bell, Shield, CreditCard, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      projectUpdates: true,
      creditAlerts: true
    },
    privacy: {
      profileVisibility: 'public',
      dataCollection: true,
      analytics: true
    },
    appearance: {
      theme: 'dark',
      language: i18n.language || 'en',
      fontSize: 'medium'
    }
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));

    if (category === 'appearance' && key === 'language') {
      i18n.changeLanguage(value);
    }
  };

  const SettingSection = ({ title, icon: Icon, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/10 rounded-lg">
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </motion.button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">{t("settings.title")}</h1>
          <p className="text-gray-300">{t("settings.subtitle")}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {t("settings.save")}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Notifications */}
        <SettingSection title={t("settings.sections.notifications")} icon={Bell}>
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium capitalize">
                    {t(`settings.notifications.${key}`)}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {t(`settings.notifications.${key}Desc`)}
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('notifications', key, !value)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${value ? 'bg-purple-600' : 'bg-white/20'
                    }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform absolute top-1 left-1 ${value ? 'translate-x-6' : 'translate-x-0'
                      }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </SettingSection>

        {/* Privacy & Security */}
        <SettingSection title={t("settings.sections.privacy")} icon={Shield}>
          <div className="space-y-4">
            <div>
              <label className="text-white font-medium block mb-2">{t("settings.privacy.profileVisibility")}</label>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="public" className="bg-gray-900">Public</option>
                <option value="private" className="bg-gray-900">Private</option>
                <option value="friends" className="bg-gray-900">Friends Only</option>
              </select>
            </div>
            {Object.entries(settings.privacy).slice(1).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium capitalize">
                    {t(`settings.privacy.${key}`)}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {t(`settings.privacy.${key}Desc`)}
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('privacy', key, !value)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${value ? 'bg-purple-600' : 'bg-white/20'
                    }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform absolute top-1 left-1 ${value ? 'translate-x-6' : 'translate-x-0'
                      }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </SettingSection>

        {/* Appearance */}
        <SettingSection title={t("settings.sections.appearance")} icon={Moon}>
          <div className="space-y-4">
            <div>
              <label className="text-white font-medium block mb-2">{t("settings.appearance.theme")}</label>
              <select
                value={settings.appearance.theme}
                onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="dark" className="bg-gray-900">{t("settings.appearance.options.dark")}</option>
                <option value="light" className="bg-gray-900">{t("settings.appearance.options.light")}</option>
                <option value="system" className="bg-gray-900">{t("settings.appearance.options.system")}</option>
              </select>
            </div>
            <div>
              <label className="text-white font-medium block mb-2">{t("settings.appearance.language")}</label>
              <select
                value={settings.appearance.language}
                onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="en" className="bg-gray-900">English</option>
                <option value="es" className="bg-gray-900">Español</option>
                <option value="fr" className="bg-gray-900">Français</option>
              </select>
            </div>
          </div>
        </SettingSection>

        {/* Billing */}
        <SettingSection title={t("settings.sections.billing")} icon={CreditCard}>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-white font-medium">Current Plan: Pro</p>
              <p className="text-gray-400 text-sm">$29.99/month - 500 credits</p>
              <button className="mt-2 text-purple-400 hover:text-purple-300 text-sm">
                Change Plan
              </button>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-white font-medium">Payment Method</p>
              <p className="text-gray-400 text-sm">Visa ending in 4242</p>
              <button className="mt-2 text-purple-400 hover:text-purple-300 text-sm">
                Update Payment
              </button>
            </div>
            <button className="w-full py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white font-medium">
              Billing History
            </button>
          </div>
        </SettingSection>
      </div>
    </div>
  );
}
