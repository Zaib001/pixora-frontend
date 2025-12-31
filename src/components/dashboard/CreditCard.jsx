// src/components/dashboard/CreditCard.jsx
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Coins, Zap, TrendingUp, Plus, Loader } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCredits } from "../../redux/actions/creditActions";
import { openModal } from "../../redux/slices/uiSlice";
import CreditPurchaseModal from "./modals/CreditPurchaseModal";
import PlanUpgradeModal from "./modals/PlanUpgradeModal";

// Mock credit packages data
const CREDIT_PACKAGES = [
  { id: 'starter', name: 'Starter', credits: 100, price: 9.99, popular: false },
  { id: 'pro', name: 'Pro', credits: 500, price: 39.99, popular: true },
  { id: 'premium', name: 'Premium', credits: 1000, price: 69.99, popular: false }
];

export default function CreditCard() {
  const dispatch = useDispatch();
  const { credits, loading } = useSelector((state) => state.credits);
  const uiState = useSelector((state) => state.ui);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Safe access to modals with fallback
  const modals = uiState?.modals || {
    creditPurchase: false,
    planUpgrade: false,
    aiGenerator: false
  };

  const cardVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity
      }
    }
  };

  const handleBuyCredits = () => {
    dispatch(openModal('creditPurchase'));
  };

  const handleUpgradePlan = () => {
    dispatch(openModal('planUpgrade'));
  };

  const handleQuickPurchase = async (packageId) => {
    setPurchaseLoading(true);
    try {
      const packageData = CREDIT_PACKAGES.find(pkg => pkg.id === packageId);
      if (packageData) {
        await dispatch(addCredits({
          amount: packageData.credits,
          packageId: packageData.id,
          price: packageData.price
        })).unwrap();
      }
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setPurchaseLoading(false);
    }
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative overflow-hidden group"
      >
        {/* Animated Background */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="p-8 rounded-3xl shadow-2xl text-white"
        >
          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-4 right-4 opacity-20"
          >
            <Coins className="w-12 h-12 text-yellow-300" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 15, 0],
              x: [0, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute bottom-4 left-4 opacity-20"
          >
            <Zap className="w-8 h-8 text-blue-300" />
          </motion.div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <motion.p 
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: isHovered ? 1 : 0.8 }}
                  className="text-purple-200 font-medium mb-2"
                >
                  Available Balance
                </motion.p>
                <motion.h1 
                  className="text-5xl font-bold mb-2"
                  layout
                >
                  {loading ? (
                    <div className="h-12 w-40 bg-white/20 rounded-lg animate-pulse"></div>
                  ) : (
                    <CountUp 
                      end={credits} 
                      duration={2.5}
                      separator=","
                      className="text-white drop-shadow-lg"
                    />
                  )}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="text-purple-200 text-sm flex items-center gap-1"
                >
                  <TrendingUp className="w-4 h-4" />
                  Updated just now
                </motion.p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30"
              >
                <Coins className="w-8 h-8 text-yellow-300 drop-shadow-lg" />
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div 
              className="flex gap-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={handleBuyCredits}
                disabled={purchaseLoading}
                whileHover={{ scale: purchaseLoading ? 1 : 1.05, y: purchaseLoading ? 0 : -2 }}
                whileTap={{ scale: purchaseLoading ? 1 : 0.95 }}
                className="flex-1 bg-white/20 backdrop-blur-sm py-3 px-4 rounded-xl font-medium hover:bg-white/30 transition-all border border-white/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {purchaseLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Buy Credits
                  </>
                )}
              </motion.button>
              
              <motion.button
                onClick={handleUpgradePlan}
                disabled={purchaseLoading}
                whileHover={{ scale: purchaseLoading ? 1 : 1.05, y: purchaseLoading ? 0 : -2 }}
                whileTap={{ scale: purchaseLoading ? 1 : 0.95 }}
                className="flex-1 bg-yellow-400 text-purple-900 py-3 px-4 rounded-xl font-medium hover:bg-yellow-300 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="w-4 h-4" />
                Upgrade Plan
              </motion.button>
            </motion.div>

            {/* Quick Purchase Options */}
            <motion.div 
              className="mt-4 flex gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {CREDIT_PACKAGES.map((pkg) => (
                <motion.button
                  key={pkg.id}
                  onClick={() => handleQuickPurchase(pkg.id)}
                  disabled={purchaseLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-white/10 py-2 px-3 rounded-lg text-sm font-medium hover:bg-white/20 transition-all border border-white/20 disabled:opacity-50"
                >
                  +{pkg.credits}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Pulse Effect */}
        <motion.div
          variants={pulseVariants}
          animate="pulse"
          className="absolute inset-0 rounded-3xl border-2 border-yellow-400 pointer-events-none"
        />
      </motion.div>

      {/* Conditionally render modals */}
      {modals.creditPurchase && <CreditPurchaseModal />}
      {modals.planUpgrade && <PlanUpgradeModal />}
    </>
  );
}
