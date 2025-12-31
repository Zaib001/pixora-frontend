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

  const footerSections = [
    {
      title: t("landing.footer.product"),
      links: [
        { name: t("landing.footer.links.features"), href: "/features" },
        { name: t("landing.footer.links.templates"), href: "/templates" },
        { name: t("landing.footer.links.pricing"), href: "/pricing" },
        { name: t("landing.footer.links.useCases"), href: "/use-cases" },
        { name: t("landing.footer.links.apiDocs"), href: "/docs" }
      ]
    },
    {
      title: t("landing.footer.resources"),
      links: [
        { name: t("landing.footer.links.docs"), href: "/docs" },
        { name: t("landing.footer.links.helpCenter"), href: "/help" },
        { name: t("landing.footer.links.blog"), href: "/blog" },
        { name: t("landing.footer.links.community"), href: "/community" },
        { name: t("landing.footer.links.tutorials"), href: "/tutorials" }
      ]
    },
    {
      title: t("landing.footer.company"),
      links: [
        { name: t("landing.footer.links.about"), href: "/about" },
        { name: t("landing.footer.links.careers"), href: "/careers" },
        { name: t("landing.footer.links.contact"), href: "/contact" },
        { name: t("landing.footer.links.press"), href: "/press" },
        { name: t("landing.footer.links.legal"), href: "/legal" }
      ]
    }
  ];

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
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <Link to="/" className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                Pixora
              </span>
            </Link>

            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              {t("landing.footer.description")}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
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
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <h3 className="text-white font-semibold mb-6 text-lg">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                    >
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8 mb-12"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">
                {t("landing.footer.stayInLoop")}
              </h3>
              <p className="text-gray-400">
                {t("landing.footer.updates")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-md">
              <input
                type="email"
                placeholder={t("landing.footer.emailPlaceholder")}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/25 whitespace-nowrap"
              >
                {t("landing.footer.subscribe")}
              </motion.button>
            </div>
          </div>
        </motion.div>

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
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 text-gray-400"
            >
              <Link to="/privacy" className="hover:text-white transition-colors duration-200">
                {t("landing.footer.links.privacy")}
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors duration-200">
                {t("landing.footer.links.terms")}
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors duration-200">
                {t("landing.footer.links.cookies")}
              </Link>
            </motion.div>

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
