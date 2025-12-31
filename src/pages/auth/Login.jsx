import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, Github, Twitter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import { showToast } from "../../redux/slices/uiSlice";
import AuthLayout from "../../components/auth/AuthLayout";
import { useTranslation } from "react-i18next";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Handle input
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginUser(formData)).unwrap();
      dispatch(showToast({ message: t("auth.login.success"), type: "success" }));

      if (res.user && (res.user.role === 'admin' || res.user.role === 'superadmin')) {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(
        showToast({
          message: error || t("auth.login.error"),
          type: "error",
        })
      );
    }
  };

  return (
    <AuthLayout
      type="login"
      title={t("auth.login.title")}
      subtitle={t("auth.login.subtitle")}
    >
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            {t("profile.labels.email")}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              placeholder={t("auth.login.emailPlaceholder")}
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-200">
              {t("auth.signup.passwordLabel")}
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
            >
              {t("auth.login.forgotPassword")}
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              placeholder={t("auth.login.passwordPlaceholder")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        {/* <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
            Remember me for 30 days
          </label>
        </div> */}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              {t("auth.login.submit")}
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                className="transition-transform duration-200"
              >
                →
              </motion.span>
            </>
          )}
        </motion.button>

        {/* Divider */}
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-transparent text-gray-400">
              Or continue with
            </span>
          </div>
        </div> */}

        {/* Social Login */}
        {/* <div className="grid grid-cols-2 gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 rounded-2xl text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            <Github className="w-5 h-5" />
            GitHub
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 rounded-2xl text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            <Twitter className="w-5 h-5" />
            Twitter
          </motion.button>
        </div> */}
      </motion.form>
    </AuthLayout>
  );
}
