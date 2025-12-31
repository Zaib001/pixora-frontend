// src/components/dashboard/modals/CreditPurchaseModal.jsx
import { motion } from "framer-motion";
import { X, Check, Zap, Crown, Star, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/slices/uiSlice";
import { purchaseCreditPackage, addCredits } from "../../../redux/actions/creditActions";

export default function CreditPurchaseModal() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.credits);

  const creditPackages = [
    {
      id: 'starter',
      name: 'Starter Pack',
      credits: 100,
      price: 9.99,
      popular: false,
      features: ['Basic AI generation', 'Standard templates', 'Email support'],
      icon: Zap
    },
    {
      id: 'pro',
      name: 'Pro Pack',
      credits: 500,
      price: 39.99,
      popular: true,
      features: ['Advanced AI generation', 'All templates', 'Priority support', 'HD exports'],
      icon: Crown
    },
    {
      id: 'premium',
      name: 'Premium Pack',
      credits: 1000,
      price: 69.99,
      popular: false,
      features: ['Unlimited generation', 'All templates + future', '24/7 support', '4K exports', 'Custom models'],
      icon: Star
    }
  ];

  const handlePurchase = async (packageId) => {
    try {
      await dispatch(purchaseCreditPackage(packageId)).unwrap();
      dispatch(closeModal('creditPurchase'));
    } catch (error) {
      // Error handled in slice
      console.error('Purchase failed:', error);
    }
  };

  const handleDirectPurchase = async (pkg) => {
    try {
      await dispatch(addCredits({
        amount: pkg.credits,
        packageId: pkg.id,
        price: pkg.price
      })).unwrap();
      dispatch(closeModal('creditPurchase'));
    } catch (error) {
      console.error('Purchase failed:', error);
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
        className="bg-gray-900 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white">Buy Credits</h2>
            <p className="text-gray-400">Choose a package that fits your needs</p>
          </div>
          <button
            onClick={() => dispatch(closeModal('creditPurchase'))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Packages Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {creditPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white/5 border rounded-xl p-6 hover:border-purple-500 transition-all duration-300 ${
                pkg.popular 
                  ? 'border-purple-500 ring-2 ring-purple-500/20' 
                  : 'border-white/10'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex p-3 rounded-xl ${
                  pkg.popular ? 'bg-purple-500/20' : 'bg-white/10'
                }`}>
                  <pkg.icon className={`w-8 h-8 ${
                    pkg.popular ? 'text-purple-400' : 'text-gray-400'
                  }`} />
                </div>
                <h3 className="text-xl font-bold text-white mt-4">{pkg.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-white">${pkg.price}</span>
                  <span className="text-gray-400 ml-2">one-time</span>
                </div>
                <div className="mt-1 text-purple-400 font-semibold">
                  {pkg.credits.toLocaleString()} Credits
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleDirectPurchase(pkg)}
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? 'bg-purple-600 hover:bg-purple-500 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Purchase Now'
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-white/5">
          <p className="text-center text-gray-400 text-sm">
            All packages include 30-day money back guarantee. 
            Need help? <button className="text-purple-400 hover:text-purple-300">Contact support</button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
