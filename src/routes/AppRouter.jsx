import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import { Suspense, lazy } from "react";
import LoadingSpinner from "../components/feedback/LoadingSpinner";

// Lazy Load Pages
const Home = lazy(() => import("../pages/Home"));
const RefundPolicy = lazy(() => import("../pages/RefundPolicy"));

// Auth Pages
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const VerifyOtp = lazy(() => import("../pages/auth/VerifyOtp"));
const VerifyResetOtp = lazy(() => import("../pages/auth/VerifyResetOtp"));

// Dashboard Pages
const DashboardHome = lazy(() => import("../pages/dashboard/DashboardHome"));
const Library = lazy(() => import("../pages/dashboard/Library"));
const Billing = lazy(() => import("../pages/dashboard/Billing"));
const Profile = lazy(() => import("../pages/dashboard/Profile"));
const Settings = lazy(() => import("../pages/dashboard/Settings"));
const Help = lazy(() => import("../pages/dashboard/Help"));
const Community = lazy(() => import("../pages/dashboard/Community"));
const Templates = lazy(() => import("../pages/Templates"));

// Admin Pages
const AdminDashboard = lazy(() => import("../pages/dashboard/AdminDashboard"));
const AdminUsers = lazy(() => import("../pages/dashboard/AdminUsers"));
const AdminPayments = lazy(() => import("../pages/dashboard/AdminPayments"));
const AdminAnalytics = lazy(() => import("../pages/dashboard/AdminAnalytics"));
const AdminHelp = lazy(() => import("../pages/dashboard/AdminHelp"));
const AdminTemplates = lazy(() => import("../pages/dashboard/AdminTemplates"));
const AdminModelManagement = lazy(() => import("../pages/dashboard/AdminModelManagement"));
const AdminCommunity = lazy(() => import("../pages/dashboard/AdminCommunity"));

// Generators
const TextToVideo = lazy(() => import("../pages/generate/TextToVideo"));
const ImageToVideo = lazy(() => import("../pages/generate/ImageToVideo"));
const TextToImage = lazy(() => import("../pages/generate/TextToImage"));
const ImageToImage = lazy(() => import("../pages/generate/ImageToImage"));

const NotFound = lazy(() => import("../pages/notfound/NotFound"));

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
                    <Route path="/" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slide"><Home /></AnimatedRoute></Suspense>} />
                    <Route path="/login" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slide"><Login /></AnimatedRoute></Suspense>} />
                    <Route path="/signup" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slide"><Signup /></AnimatedRoute></Suspense>} />
                    <Route path="/forgot-password" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slide"><ForgotPassword /></AnimatedRoute></Suspense>} />
                    <Route path="/reset-password" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slide"><ResetPassword /></AnimatedRoute></Suspense>} />
                    <Route path="/verify-otp" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slide"><VerifyOtp /></AnimatedRoute></Suspense>} />
                    <Route path="/verify-reset-otp" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slide"><VerifyResetOtp /></AnimatedRoute></Suspense>} />
                    <Route path="/refund-policy" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slide"><RefundPolicy /></AnimatedRoute></Suspense>} />
                </Route>

                {/* ---------------- DASHBOARD (PRIVATE) ---------------- */}
                <Route element={<PrivateRoute />}>
                    <Route element={<DashboardLayout />}>

                        {/* ADMIN ROUTES - MUST COME FIRST (Most Specific) */}
                        <Route element={<AdminRoute />}>
                            <Route path="/dashboard/admin">
                                <Route index element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slideUp"><AdminDashboard /></AnimatedRoute></Suspense>} />
                                <Route path="users" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slideUp"><AdminUsers /></AnimatedRoute></Suspense>} />
                                <Route path="payments" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slideUp"><AdminPayments /></AnimatedRoute></Suspense>} />
                                <Route path="analytics" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slideUp"><AdminAnalytics /></AnimatedRoute></Suspense>} />
                                <Route path="templates" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slideUp"><AdminTemplates /></AnimatedRoute></Suspense>} />
                                <Route path="models" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slideUp"><AdminModelManagement /></AnimatedRoute></Suspense>} />
                                <Route path="community" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slideUp"><AdminCommunity /></AnimatedRoute></Suspense>} />
                                <Route path="help" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="slideUp"><AdminHelp /></AnimatedRoute></Suspense>} />
                            </Route>
                        </Route>

                        {/* REGULAR DASHBOARD ROUTES (Less Specific) */}
                        <Route path="/dashboard" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="fade"><DashboardHome /></AnimatedRoute></Suspense>} />
                        <Route path="/dashboard/library" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="fade"><Library /></AnimatedRoute></Suspense>} />
                        <Route path="/dashboard/billing" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="fade"><Billing /></AnimatedRoute></Suspense>} />
                        <Route path="/dashboard/profile" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="fade"><Profile /></AnimatedRoute></Suspense>} />
                        <Route path="/dashboard/settings" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="fade"><Settings /></AnimatedRoute></Suspense>} />
                        <Route path="/dashboard/help" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="fade"><Help /></AnimatedRoute></Suspense>} />
                        <Route path="/dashboard/community" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="fade"><Community /></AnimatedRoute></Suspense>} />
                        <Route path="/dashboard/templates" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="fade"><Templates /></AnimatedRoute></Suspense>} />

                        {/* GENERATOR ROUTES */}
                        <Route path="/generate/text-to-video" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="scale"><TextToVideo /></AnimatedRoute></Suspense>} />
                        <Route path="/generate/image-to-video" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="scale"><ImageToVideo /></AnimatedRoute></Suspense>} />
                        <Route path="/generate/text-to-image" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="scale"><TextToImage /></AnimatedRoute></Suspense>} />
                        <Route path="/generate/image-to-image" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="scale"><ImageToImage /></AnimatedRoute></Suspense>} />

                    </Route>
                </Route>

                {/* ---------------- 404 ---------------- */}
                <Route path="*" element={<Suspense fallback={<LoadingSpinner isSuspense />}><AnimatedRoute type="fade"><NotFound /></AnimatedRoute></Suspense>} />
            </Routes>
        </AnimatePresence>
    );
}
