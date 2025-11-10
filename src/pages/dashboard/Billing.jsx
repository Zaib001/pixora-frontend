import { useState } from "react";
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
  Receipt
} from "lucide-react";
import CreditsBadge from "../../components/dashboard/CreditsBadge";

const creditPacks = [
  {
    id: 1,
    credits: 50,
    price: 4.99,
    popular: false,
    savings: 0,
    features: ["Basic generation", "Standard quality", "Email support"],
    gradient: "from-purple-500 to-purple-600"
  },
  {
    id: 2,
    credits: 200,
    price: 17.99,
    popular: true,
    savings: 10,
    features: ["All basic features", "High quality", "Priority support", "Faster processing"],
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    id: 3,
    credits: 1000,
    price: 79.99,
    popular: false,
    savings: 20,
    features: ["All premium features", "Ultra quality", "24/7 support", "Batch processing", "Commercial license"],
    gradient: "from-purple-500 to-violet-600"
  }
];

const subscriptionPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    credits: "10/month",
    features: ["Basic image generation", "Standard quality", "Community support", "Watermarked exports"],
    icon: Sparkles
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    credits: "500/month",
    features: ["All AI tools", "High quality", "Priority support", "No watermarks", "Commercial use"],
    popular: true,
    icon: Crown,
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    credits: "Unlimited",
    features: ["All Pro features", "Ultra quality", "Dedicated support", "Custom models", "API access"],
    icon: Zap,
    gradient: "from-purple-500 to-pink-600"
  }
];

const transactionHistory = [
  { id: 1, date: "2024-01-15", description: "Credits Purchase", amount: "+200", type: "credit", status: "completed" },
  { id: 2, date: "2024-01-14", description: "Video Generation", amount: "-15", type: "debit", status: "completed" },
  { id: 3, date: "2024-01-13", description: "Image Enhancement", amount: "-5", type: "debit", status: "completed" },
  { id: 4, date: "2024-01-12", description: "Credits Purchase", amount: "+50", type: "credit", status: "completed" },
  { id: 5, date: "2024-01-11", description: "Batch Processing", amount: "-25", type: "debit", status: "completed" },
];

export default function Billing() {
  const [selectedTab, setSelectedTab] = useState("credits");
  const [selectedPlan, setSelectedPlan] = useState("pro");

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
              Billing & Credits
            </h1>
            <p className="text-xl text-gray-300">
              Manage your subscription and purchase credits
            </p>
          </div>
          <CreditsBadge />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-2"
        >
          <div className="flex space-x-2">
            {[
              { id: "credits", label: "Buy Credits", icon: Zap },
              { id: "subscription", label: "Subscription", icon: Crown },
              { id: "history", label: "Transaction History", icon: Receipt }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex-1 ${
                    selectedTab === tab.id
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
                  <h2 className="text-2xl font-bold text-white">Credit Packs</h2>
                  <div className="flex items-center gap-2 text-purple-400">
                    <Gift size={18} />
                    <span className="text-sm">Bulk discounts available</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {creditPacks.map((pack, index) => (
                    <motion.div
                      key={pack.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-black/40 backdrop-blur-xl rounded-2xl border-2 p-6 relative overflow-hidden group ${
                        pack.popular 
                          ? "border-purple-500 shadow-lg shadow-purple-500/25" 
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                   

                      {/* Savings Badge */}
                      {pack.savings > 0 && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            Save {pack.savings}%
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
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                          pack.popular
                            ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
                            : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        Purchase Now
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-purple-400" />
                  Payment Methods
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
                    Add Payment Method
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
                      className={`bg-black/40 backdrop-blur-xl rounded-2xl border-2 p-6 relative ${
                        isSelected 
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
                        <div className={`w-16 h-16 ${
                          plan.gradient ? `bg-gradient-to-br ${plan.gradient}` : 'bg-white/5'
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
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                          isSelected
                            ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
                            : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        {isSelected ? "Current Plan" : "Select Plan"}
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
                  <h2 className="text-2xl font-bold text-white">Transaction History</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <Download size={16} />
                    Export CSV
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {transactionHistory.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          transaction.type === 'credit' 
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
                      <span className={`text-lg font-semibold ${
                        transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.amount} credits
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}