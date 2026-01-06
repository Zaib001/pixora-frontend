import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Mail,
  ArrowUp,
  Heart
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/pixora", label: "Twitter" },
    { icon: Github, href: "https://github.com/pixora", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/company/pixora", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/pixora", label: "YouTube" },
    { icon: Mail, href: "mailto:hello@pixora.com", label: "Email" }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0A0A0F] to-[#15151F] border-t border-white/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[60px]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Simplified Footer Content */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Link to="/" className="flex items-center gap-3 justify-center mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                Pixora
              </span>
            </Link>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {t("landing.footer.description")}
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>



        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-gray-400 mb-4 md:mb-0"
          >
            <span>© {new Date().getFullYear()} Pixora. {t("landing.footer.madeWith")}</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-400 fill-current" />
            </motion.div>
            <span>{t("landing.footer.forCreators")}</span>
          </motion.div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-6 text-gray-400">
              <Link to="/refund-policy" className="hover:text-white transition-colors duration-200">
                {t("landing.footer.links.refund")}
              </Link>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
