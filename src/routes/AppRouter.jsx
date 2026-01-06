import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import Home from "../pages/Home";
import RefundPolicy from "../pages/RefundPolicy";

// Auth Pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import VerifyResetOtp from "../pages/auth/VerifyResetOtp";

// Dashboard Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Dashboard Pages
import DashboardHome from "../pages/dashboard/DashboardHome";
import Library from "../pages/dashboard/Library";
import Billing from "../pages/dashboard/Billing";
import Profile from "../pages/dashboard/Profile";
import Settings from "../pages/dashboard/Settings";
import Help from "../pages/dashboard/Help";
import Community from "../pages/dashboard/Community";
import Templates from "../pages/Templates";

// Admin Pages
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import AdminUsers from "../pages/dashboard/AdminUsers";
import AdminPayments from "../pages/dashboard/AdminPayments";
import AdminAnalytics from "../pages/dashboard/AdminAnalytics";
import AdminHelp from "../pages/dashboard/AdminHelp";
import AdminTemplates from "../pages/dashboard/AdminTemplates";
import AdminModelManagement from "../pages/dashboard/AdminModelManagement";
import AdminCommunity from "../pages/dashboard/AdminCommunity";

// Generators
import TextToVideo from "../pages/generate/TextToVideo";
import ImageToVideo from "../pages/generate/ImageToVideo";
import TextToImage from "../pages/generate/TextToImage";
import ImageToImage from "../pages/generate/ImageToImage";

import NotFound from "../pages/notfound/NotFound";

/* ------------------- ANIMATION VARIANTS ------------------- */

// Fade
const fadeVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
};
const fadeTransition = { duration: 0.3, ease: "easeInOut" };

// Slide Up
const slideUpVariants = {
    initial: { opacity: 0, y: 60, scale: 0.95 },
    in: { opacity: 1, y: 0, scale: 1 },
    out: { opacity: 0, y: -60, scale: 0.95 }
};
const slideUpTransition = { type: "spring", stiffness: 400, damping: 35, duration: 0.4 };

// Scale
const scaleVariants = {
    initial: { opacity: 0, scale: 0.9 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 0.9 }
};
const scaleTransition = { type: "spring", stiffness: 300, damping: 30, duration: 0.4 };

// Direction-aware slide
const elegantSlideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 80 : -80, opacity: 0, filter: "blur(4px)" }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (direction) => ({ x: direction < 0 ? 80 : -80, opacity: 0, filter: "blur(4px)" }),
};
const elegantSlideTransition = { type: "spring", stiffness: 400, damping: 35, duration: 0.4 };

function useRouteDirection() {
    const location = useLocation();
    const map = {
        "/login": 1,
        "/signup": 2,
        "/forgot-password": 3,
        "/reset-password": 4,
        "/verify-otp": 5,
        "/verify-reset-otp": 6,
        "/": 0,
        "/dashboard": 10,
        "/dashboard/library": 11,
        "/dashboard/billing": 12,
        "/dashboard/profile": 13,
        "/dashboard/settings": 14,
        "/dashboard/help": 15,
        "/dashboard/admin": 20,
        "/dashboard/admin/users": 21,
        "/dashboard/admin/payments": 22,
        "/dashboard/admin/analytics": 23,
        "/generate/text-to-video": 30,
        "/generate/image-to-video": 31,
        "/generate/text-to-image": 32,
        "/generate/image-to-image": 33,
    };
    return map[location.pathname] || 0;
}

