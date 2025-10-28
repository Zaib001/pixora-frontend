import { motion } from "framer-motion";
import { Check, Star, Zap, Crown, Users, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    originalPrice: "$9",
    desc: "Perfect for creators exploring AI-powered video generation.",
    features: [
      "5 free video generations",
      "50+ Basic templates",
      "720p export quality",
      "Community support",
      "Watermark on exports",
      "1 project at a time"
    ],
    highlight: false,
    popular: false,
    icon: Sparkles,
    buttonText: "Get Started Free",
    color: "from-gray-500 to-gray-600"
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    originalPrice: "$29",
    desc: "Best for freelancers and small brands creating regular content.",
    features: [
      "Unlimited generations",
      "500+ Premium templates",
      "Full HD 1080p exports",
      "Access to all AI models",
      "Priority rendering queue",
      "Email & chat support",
      "No watermark",
      "10 simultaneous projects"
    ],
    highlight: true,
    popular: true,
    icon: Zap,
    buttonText: "Start Free Trial",
    color: "from-purple-500 to-pink-500",
    savings: "35% savings"
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For studios and agencies needing scalability and team tools.",
    features: [
      "4K cinematic generation",
      "Team collaboration dashboard",
      "Dedicated support engineer",
      "Custom branding & templates",
      "API & bulk credit options",
      "White-label solutions",
      "Custom AI model training",
      "Unlimited projects & storage"
    ],
    highlight: false,
    popular: false,
    icon: Crown,
    buttonText: "Contact Sales",
    color: "from-blue-500 to-cyan-500"
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 bg-gradient-to-b from-[#0A0A0F] to-[#15151F] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-sm mb-6"
          >
            <Star className="w-4 h-4 text-purple-300" />
            <span className="text-purple-300 text-sm font-semibold">Transparent Pricing</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Creative Plan</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Start free, scale as you grow. No hidden fees, cancel anytime. 
            <span className="text-purple-300"> Join 50,000+ creators</span> already creating with Pixora.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: i * 0.2,
                duration: 0.7,
                type: "spring",
                stiffness: 80
              }}
              whileHover={{ 
                y: -15,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className={`relative group ${
                plan.highlight ? 'lg:scale-105 lg:-translate-y-4' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 + 0.3 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    MOST POPULAR
                  </div>
                </motion.div>
              )}

              {/* Savings Badge */}
              {plan.savings && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 + 0.4 }}
                  className="absolute -top-4 -right-4 z-20"
                >
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {plan.savings}
                  </div>
                </motion.div>
              )}

              {/* Card Glow Effect */}
              <div className={`absolute -inset-4 bg-gradient-to-r ${plan.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                plan.highlight ? 'opacity-20' : ''
              }`} />

              {/* Main Card */}
              <div className={`relative bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-2xl rounded-3xl border p-8 h-full overflow-hidden transition-all duration-500 ${
                plan.highlight 
                  ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20' 
                  : 'border-gray-700/50 group-hover:border-gray-600/50'
              }`}>
                
                {/* Animated Background Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  initial={false}
                  animate={{ 
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundImage: `radial-gradient(circle at 20% 80%, rgba(128, 118, 244, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
                    backgroundSize: "400% 400%",
                  }}
                />

                {/* Header */}
                <div className="relative z-10 text-center mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="relative z-10 text-center mb-8">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-400 text-lg">{plan.period}</span>}
                  </div>
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-gray-400 text-sm line-through">{plan.originalPrice}</span>
                      <span className="text-green-400 text-sm font-semibold">
                        Save ${parseInt(plan.originalPrice.replace('$', '')) - parseInt(plan.price.replace('$', ''))}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="relative z-10 space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 + j * 0.1 }}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                    plan.highlight
                      ? `bg-gradient-to-r ${plan.color} text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40`
                      : 'bg-white/5 border border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white hover:border-gray-500'
                  }`}
                >
                  {plan.buttonText}
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    className="transition-transform duration-200"
                  >
                    →
                  </motion.span>
                </motion.button>

                {/* Bottom Hover Line */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                    plan.highlight ? 'scale-x-100' : ''
                  }`}
                  initial={false}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}