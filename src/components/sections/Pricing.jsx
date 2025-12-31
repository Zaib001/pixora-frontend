import { motion } from "framer-motion";
import { Check, Star, Zap, Shield, Crown } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";

export default function Pricing() {
  const { t } = useTranslation();
  const plans = [
    {
      name: t("landing.pricing.plans.free.name"),
      price: t("landing.pricing.plans.free.price"),
      period: t("landing.pricing.period"),
      desc: t("landing.pricing.plans.free.desc"),
      features: [
        t("landing.pricing.plans.free.features.f1"),
        t("landing.pricing.plans.free.features.f2"),
        t("landing.pricing.plans.free.features.f3"),
        t("landing.pricing.plans.free.features.f4")
      ],
      button: t("landing.pricing.plans.free.button"),
      popular: false,
      color: "blue",
      icon: Star
    },
    {
      name: t("landing.pricing.plans.pro.name"),
      price: t("landing.pricing.plans.pro.price"),
      period: t("landing.pricing.period"),
      desc: t("landing.pricing.plans.pro.desc"),
      features: [
        t("landing.pricing.plans.pro.features.f1"),
        t("landing.pricing.plans.pro.features.f2"),
        t("landing.pricing.plans.pro.features.f3"),
        t("landing.pricing.plans.pro.features.f4"),
        t("landing.pricing.plans.pro.features.f5")
      ],
      button: t("landing.pricing.plans.pro.button"),
      popular: true,
      color: "purple",
      icon: Zap
    },
    {
      name: t("landing.pricing.plans.enterprise.name"),
      price: t("landing.pricing.plans.enterprise.price"),
      period: t("landing.pricing.period"),
      desc: t("landing.pricing.plans.enterprise.desc"),
      features: [
        t("landing.pricing.plans.enterprise.features.f1"),
        t("landing.pricing.plans.enterprise.features.f2"),
        t("landing.pricing.plans.enterprise.features.f3"),
        t("landing.pricing.plans.enterprise.features.f4"),
        t("landing.pricing.plans.enterprise.features.f5")
      ],
      button: t("landing.pricing.plans.enterprise.button"),
      popular: false,
      color: "indigo",
      icon: Shield
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#0A0A0F]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0A0A0F] to-[#0A0A0F]" />

        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
          >
            <Crown className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">{t("landing.pricing.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {t("landing.pricing.title")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {t("landing.pricing.titleHighlight")}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            {t("landing.pricing.description")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative group rounded-3xl p-8 h-full border transition-all duration-300 ${plan.popular
                  ? "bg-gradient-to-b from-gray-800/80 to-gray-900/80 border-purple-500/50 shadow-2xl shadow-purple-900/20"
                  : "bg-gray-900/40 border-gray-800 hover:border-gray-700 hover:bg-gray-800/60"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      {t("landing.pricing.popularBadge")}
                    </span>
                  </div>
                )}

                <div className={`p-3 rounded-2xl w-fit mb-6 bg-${plan.color}-500/10`}>
                  <Icon className={`w-8 h-8 text-${plan.color}-400`} />
                </div>

                <div className="mb-2">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-400">{plan.period}</span>}
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-8 h-10">{plan.desc}</p>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <div className={`mt-0.5 p-0.5 rounded-full bg-${plan.color}-500/20`}>
                        <Check className={`w-3 h-3 text-${plan.color}-400`} />
                      </div>
                      <span className="flex-1">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${plan.popular
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50"
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    }`}
                >
                  {plan.button}
                </motion.button>

                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-3xl pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center p-1 rounded-full bg-gray-900/50 border border-gray-800 pl-2 pr-6 py-2">
            <div className="flex -space-x-2 mr-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800" />
              ))}
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-medium">
                {t("landing.pricing.joinText")} <span className="text-gray-400">{t("landing.pricing.descriptionEnd")}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}