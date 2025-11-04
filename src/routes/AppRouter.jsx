import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Profile from "../pages/dashboard/Profile";
import Transactions from "../pages/dashboard/Transactions";
import NotFound from "../pages/notfound/NotFound";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Home from '../pages/Home';

import ProjectsNew from "../pages/ProjectsNew";
import Projects from "../pages/Projects";
import Templates from "../pages/Templates";
import Settings from "../pages/Settings";
import Support from "../pages/Support";
import VerifyOtp from "../pages/auth/VerifyOtp";
import VerifyResetOtp from "../pages/auth/VerifyResetOtp";

// Modern Page Transition Variants
const fadeVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  }
};

const fadeTransition = {
  duration: 0.3,
  ease: "easeInOut"
};

// Elegant Slide Up Animation
const slideUpVariants = {
  initial: {
    opacity: 0,
    y: 60,
    scale: 0.95
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -60,
    scale: 0.95
  }
};

const slideUpTransition = {
  type: "spring",
  stiffness: 400,
  damping: 35,
  duration: 0.4
};

// Smooth Scale Animation
const scaleVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    rotateX: 5
  },
  in: {
    opacity: 1,
    scale: 1,
    rotateX: 0
  },
  out: {
    opacity: 0,
    scale: 0.9,
    rotateX: -5
  }
};

const scaleTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  duration: 0.4
};

// Elegant Slide Animation with Direction
const elegantSlideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    filter: "blur(4px)"
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)"
  },
  exit: (direction) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    filter: "blur(4px)"
  })
};

const elegantSlideTransition = {
  type: "spring",
  stiffness: 400,
  damping: 35,
  duration: 0.4
};

// Custom hook to get route direction
function useRouteDirection() {
  const location = useLocation();

  // Define route hierarchy for slide direction
  const getRouteDepth = (pathname) => {
    const routes = {
      '/login': 1,
      '/signup': 2,
      '/forgot-password': 3,
      '/reset-password': 4,
      '/verify-email': 5,
      '/resend-verification': 6,
      '/dashboard': 10,
      '/profile': 11,
      '/transactions': 12,
      '/projects/new': 13,
      '/projects': 14,
      '/templates': 15,
      '/settings': 16,
      '/support': 17,
      '/': 0
    };

    return routes[pathname] || 0;
  };

  return getRouteDepth(location.pathname);
}

// Animated Route Wrapper Component
const AnimatedRoute = ({ children, type = "fade" }) => {
  const direction = useRouteDirection();

  switch (type) {
    case "slide":
      return (
        <motion.div
          custom={direction}
          variants={elegantSlideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={elegantSlideTransition}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      );
    
    case "slideUp":
      return (
        <motion.div
          variants={slideUpVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={slideUpTransition}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      );
    
    case "scale":
      return (
        <motion.div
          variants={scaleVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={scaleTransition}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      );
    
    default: // fade
      return (
        <motion.div
          variants={fadeVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={fadeTransition}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      );
  }
};

export default function AppRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Public Auth Routes - Use elegant slide animations */}
        <Route
          element={
            <AnimatedRoute type="slide">
              <PublicRoute />
            </AnimatedRoute>
          }
        >
          <Route
            path="/"
            element={
              <AnimatedRoute type="slide">
                <Home />
              </AnimatedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AnimatedRoute type="slide">
                <Login />
              </AnimatedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AnimatedRoute type="slide">
                <Signup />
              </AnimatedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <AnimatedRoute type="slide">
                <ForgotPassword />
              </AnimatedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <AnimatedRoute type="slide">
                <ResetPassword />
              </AnimatedRoute>
            }
          />
          <Route
            path="/verify-otp"
            element={
              <AnimatedRoute type="slide">
                <VerifyOtp />
              </AnimatedRoute>
            }
          />
          <Route
            path="verify-reset-otp"
            element={
              <AnimatedRoute type="slide">
                <VerifyResetOtp />
              </AnimatedRoute>
            }
          />
         
        </Route>

        <Route
          element={
            <AnimatedRoute type="scale">
              <PrivateRoute />
            </AnimatedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <AnimatedRoute type="scale">
                <DashboardHome />
              </AnimatedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <AnimatedRoute type="scale">
                <Profile />
              </AnimatedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <AnimatedRoute type="scale">
                <Transactions />
              </AnimatedRoute>
            }
          />
          
          {/* New Quick Actions Routes - Use slide up animations */}
          <Route
            path="/projects/new"
            element={
              <AnimatedRoute type="slideUp">
                <ProjectsNew />
              </AnimatedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <AnimatedRoute type="slideUp">
                <Projects />
              </AnimatedRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <AnimatedRoute type="slideUp">
                <Templates />
              </AnimatedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <AnimatedRoute type="slideUp">
                <Settings />
              </AnimatedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <AnimatedRoute type="slideUp">
                <Support />
              </AnimatedRoute>
            }
          />
        </Route>

        <Route
          path="/"
          element={
            <AnimatedRoute type="fade">
              <Login />
            </AnimatedRoute>
          }
        />
        <Route
          path="*"
          element={
            <AnimatedRoute type="fade">
              <NotFound />
            </AnimatedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}