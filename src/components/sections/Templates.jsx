import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Templates() {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const categories = [
    t("landing.templates.categories.business"),
    t("landing.templates.categories.marketing"),
    t("landing.templates.categories.corporate"),
    t("landing.templates.categories.creative"),
    t("landing.templates.categories.minimal"),
    t("landing.templates.categories.modern")
  ];

  const templates = Array.from({ length: 6 }).map((_, i) => ({
    img: `https://picsum.photos/400/250?random=${i + 1}`,
    title: `${t("landing.templates.title")} ${i + 1}`,
    category: categories[i],
    likes: Math.floor(Math.random() * 1000) + 100,
    duration: `${Math.floor(Math.random() * 3) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
  }));

  return (
    <section className="py-28 bg-gradient-to-b from-[#0E0E11] to-[#151518] text-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          {t("landing.templates.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">{t("landing.templates.titleHighlight")}</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16">
          {t("landing.templates.description")}
        </p>
      </motion.div>

      {/* Templates Grid */}
      <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
        {templates.map((template, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: i * 0.1,
              duration: 0.6,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-800/50 hover:border-purple-500/30 transition-all duration-500"
          >
            {/* Card Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${hoveredIndex === i ? 'opacity-100' : ''}`} />

            {/* Image Container */}
            <div className="relative overflow-hidden">
              <motion.img
                src={template.img}
                alt={template.title}
                className="w-full h-52 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover Actions */}
              <motion.div
                className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                initial={false}
              >
                <button className="p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-purple-600 transition-colors duration-200">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-blue-600 transition-colors duration-200">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </motion.div>

              {/* Template Info Overlay */}
              <motion.div
                className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                initial={false}
              >
                <div className="flex items-center gap-4 text-sm text-white">
                  <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {template.duration}
                  </span>
                  <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    {template.likes}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Card Content */}
            <div className="relative p-6">
              {/* Category Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300 text-xs font-medium mb-3">
                {template.category}
              </div>

              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                {template.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {t("landing.templates.cardDesc")}
              </p>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                {t("landing.templates.useTemplate")}
              </motion.button>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </motion.div>
        ))}
      </div>

    </section>
  );
}