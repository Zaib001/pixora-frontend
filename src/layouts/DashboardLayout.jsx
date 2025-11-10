import { Outlet, NavLink } from "react-router-dom";
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
    Wand2
} from "lucide-react";
import CreditsBadge from "../components/dashboard/CreditsBadge";
import { useLocation } from "react-router-dom";

export default function DashboardLayout() {
    const location = useLocation();

    const mainNav = [
        { label: "Overview", to: "/dashboard", icon: LayoutGrid },
        { label: "Library", to: "/dashboard/library", icon: Library },
        { label: "Billing", to: "/dashboard/billing", icon: Wallet },
        { label: "Profile", to: "/dashboard/profile", icon: User },
        { label: "Help", to: "/dashboard/help", icon: HelpCircle },
    ];

    const generatorRoutes = [
        { label: "Text to Video", to: "/generate/text-to-video", icon: Sparkles },
        { label: "Image to Video", to: "/generate/image-to-video", icon: Play },
        { label: "Text to Image", to: "/generate/text-to-image", icon: ImageIcon },
        { label: "Image to Image", to: "/generate/image-to-image", icon: Wand2 },
    ];

    const getPageTitle = () => {
        const path = location.pathname;

        if (path.includes('/generate/text-to-video')) return "Text to Video";
        if (path.includes('/generate/image-to-video')) return "Image to Video";
        if (path.includes('/generate/text-to-image')) return "Text to Image";
        if (path.includes('/generate/image-to-image')) return "Image to Image";
        if (path.includes('/library')) return "Library";
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
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
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

                        {/* Credits Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="px-2"
                        >
                            <CreditsBadge />
                        </motion.div>

                        {/* Main Navigation */}
                        <motion.nav
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-1"
                        >
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3">
                                Dashboard
                            </h3>
                            {mainNav.map((item, i) => (
                                <NavLink
                                    key={i}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all duration-300 group relative
                                        ${isActive
                                            ? "bg-white/10 text-white border border-white/20 shadow-lg shadow-purple-500/10"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <item.icon
                                                size={20}
                                                className={`transition-colors duration-300 ${isActive ? "text-purple-400" : "text-gray-400 group-hover:text-gray-300"
                                                    }`}
                                            />
                                            <span className="font-medium">{item.label}</span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeNav"
                                                    className="absolute right-3 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </motion.nav>

                        {/* AI Generators Section */}
                        <motion.nav
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-1"
                        >
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3 flex items-center gap-2">
                                <Sparkles size={14} />
                                AI Generators
                            </h3>
                            {generatorRoutes.map((item, i) => (
                                <NavLink
                                    key={i}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all duration-300 group relative
                                        ${isActive
                                            ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30 shadow-lg shadow-purple-500/10"
                                            : "text-gray-400 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 hover:text-white border border-transparent"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <item.icon
                                                size={18}
                                                className={`transition-colors duration-300 ${isActive ? "text-purple-400" : "text-gray-400 group-hover:text-purple-300"
                                                    }`}
                                            />
                                            <span className="font-medium">{item.label}</span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeGeneratorNav"
                                                    className="absolute right-3 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </motion.nav>
                    </div>
                </div>

                {/* Fixed Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-6 border-t border-white/10"
                >
                    {/* Support Card */}
                    <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-white/10 
                        backdrop-blur-sm transition-all duration-300 hover:border-white/20 cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                <HelpCircle size={16} className="text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Need assistance?</p>
                                <p className="text-xs text-purple-400 font-medium mt-0.5">Contact Support →</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </aside>

            {/* Enhanced Main Content */}
             <main className="flex-1  overflow-y-auto">

                <div className="">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}