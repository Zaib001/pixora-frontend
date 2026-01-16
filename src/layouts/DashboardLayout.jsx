import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import TidioChat from "../components/common/TidioChat";
import { fetchUserProfile } from "../redux/actions/authActions";
import { fetchCredits } from "../redux/actions/creditActions";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardLayout() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Sidebar States
    const [isCollapsed, setIsCollapsed] = React.useState(() => {
        const stored = localStorage.getItem('sidebar_collapsed');
        if (stored !== null) return stored === 'true';
        return window.innerWidth < 1280 && window.innerWidth >= 768;
    });
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUserProfile());
            dispatch(fetchCredits());
        }

        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1280) { // XL
                // Auto-expand on XL if not manually collapsed
                if (localStorage.getItem('sidebar_collapsed') === null) {
                    setIsCollapsed(false);
                }
                setIsMobileOpen(false);
            } else if (width >= 768) { // MD/LG
                setIsCollapsed(true);
                setIsMobileOpen(false);
            } else { // SM
                setIsMobileOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Sync on mount
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch, isAuthenticated]);

    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem('sidebar_collapsed', newState);
    };

    // Scroll locking for mobile
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileOpen]);

    return (
        <div className="flex min-h-screen bg-[#0A0A0A] text-white relative">
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] xl:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar with state props */}
            <Sidebar
                isCollapsed={isCollapsed}
                toggleCollapse={toggleCollapse}
                isMobileOpen={isMobileOpen}
                closeMobile={() => setIsMobileOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 h-screen relative">
                {/* Header with mobile toggle */}
                <Header toggleMobile={() => setIsMobileOpen(!isMobileOpen)} />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative">
                    <div className="p-4 md:p-8 pb-20 max-w-[1600px] mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>


        </div>
    );
}
