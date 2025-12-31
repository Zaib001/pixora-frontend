import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Check,
  UserPlus,
  Github,
  Twitter,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRequirements = [
    { text: t("auth.signup.requirements.length"), met: formData.password.length >= 8 },
    { text: t("auth.signup.requirements.uppercase"), met: /[A-Z]/.test(formData.password) },
    { text: t("auth.signup.requirements.number"), met: /[0-9]/.test(formData.password) },
    { text: t("auth.signup.requirements.special"), met: /[!@#$%^&*]/.test(formData.password) },
  ];

  const allRequirementsMet = passwordRequirements.every((req) => req.met);
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allRequirementsMet || !passwordsMatch || !formData.agreeToTerms) return;

    try {
      const result = await dispatch(
        registerUser({
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password,
        })
      ).unwrap();

      if (result.requiresOtpVerification || !result.token) {
        navigate("/verify-otp", { state: { email: formData.email } });
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <AuthLayout
      type="signup"
      title={t("auth.signup.title")}
      subtitle={t("auth.signup.subtitle")}
    >
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            {t("auth.signup.nameLabel")}
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              placeholder={t("auth.signup.namePlaceholder")}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            {t("auth.signup.emailLabel")}
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

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            {t("auth.signup.passwordLabel")}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              placeholder={t("auth.signup.passwordPlaceholder")}
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

          {/* Password Requirements */}
          {formData.password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 space-y-2"
            >
              {passwordRequirements.map((req, index) => (
                <motion.div
                  key={req.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-2 text-xs ${req.met ? "text-green-400" : "text-gray-400"
                    }`}
                >
                  <Check
                    className={`w-3 h-3 ${req.met ? "text-green-400" : "text-gray-600"
                      }`}
                  />
                  {req.text}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            {t("auth.signup.confirmPasswordLabel")}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full pl-12 pr-12 py-4 bg-white/5 border ${formData.confirmPassword
                  ? passwordsMatch
                    ? "border-green-500/50"
                    : "border-red-500/50"
                  : "border-white/10"
                } rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm`}
              placeholder={t("auth.signup.confirmPasswordPlaceholder")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {formData.confirmPassword && !passwordsMatch && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs mt-2"
            >
              {t("auth.signup.errors.match")}
            </motion.p>
          )}
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
              className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2 mt-1 flex-shrink-0"
            />
            <span className="text-sm text-gray-300 leading-relaxed">
              {t("auth.signup.terms.agree")}{" "}
              <a
                href="#"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                {t("auth.signup.terms.service")}
              </a>{" "}
              {t("auth.signup.terms.and")}{" "}
              <a
                href="#"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                {t("auth.signup.terms.privacy")}
              </a>
            </span>
          </label>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={
            loading || !allRequirementsMet || !passwordsMatch || !formData.agreeToTerms
          }
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
              <UserPlus className="w-5 h-5" />
              {t("auth.signup.submit")}
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
              Or sign up with
            </span>
          </div>
        </div> */}

        {/* Social Buttons */}
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
