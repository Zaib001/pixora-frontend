"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Sparkles,
  Menu,
  X,
  User,
  LogIn,
  UserPlus,
  ChevronDown,
  Video,
  LayoutTemplate,
  CreditCard,
  Phone,
  Globe
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: t("landing.navbar.features"),
      icon: Sparkles,
      dropdown: [
        { name: t("landing.navbar.dropdowns.videoGen"), icon: Video, desc: t("landing.navbar.dropdowns.videoGenDesc") },
        { name: t("landing.navbar.dropdowns.smartTemplates"), icon: LayoutTemplate, desc: t("landing.navbar.dropdowns.smartTemplatesDesc") },
        { name: t("landing.navbar.dropdowns.creditSystem"), icon: CreditCard, desc: t("landing.navbar.dropdowns.creditSystemDesc") }
      ]
    },
    { name: t("landing.navbar.templates"), href: "/templates" },
    { name: t("landing.navbar.pricing"), href: "/pricing" },
    { name: t("landing.navbar.contact"), href: "/contact", icon: Phone }
  ];

  const isActiveRoute = (href) => {
    return location.pathname === href;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "backdrop-blur-2xl bg-[#0A0A0F]/90 border-b border-white/10 shadow-2xl shadow-purple-500/10"
        : "bg-transparent border-none"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
              Pixora
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item, i) => (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => item.dropdown && setActiveDropdown(i)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.dropdown ? (
                <motion.button
                  whileHover={{ y: -2 }}
                  className={`flex items-center gap-5 font-medium text-md transition-all duration-300 group ${activeDropdown === i ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.name}
                  <motion.div
                    animate={{ rotate: activeDropdown === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </motion.button>
              ) : (
                <Link to={item.href || "#"}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`flex items-center gap-1 font-medium text-md transition-all duration-300 group ${isActiveRoute(item.href)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.name}
                    <span className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 ${isActiveRoute(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                  </motion.div>
                </Link>
              )}

              {/* Dropdown Menu */}
              <AnimatePresence>
                {item.dropdown && activeDropdown === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/20 p-2"
                  >
                    {item.dropdown.map((dropdownItem, j) => (
                      <motion.div
                        key={j}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                          <dropdownItem.icon className="w-4 h-4 text-purple-300" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{dropdownItem.name}</p>
                          <p className="text-gray-400 text-xs">{dropdownItem.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Auth Buttons */}

        <div className="hidden lg:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveDropdown(activeDropdown === 'lang' ? null : 'lang')}
              className="p-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Globe className="w-5 h-5" />
            </motion.button>
            <AnimatePresence>
              {activeDropdown === 'lang' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-32 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl shadow-purple-500/20 py-2"
                >
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'es', label: 'Español' },
                    { code: 'fr', label: 'Français' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors ${i18n.language === lang.code ? 'text-purple-400 font-medium' : 'text-gray-300'
                        }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-2.5 text-gray-300 hover:text-white font-medium text-sm transition-all duration-300 hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/10"
            >
              <LogIn className="w-4 h-4" />
              {t("landing.navbar.signIn")}
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0A0A0F]/95 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-4">
                {navItems.map((item, i) => (
                  <div key={i}>
                    {item.dropdown ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-300 font-medium text-sm">
                          {item.icon && <item.icon className="w-4 h-4" />}
                          {item.name}
                        </div>
                        <div className="ml-4 space-y-2 border-l border-white/10 pl-4">
                          {item.dropdown.map((dropdownItem, j) => (
                            <div
                              key={j}
                              className="flex items-center gap-3 py-2 text-gray-400 hover:text-white transition-colors duration-200"
                            >
                              <dropdownItem.icon className="w-4 h-4" />
                              <span className="text-sm">{dropdownItem.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.href || "#"}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-2 transition-all duration-300 ${isActiveRoute(item.href)
                          ? "text-white font-semibold"
                          : "text-gray-300 hover:text-white"
                          }`}
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-gray-300 hover:text-white font-medium text-sm transition-all duration-300 hover:bg-white/5 rounded-2xl border border-white/10"
                  >
                    <LogIn className="w-4 h-4" />
                    {t("landing.navbar.signIn")}
                  </motion.button>
                </Link>

                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium text-sm rounded-2xl shadow-lg transition-all duration-300"
                  >
                    <UserPlus className="w-4 h-4" />
                    {t("landing.navbar.getStarted")}
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}