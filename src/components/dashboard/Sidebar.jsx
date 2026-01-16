import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    Infinity as InfinityIcon,
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
    CheckCircle,
    ChevronLeft,
    Menu,
    X
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Sidebar({ isCollapsed, toggleCollapse, isMobileOpen, closeMobile }) {
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

    // Animation Config
    const sidebarVariants = {
        expanded: { width: 256, x: 0 },
        collapsed: { width: 80, x: 0 },
        mobileHidden: { x: -256, width: 256 },
        mobileOpen: { x: 0, width: 256 }
    };

    const getActiveVariant = () => {
        if (window.innerWidth < 768) {
            return isMobileOpen ? "mobileOpen" : "mobileHidden";
        }
        return isCollapsed ? "collapsed" : "expanded";
    };

    return (
        <>
            <motion.aside
                initial={false}
                animate={getActiveVariant()}
                variants={sidebarVariants}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className={`
                    fixed top-0 left-0 z-[70] h-screen bg-[#0A0A0A] border-e border-white/5 flex flex-col overflow-hidden 
                    md:sticky
                    ${isAdmin ? 'admin-sidebar' : 'user-sidebar'}
                `}
            >
                {/* Brand Logo */}
                <div className="p-6 md:p-8 flex items-center justify-between overflow-hidden flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${isAdmin ? 'bg-gradient-to-br from-purple-500 to-purple-600' : 'bg-gradient-to-br from-purple-500 to-indigo-600'}`}>
                            {isAdmin ? <ShieldCheck size={20} className="text-white" /> : <Sparkles size={20} className="text-white" />}
                        </div>
                        <AnimatePresence>
                            {!isCollapsed && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10, width: 0 }}
                                    animate={{ opacity: 1, x: 0, width: 'auto' }}
                                    exit={{ opacity: 0, x: -10, width: 0 }}
                                    className="overflow-hidden whitespace-nowrap"
                                >
                                    <span className="text-xl font-black text-white tracking-tighter block uppercase">
                                        {isAdmin ? t("sidebar.admin.portal") : 'Pixora'}
                                    </span>
                                    {isAdmin && (
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">
                                            {user?.role === 'superadmin' ? t("sidebar.admin.superAdmin") : t("sidebar.admin.administrator")}
                                        </span>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Close Button */}
                    <button
                        onClick={closeMobile}
                        className="md:hidden p-2 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all ml-auto"
                    >
                        <X size={20} />
                    </button>

                    {/* Desktop Collapse Toggle */}
                    <button
                        onClick={toggleCollapse}
                        className="hidden md:flex p-2 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all ml-auto"
                    >
                        <motion.div
                            animate={{ rotate: isCollapsed ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronLeft size={20} />
                        </motion.div>
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-4 space-y-8 no-scrollbar pb-8">
                    {navigationItems.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                            <AnimatePresence mode="wait">
                                {!isCollapsed && section.section !== "Main" && (
                                    <motion.h3
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="px-4 text-[10px] uppercase tracking-[0.2em] font-black text-gray-600 mb-4 whitespace-nowrap overflow-hidden"
                                    >
                                        {isAdmin ? section.section : t(section.section)}
                                    </motion.h3>
                                )}
                            </AnimatePresence>
                            {isCollapsed && section.section !== "Main" && (
                                <div className="h-px bg-white/5 mx-2 my-6" />
                            )}
                            <div className="space-y-1">
                                {section.items.map((item) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        onClick={() => window.innerWidth < 768 && closeMobile()}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-bold transition-all duration-300 group overflow-hidden ${isActive
                                                ? isAdmin
                                                    ? "bg-purple-500/10 text-white border border-purple-500/20"
                                                    : "bg-white/5 text-white shadow-xl border border-white/10"
                                                : "text-gray-500 hover:text-white hover:bg-white/[0.02]"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <div
                                                    className={`p-2 rounded-xl transition-all duration-300 flex-shrink-0 ${isActive
                                                        ? "bg-purple-500 text-white shadow-lg shadow-purple-500/50 scale-110"
                                                        : "bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300"
                                                        }`}
                                                >
                                                    <item.icon size={18} />
                                                </div>
                                                <AnimatePresence mode="wait">
                                                    {!isCollapsed && (
                                                        <motion.span
                                                            initial={{ opacity: 0, x: -10, width: 0 }}
                                                            animate={{ opacity: 1, x: 0, width: 'auto' }}
                                                            exit={{ opacity: 0, x: -10, width: 0 }}
                                                            className="truncate whitespace-nowrap"
                                                        >
                                                            {isAdmin ? t(item.label) : t(item.label)}
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                                {isActive && !isCollapsed && (
                                                    <motion.div
                                                        layoutId="sidebar-active"
                                                        className={`ms-auto w-1.5 h-1.5 rounded-full ${isAdmin ? 'bg-purple-500' : 'bg-purple-500'} shadow-[0_0_10px_rgba(168,85,247,0.5)]`}
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
                    <div className="p-4 mt-auto border-t border-white/5 overflow-hidden">
                        <AnimatePresence mode="wait">
                            {isCollapsed ? (
                                <motion.button
                                    key="collapsed-upgrade"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => navigate("/dashboard/billing")}
                                    className="w-12 h-12 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group hover:scale-110 transition-transform"
                                >
                                    <Zap size={20} className="group-hover:animate-pulse" />
                                </motion.button>
                            ) : (
                                <motion.button
                                    key="expanded-upgrade"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate("/dashboard/billing")}
                                    className="w-full relative group overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-[1px] rounded-[2rem]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <div className="bg-[#0D0D0D] rounded-[1.9rem] p-5 flex flex-col items-start text-start gap-4 lg:gap-6 relative overflow-hidden">
                                        <div className="absolute -top-4 -end-4 opacity-10 pointer-events-none">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            >
                                                <InfinityIcon size={100} className="text-white" />
                                            </motion.div>
                                        </div>
                                        <div className="relative">
                                            <h4 className="text-white font-black text-base lg:text-lg mb-1 tracking-tight">
                                                {t("sidebar.unlockPremium")}
                                            </h4>
                                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                                                {t("sidebar.unlockPremiumDesc")}
                                            </p>
                                        </div>
                                        <div className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(168,85,247,0.2)] text-center flex items-center justify-center gap-2">
                                            <Zap className="w-4 h-4 text-white" />
                                            {t("sidebar.upgradeNow")}
                                        </div>
                                    </div>
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Admin Footer Info */}
                {isAdmin && !isCollapsed && (
                    <div className="p-4 mt-auto border-t border-white/5 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Globe className="w-3.5 h-3.5 text-gray-600" />
                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{t("sidebar.status.title")}:</span>
                            <span className="flex items-center gap-1 text-[10px] text-green-500 font-black uppercase tracking-widest">
                                <CheckCircle size={10} />
                                {t("sidebar.status.operational")}
                            </span>
                        </div>
                        <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest">
                            Admin Portal v2.0 • {new Date().getFullYear()}
                        </p>
                    </div>
                )}
            </motion.aside>
        </>
    );
}