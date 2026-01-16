import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronDown,
  Globe,
  Bell,
  Search,
  Menu
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import { useTranslation } from "react-i18next";
import CreditsBadge from "./CreditsBadge";
import LanguageSwitcher from "../common/LanguageSwitcher";

export default function Header({ toggleMobile }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  const handleLogout = async () => {
    if (window.confirm(t("common.logoutConfirm") || "Are you sure you want to logout?")) {
      await dispatch(logoutUser());
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobile}
          className="md:hidden p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all"
        >
          <Menu size={20} />
        </button>
        <div className="hidden lg:block">
          {/* Breadcrumbs or page title could go here */}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Credits Badge - Hide for Admin */}
        {!isAdmin && (
          <div className="hidden md:block">
            <CreditsBadge />
          </div>
        )}

        {/* Profile Dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/20">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="hidden lg:block text-start me-2">
              <p className="text-xs font-black text-white uppercase tracking-wider truncate max-w-[100px]">
                {user?.name || t("common.user", { defaultValue: "User" })}
              </p>
              {/* Show role for admin, subscription for users */}
              <p className="text-[10px] text-purple-400 font-bold uppercase">
                {isAdmin ? (user?.role === 'superadmin' ? 'Super Admin' : 'Admin') : (user?.subscriptionPlan || t("common.free"))}
              </p>
            </div>
            <ChevronDown size={16} className={`text-gray-500 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
          </motion.button>

          <AnimatePresence>
            {showProfileMenu && (
              <>
                {/* Backdrop toggle */}
                <div
                  className="fixed inset-0 z-0"
                  onClick={() => setShowProfileMenu(false)}
                />

                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute end-0 mt-3 w-64 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
                >
                  {/* Header */}
                  <div className="p-5 bg-white/5 border-b border-white/5">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">
                      {isAdmin ? 'ADMIN PROFILE' : t("sidebar.profile")}
                    </p>
                    <p className="text-sm font-bold text-white truncate">{user?.email}</p>
                    {/* Show admin badge */}
                    {isAdmin && (
                      <div className="mt-2 px-2 py-1 bg-purple-600/20 text-purple-400 text-xs font-bold rounded-lg inline-block">
                        {user?.role === 'superadmin' ? 'Super Administrator' : 'Administrator'}
                      </div>
                    )}
                  </div>

                  {/* Links - Show only for non-admin users */}
                  {!isAdmin && (
                    <div className="p-2 space-y-1">
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                      >
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-all">
                          <User size={16} />
                        </div>
                        {t("sidebar.profile")}
                      </Link>
                      <Link
                        to="/dashboard/billing"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                      >
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-all">
                          <CreditCard size={16} />
                        </div>
                        {t("sidebar.billing")}
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                      >
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-all">
                          <Settings size={16} />
                        </div>
                        {t("sidebar.settings")}
                      </Link>
                      <Link
                        to="/dashboard/help"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                      >
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-all">
                          <HelpCircle size={16} />
                        </div>
                        {t("sidebar.help")}
                      </Link>
                    </div>
                  )}

                  {/* Special Sections */}
                  <div className="p-2 border-t border-white/5 space-y-1">
                    {/* Language Switcher - Show for all */}
                    <div className="px-4 py-2">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t("common.language")}</p>
                      <LanguageSwitcher />
                    </div>

                    {/* Logout Button - Show for all */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all group"
                    >
                      <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-all">
                        <LogOut size={16} />
                      </div>
                      {t("common.logout")}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}