import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutGrid,
    Zap,
    Library,
    Video,
    Play,
    ImageIcon,
    Wand2,
    Sparkles,
    LayoutTemplate,
    Infinity,
    ShieldCheck,
    Users,
    Settings,
    CreditCard,
    TrendingUp,
    MessageSquare,
    HelpCircle,
    Boxes,
    Home,
    FileText,
    Database,
    Bell,
    Globe,
    CheckCircle
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Sidebar() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

    // Admin Navigation - Only Admin Panel
    const adminNavigation = [
        {
            section: "sidebar.admin.portal",
            items: [
                { label: "sidebar.admin.dashboard", to: "/dashboard/admin", icon: ShieldCheck },
                { label: "sidebar.admin.users", to: "/dashboard/admin/users", icon: Users },
                { label: "sidebar.admin.templates", to: "/dashboard/admin/templates", icon: LayoutTemplate },
                { label: "sidebar.admin.payments", to: "/dashboard/admin/payments", icon: CreditCard },
                { label: "sidebar.admin.analytics", to: "/dashboard/admin/analytics", icon: TrendingUp },
                { label: "sidebar.admin.models", to: "/dashboard/admin/models", icon: Boxes },
                { label: "sidebar.admin.community", to: "/dashboard/admin/community", icon: MessageSquare },
                { label: "sidebar.admin.help", to: "/dashboard/admin/help", icon: HelpCircle },
            ],
        }
    ];

    // User Navigation - Full Features
    const userNavigation = [
        {
            section: "Main",
            items: [
                { label: "sidebar.overview", to: "/dashboard", icon: LayoutGrid },
                { label: "sidebar.templates", to: "/dashboard/templates", icon: LayoutTemplate },
                { label: "sidebar.library", to: "/dashboard/library", icon: Library },
            ],
        },
        {
            section: "sidebar.generators_video",
            items: [
                { label: "sidebar.textToVideo", to: "/generate/text-to-video", icon: Video },
                { label: "sidebar.imageToVideo", to: "/generate/image-to-video", icon: Play },
            ],
        },
        {
            section: "sidebar.generators_image",
            items: [
                { label: "sidebar.textToImage", to: "/generate/text-to-image", icon: ImageIcon },
                { label: "sidebar.imageToImage", to: "/generate/image-to-image", icon: Wand2 },
            ],
        },
        // {
        //     section: "Tools",
        //     items: [
        //         { label: "Help & Support", to: "/dashboard/help", icon: HelpCircle },
        //     ],
        // }
    ];

    const navigationItems = isAdmin ? adminNavigation : userNavigation;

    return (
        <aside className={`w-64 bg-[#0A0A0A] border-e border-white/5 flex flex-col h-screen sticky top-0 overflow-hidden ${isAdmin ? 'admin-sidebar' : 'user-sidebar'}`}>
            {/* Brand Logo */}
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${isAdmin ? 'bg-gradient-to-br from-purple-500 to-purple-600' : 'bg-gradient-to-br from-purple-500 to-indigo-600'}`}>
                        {isAdmin ? (
                            <ShieldCheck size={20} className="text-white" />
                        ) : (
                            <Sparkles size={20} className="text-white" />
                        )}
                    </div>
                    <div>
                        <span className="text-xl font-bold text-white tracking-tight block">
                            {isAdmin ? t("sidebar.admin.portal") : 'Pixora'}
                        </span>
                        {isAdmin && (
                            <span className="text-xs text-gray-400 font-medium mt-1">
                                {user?.role === 'superadmin' ? t("sidebar.admin.superAdmin") : t("sidebar.admin.administrator")}
                            </span>
                        )}
                    </div>
                </div>
            </div>



            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-4 space-y-8 no-scrollbar pb-8">
                {navigationItems.map((section, idx) => (
                    <div key={idx} className="space-y-2">
                        {section.section !== "Main" && (
                            <h3 className="px-4 text-[10px] uppercase tracking-widest font-black text-gray-500 mb-4">
                                {isAdmin ? section.section : t(section.section)}
                            </h3>
                        )}
                        <div className="space-y-1">
                            {section.items.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 group ${isActive
                                            ? isAdmin
                                                ? "bg-purple-500/10 text-gray-500 border border-purple-500/20"
                                                : "bg-white/5 text-white shadow-xl border border-white/10"
                                            : "text-gray-500 hover:text-white hover:bg-white/[0.02]"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <div
                                                className={`p-2 rounded-lg transition-all duration-300 ${isActive
                                                    ? isAdmin
                                                        ? "bg-purple-500 text-white shadow-lg shadow-blue-500/50 scale-110"
                                                        : "bg-purple-500 text-white shadow-lg shadow-purple-500/50 scale-110"
                                                    : "bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300"
                                                    }`}
                                            >
                                                <item.icon size={18} />
                                            </div>
                                            <span>{isAdmin ? t(item.label) : t(item.label)}</span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="sidebar-active"
                                                    className={`ms-auto w-1.5 h-1.5 rounded-full ${isAdmin ? 'bg-blue-500' : 'bg-purple-500'} shadow-[0_0_10px_rgba(168,85,247,0.5)]`}
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Upgrade Button (Only for Users) */}
            {!isAdmin && (
                <div className="p-4 mt-auto border-t border-white/5">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/dashboard/billing")}
                        className="w-full relative group overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-[1px] rounded-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <div className="bg-[#121212]/90 backdrop-blur-xl rounded-[15px] p-5 flex flex-col items-start text-start gap-4 relative overflow-hidden">
                            {/* Background Animated Infinity */}
                            <div className="absolute -top-4 -end-4 opacity-10 pointer-events-none">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    <Infinity size={120} className="text-white" />
                                </motion.div>
                            </div>

                            <div className="relative">
                                <h4 className="text-white font-black text-lg mb-1">
                                    {t("sidebar.unlockPremium")}
                                </h4>
                                <p className="text-gray-400 text-xs">
                                    {t("sidebar.unlockPremiumDesc")}
                                </p>
                            </div>

                            <div className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-xs font-black text-white shadow-lg shadow-purple-500/20 text-center flex items-center justify-center gap-2">
                                <Zap className="w-4 h-4 text-white" />
                                {t("sidebar.upgradeNow", { defaultValue: "Upgrade Now" })}
                            </div>
                        </div>
                    </motion.button>
                </div>
            )}

            {/* Admin Footer Info */}
            {isAdmin && (
                <div className="p-4 mt-auto border-t border-white/5">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-400">{t("sidebar.status.title")}:</span>
                            <span className="flex items-center gap-1 text-xs text-green-400">
                                <CheckCircle size={12} />
                                {t("sidebar.status.operational")}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500">
                            Admin Portal v2.0 • {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            )}
        </aside>
    );
}