const AnimatedRoute = ({ children, type = "fade" }) => {
    const direction = useRouteDirection();

    const variantsMap = {
        fade: fadeVariants,
        slideUp: slideUpVariants,
        scale: scaleVariants,
        slide: elegantSlideVariants,
    };

    const transitionMap = {
        fade: fadeTransition,
        slideUp: slideUpTransition,
        scale: scaleTransition,
        slide: elegantSlideTransition,
    };

    const variants = variantsMap[type];
    const transition = transitionMap[type];

    return (
        <motion.div
            custom={direction}
            variants={variants}
            initial="initial"
            animate="in"
            exit="out"
            transition={transition}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
};

export default function AppRouter() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>

                {/* ---------------- PUBLIC ROUTES ---------------- */}
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<AnimatedRoute type="slide"><Home /></AnimatedRoute>} />
                    <Route path="/login" element={<AnimatedRoute type="slide"><Login /></AnimatedRoute>} />
                    <Route path="/signup" element={<AnimatedRoute type="slide"><Signup /></AnimatedRoute>} />
                    <Route path="/forgot-password" element={<AnimatedRoute type="slide"><ForgotPassword /></AnimatedRoute>} />
                    <Route path="/reset-password" element={<AnimatedRoute type="slide"><ResetPassword /></AnimatedRoute>} />
                    <Route path="/verify-otp" element={<AnimatedRoute type="slide"><VerifyOtp /></AnimatedRoute>} />
                    <Route path="/verify-reset-otp" element={<AnimatedRoute type="slide"><VerifyResetOtp /></AnimatedRoute>} />
                    <Route path="/refund-policy" element={<AnimatedRoute type="slide"><RefundPolicy /></AnimatedRoute>} />
                </Route>

                {/* ---------------- DASHBOARD (PRIVATE) ---------------- */}
                <Route element={<PrivateRoute />}>
                    <Route element={<DashboardLayout />}>

                        {/* ADMIN ROUTES - MUST COME FIRST (Most Specific) */}
                        <Route element={<AdminRoute />}>
                            <Route path="/dashboard/admin">
                                <Route index element={<AnimatedRoute type="slideUp"><AdminDashboard /></AnimatedRoute>} />
                                <Route path="users" element={<AnimatedRoute type="slideUp"><AdminUsers /></AnimatedRoute>} />
                                <Route path="payments" element={<AnimatedRoute type="slideUp"><AdminPayments /></AnimatedRoute>} />
                                <Route path="analytics" element={<AnimatedRoute type="slideUp"><AdminAnalytics /></AnimatedRoute>} />
                                <Route path="templates" element={<AnimatedRoute type="slideUp"><AdminTemplates /></AnimatedRoute>} />
                                <Route path="models" element={<AnimatedRoute type="slideUp"><AdminModelManagement /></AnimatedRoute>} />
                                <Route path="community" element={<AnimatedRoute type="slideUp"><AdminCommunity /></AnimatedRoute>} />
                                <Route path="help" element={<AnimatedRoute type="slideUp"><AdminHelp /></AnimatedRoute>} />
                            </Route>
                        </Route>

                        {/* REGULAR DASHBOARD ROUTES (Less Specific) */}
                        <Route path="/dashboard" element={<AnimatedRoute type="fade"><DashboardHome /></AnimatedRoute>} />
                        <Route path="/dashboard/library" element={<AnimatedRoute type="fade"><Library /></AnimatedRoute>} />
                        <Route path="/dashboard/billing" element={<AnimatedRoute type="fade"><Billing /></AnimatedRoute>} />
                        <Route path="/dashboard/profile" element={<AnimatedRoute type="fade"><Profile /></AnimatedRoute>} />
                        <Route path="/dashboard/settings" element={<AnimatedRoute type="fade"><Settings /></AnimatedRoute>} />
                        <Route path="/dashboard/help" element={<AnimatedRoute type="fade"><Help /></AnimatedRoute>} />
                        <Route path="/dashboard/community" element={<AnimatedRoute type="fade"><Community /></AnimatedRoute>} />
                        <Route path="/dashboard/templates" element={<AnimatedRoute type="fade"><Templates /></AnimatedRoute>} />

                        {/* GENERATOR ROUTES */}
                        <Route path="/generate/text-to-video" element={<AnimatedRoute type="scale"><TextToVideo /></AnimatedRoute>} />
                        <Route path="/generate/image-to-video" element={<AnimatedRoute type="scale"><ImageToVideo /></AnimatedRoute>} />
                        <Route path="/generate/text-to-image" element={<AnimatedRoute type="scale"><TextToImage /></AnimatedRoute>} />
                        <Route path="/generate/image-to-image" element={<AnimatedRoute type="scale"><ImageToImage /></AnimatedRoute>} />

                    </Route>
                </Route>

                {/* ---------------- 404 ---------------- */}
                <Route path="*" element={<AnimatedRoute type="fade"><NotFound /></AnimatedRoute>} />

            </Routes>
        </AnimatePresence>
    );
}
