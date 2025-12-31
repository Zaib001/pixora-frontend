import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";
import { verifyResetOtp } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { showToast } from "../../redux/slices/uiSlice";
import { useTranslation } from "react-i18next";

export default function VerifyResetOtp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetEmail, loading } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resending, setResending] = useState(false);
  const { t } = useTranslation();

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const next = document.getElementById(`reset-otp-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join("");



    if (code.length < 6) {
      dispatch(showToast({ message: t("auth.verify.error.incomplete"), type: "error" }));
      return;
    }

    try {
      const result = await dispatch(verifyResetOtp({ email: resetEmail, otp: code })).unwrap();

      dispatch(
        showToast({
          message: t("auth.verify.success"),
          type: "success",
        })
      );

      setTimeout(() => navigate("/reset-password", { replace: true }), 1500);
    } catch (error) {
      console.error("Reset OTP verification failed:", error);
    }
  };

  const handleResend = async () => {
    if (!resetEmail) return;
    setResending(true);
    try {
      // You'll need to add resendResetOtp action or reuse resendOtp
      await dispatch(resendOtp(resetEmail)).unwrap();
      dispatch(showToast({ message: t("auth.verify.resendSuccess"), type: "success" }));
    } catch (error) {
      dispatch(showToast({ message: t("auth.verify.error.resendFailed"), type: "error" }));
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout
      type="verify"
      title={t("auth.verify.resetTitle")}
      subtitle={t("auth.verify.resetSubtitle")}
    >
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleVerify}
        className="space-y-8"
      >
        {/* Email Display */}
        <p className="text-center text-gray-300 text-sm">
          {t("auth.verify.sentTo")} <span className="font-medium text-white">{resetEmail}</span>
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`reset-otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center text-xl font-semibold bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
            />
          ))}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            t("auth.verify.submit")
          )}
        </motion.button>

        <div className="text-center text-sm text-gray-400 mt-4">
          {t("auth.verify.resendPrefix")}{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="text-purple-400 hover:text-purple-300 font-medium disabled:opacity-50"
          >
            {resending ? t("auth.verify.resending") : t("auth.verify.resendLink")}
          </button>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-gray-400 hover:text-white text-sm mt-4"
          >
            {t("auth.verify.back")}
          </button>
        </div>
      </motion.form>
    </AuthLayout>
  );
}
