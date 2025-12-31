import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Library,
    Wallet,
    User,
    HelpCircle,
    LayoutGrid,
    Sparkles,
    Video,
    ImageIcon,
    Zap,
    Play,
    Camera,
    Wand2,
    Shield,
    Users,
    DollarSign,
    TrendingUp,
    LogOut,
    Globe,
    LayoutTemplate,
    Cpu
} from "lucide-react";
import CreditsBadge from "../components/dashboard/CreditsBadge";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, fetchUserProfile } from "../redux/actions/authActions";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import TidioChat from "../components/common/TidioChat";
import LanguageSwitcher from "../components/common/LanguageSwitcher";

export default function DashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    // Fetch user profile on mount to ensure user data is always available
    useEffect(() => {
        if (!user) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, user]);

    const { t } = useTranslation();

    const mainNav = [
        { label: t("sidebar.overview"), to: "/dashboard", icon: LayoutGrid },
        { label: t("sidebar.templates"), to: "/dashboard/templates", icon: LayoutTemplate },
        { label: t("sidebar.community"), to: "/dashboard/community", icon: Globe },
        { label: t("sidebar.library"), to: "/dashboard/library", icon: Library },
        { label: t("sidebar.billing"), to: "/dashboard/billing", icon: Wallet },
        { label: t("sidebar.profile"), to: "/dashboard/profile", icon: User },
        { label: t("sidebar.help"), to: "/dashboard/help", icon: HelpCircle },
    ];

    const generatorRoutes = [
        { label: t("sidebar.textToVideo"), to: "/generate/text-to-video", icon: Sparkles },
        { label: t("sidebar.imageToVideo"), to: "/generate/image-to-video", icon: Play },
        { label: t("sidebar.textToImage"), to: "/generate/text-to-image", icon: ImageIcon },
        { label: t("sidebar.imageToImage"), to: "/generate/image-to-image", icon: Wand2 },
    ];

    const adminRoutes = [
        { label: t("sidebar.admin.dashboard"), to: "/dashboard/admin", icon: LayoutGrid },
        { label: t("sidebar.admin.users"), to: "/dashboard/admin/users", icon: Users },
        { label: t("sidebar.admin.payments"), to: "/dashboard/admin/payments", icon: DollarSign },
        { label: t("sidebar.templates"), to: "/dashboard/admin/templates", icon: LayoutTemplate },
        { label: t("sidebar.admin.models"), to: "/dashboard/admin/models", icon: Cpu },
        { label: t("sidebar.community"), to: "/dashboard/admin/community", icon: Globe },
        { label: t("sidebar.admin.analytics"), to: "/dashboard/admin/analytics", icon: TrendingUp },
        { label: t("sidebar.help"), to: "/dashboard/admin/help", icon: HelpCircle },
    ];

    // Check if user is admin or superadmin
    const isAdmin = user && (user.role === 'admin' || user.role === 'superadmin');

    const handleLogout = async () => {
        if (confirm('Are you sure you want to logout?')) {
            await dispatch(logoutUser());
            navigate('/login');
        }
    };

    const getPageTitle = () => {
        const path = location.pathname;

        if (path.includes('/generate/text-to-video')) return "Text to Video";
        if (path.includes('/generate/image-to-video')) return "Image to Video";
        if (path.includes('/generate/text-to-image')) return "Text to Image";
        if (path.includes('/generate/image-to-image')) return "Image to Image";
        if (path.includes('/library')) return "Library";
        if (path.includes('/templates')) return "Template Library";
        if (path.includes('/community')) return "Community Feed";
        if (path.includes('/billing')) return "Billing";
        if (path.includes('/profile')) return "Profile";
        if (path.includes('/help')) return "Help";

        return "Dashboard Overview";
    };

    const getPageDescription = () => {
        const path = location.pathname;

        if (path.includes('/generate/text-to-video')) return "Transform text into stunning videos with AI";
        if (path.includes('/generate/image-to-video')) return "Animate your images with cinematic motion";
        if (path.includes('/generate/text-to-image')) return "Generate images from text descriptions";
        if (path.includes('/generate/image-to-image')) return "Transform and enhance your images";
        if (path.includes('/library')) return "Manage your created content and projects";
        if (path.includes('/templates')) return "Kickstart your project with professionally designed templates";
        if (path.includes('/community')) return "Explore what others are creating";
        if (path.includes('/billing')) return "Manage your subscription and credits";
        if (path.includes('/profile')) return "Update your account settings and preferences";
        if (path.includes('/help')) return "Get support and learn how to use Pixora";

        return "Welcome to your creative workspace";
    };

    return (
        <div className="flex min-h-screen ">

            {/* Enhanced Sidebar */}
            <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col h-screen sticky top-0">
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar">
                    <div className="space-y-8">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 px-2"
                        >
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg shadow-purple-500/25">
                                    <Sparkles size={20} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        Pixora
                                    </h1>
                                    <p className="text-xs text-gray-400 font-medium">AI Studio</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Credits Badge - Hide for admins */}
                        {!isAdmin && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="px-2"
                            >
                                <CreditsBadge />
                            </motion.div>
                        )}

                        {/* Main Navigation - Hide for admins */}
                        {!isAdmin && (
                            <motion.nav
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-1"
                            >
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3">
                                    {t("sidebar.overview")}
                                </h3>
                                {mainNav.map((item, i) => (
                                    <NavLink key={i} to={item.to} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all duration-300 group relative ${isActive ? "bg-white/10 text-white border border-white/20 shadow-lg shadow-purple-500/10" : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"}`}>
                                        {({ isActive }) => (
                                            <>
                                                <item.icon size={20} className={`transition-colors duration-300 ${isActive ? "text-purple-400" : "text-gray-400 group-hover:text-gray-300"}`} />
                                                <span className="font-medium">{item.label}</span>
                                                {isActive && <motion.div layoutId="activeNav" className="absolute right-3 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />}
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </motion.nav>
                        )}

                        {/* Admin Panel Section - Only shown to admins */}
                        {isAdmin && (
                            <motion.nav
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.25 }}
                                className="space-y-1"
                            >
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3 flex items-center gap-2">
                                    <Shield size={14} />
                                    {t("sidebar.adminPanel")}
                                </h3>
                                {adminRoutes.map((item, i) => (
                                    <NavLink key={i} to={item.to} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all duration-300 group relative ${isActive ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white border border-red-500/30 shadow-lg shadow-red-500/10" : "text-gray-400 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-orange-500/10 hover:text-white border border-transparent"}`}>
                                        {({ isActive }) => (
                                            <>
                                                <item.icon size={18} className={`transition-colors duration-300 ${isActive ? "text-red-400" : "text-gray-400 group-hover:text-red-300"}`} />
                                                <span className="font-medium">{item.label}</span>
                                                {isActive && <motion.div layoutId="activeAdminNav" className="absolute right-3 w-1.5 h-1.5 bg-gradient-to-r from-red-400 to-orange-400 rounded-full" />}
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </motion.nav>
                        )}

                        {/* AI Generators Section - Hide for admins */}
                        {!isAdmin && (
                            <motion.nav
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-1"
                            >
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3 flex items-center gap-2">
                                    <Sparkles size={14} />
                                    {t("sidebar.generators")}
                                </h3>
                                {generatorRoutes.map((item, i) => (
                                    <NavLink key={i} to={item.to} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all duration-300 group relative ${isActive ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30 shadow-lg shadow-purple-500/10" : "text-gray-400 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 hover:text-white border border-transparent"}`}>
                                        {({ isActive }) => (
                                            <>
                                                <item.icon size={18} className={`transition-colors duration-300 ${isActive ? "text-purple-400" : "text-gray-400 group-hover:text-purple-300"}`} />
                                                <span className="font-medium">{item.label}</span>
                                                {isActive && <motion.div layoutId="activeGeneratorNav" className="absolute right-3 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />}
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </motion.nav>
                        )}
                    </div>
                </div>

                {/* Fixed Footer with Logout Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-6 border-t border-white/10 space-y-4"
                >
                    <div className="flex justify-between items-center px-2">
                        <LanguageSwitcher />
                        <p className="text-xs text-gray-500">v1.0.0</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl border border-red-500/20 
                        backdrop-blur-sm transition-all duration-300 hover:border-red-500/40 hover:from-red-500/20 hover:to-orange-500/20 group flex items-center justify-center gap-3"
                    >
                        <div className="p-2 bg-red-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                            <LogOut size={16} className="text-red-400" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-white">{t("common.logout")}</p>
                            <p className="text-xs text-red-400 font-medium mt-0.5">{t("common.signoutText")}</p>
                        </div>
                    </button>
                </motion.div>
            </aside>

            {/* Enhanced Main Content */}
            <main className="flex-1  overflow-y-auto">

                <div className="">
                    <Outlet />
                </div>
            </main>
            <TidioChat /> {/* Add Tidio Chat */}
        </div>
    );
}