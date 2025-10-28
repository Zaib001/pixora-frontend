// pages/Signup.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Check, UserPlus, Github, Twitter } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'One number', met: /[0-9]/.test(formData.password) },
    { text: 'One special character', met: /[!@#$%^&*]/.test(formData.password) },
  ];

  const allRequirementsMet = passwordRequirements.every(req => req.met);
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allRequirementsMet || !passwordsMatch || !formData.agreeToTerms) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Handle signup logic here
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  return (
    <AuthLayout
      type="signup"
      title="Create Account"
      subtitle="Join thousands of creators today"
    >
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Full Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Full Name
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
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Email Address
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
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Password
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
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Password Requirements */}
          {formData.password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 space-y-2"
            >
              {passwordRequirements.map((req, index) => (
                <motion.div
                  key={req.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-2 text-xs ${
                    req.met ? 'text-green-400' : 'text-gray-400'
                  }`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Check className={`w-3 h-3 ${req.met ? 'text-green-400' : 'text-gray-600'}`} />
                  </motion.div>
                  {req.text}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full pl-12 pr-12 py-4 bg-white/5 border ${
                formData.confirmPassword 
                  ? passwordsMatch 
                    ? 'border-green-500/50' 
                    : 'border-red-500/50'
                  : 'border-white/10'
              } rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {formData.confirmPassword && !passwordsMatch && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs mt-2"
            >
              Passwords do not match
            </motion.p>
          )}
        </div>

        {/* Terms Agreement */}
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
              I agree to the{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 underline">
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading || !allRequirementsMet || !passwordsMatch || !formData.agreeToTerms}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              Create Your Account
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
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-transparent text-gray-400">Or sign up with</span>
          </div>
        </div>

        {/* Social Signup */}
        <div className="grid grid-cols-2 gap-3">
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
        </div>
      </motion.form>
    </AuthLayout>
  );
}