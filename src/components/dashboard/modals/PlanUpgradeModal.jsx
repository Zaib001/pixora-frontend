// src/components/dashboard/modals/PlanUpgradeModal.jsx
import { motion } from "framer-motion";
import { X, Check, Crown, Zap, Star, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/slices/uiSlice";
import { showToast } from "../../../redux/slices/uiSlice";
import { useState } from "react";

export default function PlanUpgradeModal() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [upgradeLoading, setUpgradeLoading] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      credits: 100,
      features: ['5 projects/month', 'Basic templates', '720p exports', 'Community support'],
      icon: Zap,
      current: user?.subscription?.plan === 'basic'
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 29.99,
      credits: 500,
      features: ['50 projects/month', 'All templates', '1080p exports', 'Priority support', 'Custom watermarks'],
      icon: Crown,
      popular: true,
      current: user?.subscription?.plan === 'pro'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99.99,
      credits: 2000,
      features: ['Unlimited projects', 'All templates + future', '4K exports', '24/7 support', 'Custom AI models', 'API access'],
      icon: Star,
      current: user?.subscription?.plan === 'enterprise'
    }
  ];

  const handleUpgrade = async (planId) => {
    setUpgradeLoading(true);
    try {
      // Simulate API call for plan upgrade
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) { // 90% success rate
            resolve();
          } else {
            reject(new Error('Upgrade failed. Please try again.'));
          }
        }, 2000);
      });

      dispatch(showToast({
        message: `Successfully upgraded to ${planId} plan!`,
        type: 'success'
      }));
      dispatch(closeModal('planUpgrade'));
    } catch (error) {
      dispatch(showToast({
        message: error.message,
        type: 'error'
      }));
    } finally {
      setUpgradeLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 border border-white/10 rounded-2xl max-w-4xl w-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white">Upgrade Your Plan</h2>
            <p className="text-gray-400">Unlock more features and higher limits</p>
          </div>
          <button
            onClick={() => dispatch(closeModal('planUpgrade'))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Plans Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative border rounded-xl p-6 transition-all duration-300 ${
                plan.popular 
                  ? 'border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/20' 
                  : plan.current
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </span>
                </div>
              )}

              {plan.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex p-3 rounded-xl ${
                  plan.popular ? 'bg-purple-500/20' : 
                  plan.current ? 'bg-green-500/20' : 'bg-white/10'
                }`}>
                  <plan.icon className={`w-8 h-8 ${
                    plan.popular ? 'text-purple-400' : 
                    plan.current ? 'text-green-400' : 'text-gray-400'
                  }`} />
                </div>
                <h3 className="text-xl font-bold text-white mt-4">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">
                    {plan.price === 0 ? 'forever' : '/month'}
                  </span>
                </div>
                <div className="mt-1 text-purple-400 font-semibold">
                  {plan.credits.toLocaleString()} Credits/mo
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={upgradeLoading || plan.current}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  plan.current
                    ? 'bg-green-600 text-white cursor-default'
                    : plan.popular
                    ? 'bg-purple-600 hover:bg-purple-500 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {plan.current ? (
                  'Current Plan'
                ) : upgradeLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Upgrading...
                  </>
                ) : (
                  'Upgrade Now'
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-white/5">
          <p className="text-center text-gray-400 text-sm">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}