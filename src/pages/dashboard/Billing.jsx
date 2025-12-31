import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Zap,
  Sparkles,
  Crown,
  Check,
  Star,
  Gift,
  Shield,
  Clock,
  Download,
  Receipt,
  Loader2,
  AlertCircle,
  CheckCircle,
  Calendar,
  TrendingUp,
  ChartNoAxesColumnDecreasing
} from "lucide-react";
import { useTranslation } from "react-i18next";
import CreditsBadge from "../../components/dashboard/CreditsBadge";
import {
  initiateCreditPurchase,
  initiateSubscription,
  getUserTransactions,
  getUserSubscription
} from "../../services/paymentService";
import { syncCreditsAfterPayment } from "../../redux/actions/creditActions";
import { fetchUserProfile } from "../../redux/actions/authActions";
import useCredits from "../../hooks/useCredits";

// Transaction history mock data moved inside or kept static if acceptable (descriptions are English though)
const transactionHistory = [
  { id: 1, date: "2024-01-15", description: "Credits Purchase", amount: "+200", type: "credit", status: "completed" },
  { id: 2, date: "2024-01-14", description: "Video Generation", amount: "-15", type: "debit", status: "completed" },
  { id: 3, date: "2024-01-13", description: "Image Enhancement", amount: "-5", type: "debit", status: "completed" },
  { id: 4, date: "2024-01-12", description: "Credits Purchase", amount: "+50", type: "credit", status: "completed" },
  { id: 5, date: "2024-01-11", description: "Batch Processing", amount: "-25", type: "debit", status: "completed" },
];

