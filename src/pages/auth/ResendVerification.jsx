// src/pages/auth/ResendVerification.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { useDispatch } from "react-redux";
import { resendVerification } from "../../redux/actions/authActions";
import { showToast } from "../../redux/slices/uiSlice";
import AuthLayout from "../../components/auth/AuthLayout";
import { useTranslation } from "react-i18next";

export default function ResendVerification() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(resendVerification({ email })).unwrap();
      setSent(true);
      dispatch(showToast({ message: t("auth.resendVerification.successTitle"), type: "success" }));
    } catch (err) {
      dispatch(showToast({ message: err || t("auth.resendVerification.error"), type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      type="resend"
      title={t("auth.resendVerification.title")}
      subtitle={t("auth.resendVerification.subtitle")}
    >
      {!sent ? (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              {t("auth.resendVerification.emailLabel")}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t("auth.resendVerification.emailPlaceholder")}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-md transition-all disabled:opacity-50"
          >
            {loading ? t("auth.resendVerification.sending") : t("auth.resendVerification.submit")}
          </motion.button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <Send className="w-10 h-10 text-green-400 mx-auto" />
          <h3 className="text-xl font-semibold text-white">{t("auth.resendVerification.successTitle")}</h3>
          <p className="text-gray-400">
            {t("auth.resendVerification.successDesc")} <span className="text-purple-400">{email}</span>.
          </p>
        </motion.div>
      )}
    </AuthLayout>
  );
}
