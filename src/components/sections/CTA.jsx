import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { Sparkles, Rocket, Zap, Star, ArrowRight, CheckCircle2, Users } from "lucide-react";

export default function CTA() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const tX = useMotionValue(0);
  const tY = useMotionValue(0);

  useAnimationFrame((t) => {
    const driftX = Math.sin(t / 2500) * 50;
    const driftY = Math.cos(t / 3000) * 40;
    tX.set(driftX);
    tY.set(driftY);
  });

  const gridShift = useTransform([tX, tY], ([x, y]) => `${50 + x / 4}% ${50 + y / 4}%`);

  const floatingStars = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2
  }));

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#0A0A0F] via-[#151523] to-[#0E0E11]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(128, 118, 244, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(128, 118, 244, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: gridShift,
          }}
        />

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/15 rounded-full blur-[120px]"
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
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/15 rounded-full blur-[100px]"
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

        {/* Floating Stars */}
        {floatingStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-2 h-2"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
          >
            <Star className="w-full h-full text-purple-400/60" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-xl mb-8"
        >
          <Sparkles className="w-5 h-5 text-purple-300" />
          <span className="text-purple-300 text-sm font-semibold">{t("landing.cta.badge")}</span>
          <Users className="w-5 h-5 text-blue-300" />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t("landing.cta.title.start")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              {t("landing.cta.title.highlight")}
            </span>
            {t("landing.cta.titleEnd")}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            {t("landing.cta.description")}
          </motion.p>
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {[
            { icon: Zap, text: t("landing.cta.features.noCard") },
            { icon: CheckCircle2, text: t("landing.cta.features.trial") },
            { icon: Rocket, text: t("landing.cta.features.fastStart") }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center gap-3 text-gray-300"
            >
              <feature.icon className="w-5 h-5 text-green-400" />
              <span className="text-lg font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate('/dashboard')}
              label={
                <span className="flex items-center gap-3">
                  <Rocket className="w-5 h-5" />
                  {t("landing.cta.buttons.startTrial")}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200" />
                </span>
              }
              variant="gradient"
              size="large"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate('/dashboard')}
              label={
                <span className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  {t("landing.cta.buttons.watchDemo")}
                </span>
              }
              variant="glass"
              size="large"
            />
          </motion.div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <p className="text-gray-400 text-sm mb-4">{t("landing.cta.trustedBy")}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["TechCrunch", "Forbes", "Adobe", "Microsoft", "Google", "Apple"].map((company, index) => (
              <motion.span
                key={company}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="text-gray-300 font-semibold text-lg"
              >
                {company}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-10 -right-10 opacity-60"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-16 h-16 text-purple-400" />
        </motion.div>
        <motion.div
          className="absolute -bottom-5 -left-5 opacity-40"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap className="w-12 h-12 text-blue-400" />
        </motion.div>
      </div>

      {/* Pulse Ring Effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-purple-400/30 rounded-full"
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </section>
  );
}