export default function Billing() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const creditPacks = [
    {
      id: 1,
      credits: 50,
      price: 4.99,
      popular: false,
      savings: 0,
      features: t("dashboard.billing.credits.packs.basic.features", { returnObjects: true }),
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 2,
      credits: 200,
      price: 17.99,
      popular: true,
      savings: 10,
      features: t("dashboard.billing.credits.packs.pro.features", { returnObjects: true }),
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      id: 3,
      credits: 1000,
      price: 79.99,
      popular: false,
      savings: 20,
      features: t("dashboard.billing.credits.packs.ultra.features", { returnObjects: true }),
      gradient: "from-purple-500 to-violet-600"
    }
  ];

  const subscriptionPlans = [
    {
      id: "free",
      name: t("landing.pricing.plans.free.name"),
      price: 0,
      credits: t("landing.pricing.plans.free.credits"),
      features: [
        t("landing.pricing.plans.free.features.f1"),
        t("landing.pricing.plans.free.features.f2"),
        t("landing.pricing.plans.free.features.f3"),
        t("landing.pricing.plans.free.features.f4")
      ],
      icon: Sparkles
    },
    {
      id: "pro",
      name: t("landing.pricing.plans.pro.name"),
      price: 19,
      credits: t("landing.pricing.plans.pro.credits"),
      features: [
        t("landing.pricing.plans.pro.features.f1"),
        t("landing.pricing.plans.pro.features.f2"),
        t("landing.pricing.plans.pro.features.f3"),
        t("landing.pricing.plans.pro.features.f4"),
        t("landing.pricing.plans.pro.features.f5")
      ],
      popular: true,
      icon: Crown,
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      id: "enterprise",
      name: t("landing.pricing.plans.enterprise.name"),
      price: 99,
      credits: t("landing.pricing.plans.enterprise.credits"),
      features: [
        t("landing.pricing.plans.enterprise.features.f1"),
        t("landing.pricing.plans.enterprise.features.f2"),
        t("landing.pricing.plans.enterprise.features.f3"),
        t("landing.pricing.plans.enterprise.features.f4"),
        t("landing.pricing.plans.enterprise.features.f5")
      ],
      icon: Zap,
      gradient: "from-purple-500 to-pink-600"
    }
  ];
  const location = useLocation();
  const { refreshCredits } = useCredits(true, 30000);
  const { user } = useSelector((state) => state.auth);

  const [selectedTab, setSelectedTab] = useState("credits");
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [loading, setLoading] = useState(false);
  const [processingPackId, setProcessingPackId] = useState(null);
  const [processingPlanId, setProcessingPlanId] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [realTransactions, setRealTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loadingSubscription, setLoadingSubscription] = useState(false);

  // Check for payment success in URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get('success');
    const sessionId = params.get('session_id');
    const subscriptionSuccess = params.get('subscription');

    if (success === 'true' && sessionId) {
      // Payment successful - sync credits
      handlePaymentSuccess();
      // Clean up URL
      window.history.replaceState({}, document.title, '/dashboard/billing');
    } else if (subscriptionSuccess === 'success') {
      setSuccessMessage(t("dashboard.billing.subscriptionActive"));
      refreshCredits();
      window.history.replaceState({}, document.title, '/dashboard/billing');
    } else if (params.get('canceled') === 'true' || subscriptionSuccess === 'canceled') {
      setError(t("dashboard.billing.error") + " - Canceled");
      window.history.replaceState({}, document.title, '/dashboard/billing');
    }
  }, [location.search]);

  // Fetch user profile on mount if not already loaded
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  // Handle payment success
  const handlePaymentSuccess = async () => {
    try {
      setSuccessMessage("Payment successful! Your credits are being updated...");
      await dispatch(syncCreditsAfterPayment()).unwrap();
      setSuccessMessage(t("dashboard.billing.creditsAdded"));
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      console.error("Failed to sync credits:", err);
      setError("Payment successful, but failed to update credits. Please refresh the page.");
    }
  };

  // Load user's actual transactions when history tab is selected
  useEffect(() => {
    if (selectedTab === "history") {
      loadTransactions();
    }
  }, [selectedTab]);

  // Load user's subscription when subscription tab is selected
  useEffect(() => {
    if (selectedTab === "subscription") {
      loadSubscription();
    }
  }, [selectedTab]);

  // Set selected plan based on user's current subscription
  useEffect(() => {
    if (user?.subscriptionPlan) {
      setSelectedPlan(user.subscriptionPlan);
    }
  }, [user]);

  const loadTransactions = async () => {
    try {
      setLoadingTransactions(true);
      const response = await getUserTransactions({ limit: 20 });
      if (response.success && response.data.transactions) {
        setRealTransactions(response.data.transactions);
      }
    } catch (err) {
      console.error("Failed to load transactions:", err);
      // If API fails, keep showing mock data
    } finally {
      setLoadingTransactions(false);
    }
  };

  const loadSubscription = async () => {
    try {
      setLoadingSubscription(true);
      const response = await getUserSubscription();
      if (response.success && response.data) {
        setCurrentSubscription(response.data);
      }
    } catch (err) {
      console.error("Failed to load subscription:", err);
      // If API fails, use user data from auth state
    } finally {
      setLoadingSubscription(false);
    }
  };

  // Handle credit purchase
  const handlePurchaseCredits = async (packId) => {
    try {
      setError(null);
      setProcessingPackId(packId);
      await initiateCreditPurchase(packId);
      // User will be redirected to Stripe Checkout
    } catch (err) {
      console.error("Purchase error:", err);
      setError(err.message || "Failed to initiate payment. Please try again.");
      setProcessingPackId(null);
    }
  };

  // Handle subscription purchase
  const handleSubscribe = async (planId) => {
    if (planId === "free") {
      return; // Free plan doesn't need payment
    }

    try {
      setError(null);
      setProcessingPlanId(planId);
      await initiateSubscription(planId);
      // User will be redirected to Stripe Checkout
    } catch (err) {
      console.error("Subscription error:", err);
      setError(err.message || "Failed to initiate subscription. Please try again.");
      setProcessingPlanId(null);
    }
  };

  return (
    <div className="min-h-screen  p-8">

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-500/25">
                <CreditCard size={28} className="text-white" />
              </div>
              {t("dashboard.billing.title")}
            </h1>
            <p className="text-xl text-gray-300">
              {t("dashboard.billing.subtitle")}
            </p>
          </div>
          <CreditsBadge />
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3"
          >
            <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-400 font-medium">{t("dashboard.billing.error")}</p>
              <p className="text-red-300 text-sm mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <span className="text-lg">×</span>
            </button>
          </motion.div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3"
          >
            <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-green-400 font-medium">{t("dashboard.billing.success")}</p>
              <p className="text-green-300 text-sm mt-1">{successMessage}</p>
            </div>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              <span className="text-lg">×</span>
            </button>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-2"
        >
          <div className="flex space-x-2">
            {[
              { id: "credits", label: t("dashboard.billing.tabs.credits"), icon: Zap },
              { id: "subscription", label: t("dashboard.billing.tabs.subscription"), icon: Crown },
              { id: "history", label: t("dashboard.billing.tabs.history"), icon: Receipt }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex-1 ${selectedTab === tab.id
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Credits Tab */}
          {selectedTab === "credits" && (
            <motion.div
              key="credits"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Credit Packs */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">{t("dashboard.billing.credits.title")}</h2>
                  <div className="flex items-center gap-2 text-purple-400">
                    <Gift size={18} />
                    <span className="text-sm">{t("dashboard.billing.credits.discount")}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {creditPacks.map((pack, index) => (
                    <motion.div
                      key={pack.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-black/40 backdrop-blur-xl rounded-2xl border-2 p-6 relative overflow-hidden group ${pack.popular
                        ? "border-purple-500 shadow-lg shadow-purple-500/25"
                        : "border-white/10 hover:border-white/20"
                        }`}
                    >


                      {/* Savings Badge */}
                      {pack.savings > 0 && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            {t("dashboard.billing.credits.save")} {pack.savings}%
                          </div>
                        </div>
                      )}

                      <div className="text-center mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${pack.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                          <Zap size={24} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{pack.credits} Credits</h3>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-3xl font-bold text-white">${pack.price}</span>
                          {pack.savings > 0 && (
                            <span className="text-gray-400 line-through text-sm">
                              ${(pack.price / (1 - pack.savings / 100)).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {pack.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                            <Check size={16} className="text-green-400 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePurchaseCredits(pack.id)}
                        disabled={processingPackId === pack.id}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${pack.popular
                          ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
                          : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                          } ${processingPackId === pack.id ? "opacity-70 cursor-not-allowed" : ""}`}
                      >
                        {processingPackId === pack.id ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            {t("dashboard.billing.credits.processing")}
                          </>
                        ) : (
                          t("dashboard.billing.credits.purchase")
                        )}
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-purple-400" />
                  {t("dashboard.billing.credits.paymentMethods")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Visa ending in 4242</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 text-sm">Default</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">Expires 12/2025</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <CreditCard size={20} />
                    {t("dashboard.billing.credits.addPayment")}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Subscription Tab */}
          {selectedTab === "subscription" && (
            <motion.div
              key="subscription"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Current Subscription Display */}
              {user && user.subscriptionPlan && user.subscriptionStatus === 'active' && user.subscriptionPlan !== 'free' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 shadow-lg shadow-purple-500/10"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
                        <Crown size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{t("dashboard.billing.subscription.current")}</h3>
                        <p className="text-purple-300">{t("dashboard.billing.subscription.active")}</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
                      <span className="text-green-400 font-semibold text-sm flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Plan Name */}
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                        <Star size={16} />
                        <span>Plan</span>
                      </div>
                      <p className="text-2xl font-bold text-white capitalize">{user.subscriptionPlan}</p>
                    </div>

                    {/* Monthly Credits */}
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                        <Zap size={16} />
                        <span>Monthly Credits</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-400">
                        {subscriptionPlans.find(p => p.id === user.subscriptionPlan)?.credits || 'N/A'}
                      </p>
                    </div>

                    {/* Renewal Date */}
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                        <Calendar size={16} />
                        <span>{t("dashboard.billing.subscription.renews")}</span>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {user.subscriptionEndsAt
                          ? new Date(user.subscriptionEndsAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : 'N/A'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Plan Features */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp size={18} className="text-purple-400" />
                      {t("dashboard.billing.subscription.includes")}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {subscriptionPlans.find(p => p.id === user.subscriptionPlan)?.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                          <Check size={16} className="text-green-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Subscription Plans Title */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {user && user.subscriptionPlan && user.subscriptionStatus === 'active' && user.subscriptionPlan !== 'free'
                    ? t("dashboard.billing.subscription.upgrade")
                    : t("dashboard.billing.subscription.choose")
                  }
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan, index) => {
                  const Icon = plan.icon;
                  const isSelected = selectedPlan === plan.id;
                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-black/40 backdrop-blur-xl rounded-2xl border-2 p-6 relative ${isSelected
                        ? "border-purple-500 shadow-lg shadow-purple-500/25"
                        : "border-white/10 hover:border-white/20"
                        }`}
                    >
                      {/* Popular Badge */}
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm px-4 py-1 rounded-full">
                            Recommended
                          </div>
                        </div>
                      )}

                      <div className="text-center mb-6">
                        <div className={`w-16 h-16 ${plan.gradient ? `bg-gradient-to-br ${plan.gradient}` : 'bg-white/5'
                          } rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                          <Icon size={24} className={plan.gradient ? "text-white" : "text-gray-400"} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-3xl font-bold text-white">${plan.price}</span>
                          <span className="text-gray-400">/month</span>
                        </div>
                        <p className="text-purple-400 text-sm mt-1">{plan.credits} included</p>
                      </div>

                      <div className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                            <Check size={16} className="text-green-400 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (plan.id !== "free" && !isSelected) {
                            handleSubscribe(plan.id);
                          } else {
                            setSelectedPlan(plan.id);
                          }
                        }}
                        disabled={processingPlanId === plan.id}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isSelected
                          ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
                          : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                          } ${processingPlanId === plan.id ? "opacity-70 cursor-not-allowed" : ""}`}
                      >
                        {processingPlanId === plan.id ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Processing...
                          </>
                        ) : (
                          isSelected ? t("dashboard.billing.subscription.selected") : t("dashboard.billing.subscription.select")
                        )}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Transaction History Tab */}
          {selectedTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">{t("dashboard.billing.history.title")}</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <Download size={16} />
                    {t("landing.billing.history.export")}
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {loadingTransactions ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 size={32} className="animate-spin text-purple-400" />
                    </div>
                  ) : (
                    (realTransactions.length > 0 ? realTransactions : transactionHistory).map((transaction, index) => (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${transaction.type === 'credit'
                            ? 'bg-green-500/20'
                            : 'bg-purple-500/20'
                            }`}>
                            {transaction.type === 'credit' ? (
                              <CreditCard size={18} className="text-green-400" />
                            ) : (
                              <Zap size={18} className="text-purple-400" />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium">{transaction.description}</p>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                              <Clock size={14} />
                              <span>{transaction.date}</span>
                              <span className="text-green-400 text-xs">• {transaction.status}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`text-lg font-semibold ${transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'
                          }`}>
                          {transaction.amount} credits
                        </span>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
