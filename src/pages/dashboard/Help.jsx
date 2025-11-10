import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Search, 
  BookOpen, 
  Video, 
  MessageCircle, 
  Mail,
  Zap,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  CreditCard,
  Star,
  Clock
} from "lucide-react";
import CreditsBadge from "../../components/dashboard/CreditsBadge";

const tutorials = [
  {
    id: 1,
    title: "Getting Started with Text to Video",
    description: "Learn how to create stunning videos from text prompts",
    duration: "8:24",
    level: "Beginner",
    thumbnail: "https://picsum.photos/seed/tutorial1/400/225",
    category: "Video AI"
  },
  {
    id: 2,
    title: "Mastering Image to Image Transformations",
    description: "Advanced techniques for image style transfer and enhancement",
    duration: "12:45",
    level: "Intermediate",
    thumbnail: "https://picsum.photos/seed/tutorial2/400/225",
    category: "Image AI"
  },
  {
    id: 3,
    title: "Prompt Engineering Best Practices",
    description: "Write effective prompts for better AI generation results",
    duration: "15:32",
    level: "Advanced",
    thumbnail: "https://picsum.photos/seed/tutorial3/400/225",
    category: "Tips & Tricks"
  },
  {
    id: 4,
    title: "Video Style Customization Guide",
    description: "Customize cinematic styles and motion parameters",
    duration: "10:18",
    level: "Intermediate",
    thumbnail: "https://picsum.photos/seed/tutorial4/400/225",
    category: "Video AI"
  }
];

const faqCategories = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: Sparkles,
    questions: [
      {
        id: 1,
        question: "How do I create my first AI video?",
        answer: "Navigate to the Text to Video generator, enter your prompt, select a style, and click generate. Your video will be ready in 2-5 minutes."
      },
      {
        id: 2,
        question: "What's the difference between credits and subscription?",
        answer: "Credits are pay-as-you-go for individual generations, while subscriptions provide monthly credit allowances and additional features."
      },
      {
        id: 3,
        question: "Can I use generated content commercially?",
        answer: "Yes, all content generated on Pro and Enterprise plans includes commercial usage rights. Free plan content is for personal use only."
      }
    ]
  },
  {
    id: "technical",
    name: "Technical Issues",
    icon: Zap,
    questions: [
      {
        id: 4,
        question: "Why is my generation taking so long?",
        answer: "Video generation typically takes 2-5 minutes depending on length and complexity. High traffic periods may cause additional delays."
      },
      {
        id: 5,
        question: "What video formats are supported?",
        answer: "We support MP4 output with various resolutions up to 4K. Images are generated in PNG and JPEG formats."
      },
      {
        id: 6,
        question: "How do I improve generation quality?",
        answer: "Use detailed prompts, specify styles and lighting, and experiment with different aspect ratios for optimal results."
      }
    ]
  },
  {
    id: "billing",
    name: "Billing & Credits",
    icon: CreditCard,
    questions: [
      {
        id: 7,
        question: "How do credit packs work?",
        answer: "Credit packs are one-time purchases that never expire. Each generation consumes credits based on complexity and duration."
      },
      {
        id: 8,
        question: "Can I get a refund?",
        answer: "We offer refunds for unused credits within 14 days of purchase. Subscription refunds are handled on a case-by-case basis."
      },
      {
        id: 9,
        question: "Do credits roll over?",
        answer: "Subscription credits reset monthly and don't roll over. Purchased credit packs never expire."
      }
    ]
  }
];

const quickLinks = [
  {
    title: "Documentation",
    description: "Complete API and feature documentation",
    icon: BookOpen,
    link: "#",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides",
    icon: Video,
    link: "#",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Community Forum",
    description: "Connect with other creators",
    icon: MessageCircle,
    link: "#",
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "Contact Support",
    description: "Get help from our team",
    icon: Mail,
    link: "#",
    color: "from-orange-500 to-red-600"
  }
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTutorials = tutorials.filter(tutorial => 
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (activeCategory !== "all" && tutorial.category === activeCategory)
  );

  const categories = ["all", ...new Set(tutorials.map(t => t.category))];

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
                <HelpCircle size={28} className="text-white" />
              </div>
              Help & Tutorials
            </h1>
            <p className="text-xl text-gray-300">
              Learn how to make the most of Pixora's AI capabilities
            </p>
          </div>
          <CreditsBadge />
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.title}
                href={link.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 group hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{link.title}</h3>
                <p className="text-gray-400 text-sm">{link.description}</p>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Featured Tutorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Featured Tutorial</h2>
            <div className="flex items-center gap-2 text-purple-400">
              <Star size={18} />
              <span className="text-sm">Recommended</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/featured/600/338" 
                  alt="Featured Tutorial" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <Play size={24} className="text-white ml-1" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Mastering AI Video Generation</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Learn professional techniques for creating cinematic AI videos, from prompt crafting to advanced style customization.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={16} />
                  <span>25 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Zap size={16} />
                  <span>Advanced Level</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Video size={16} />
                  <span>8 lessons</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Sparkles size={16} />
                  <span>Certificate</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full lg:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <Play size={18} />
                Start Watching
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tutorials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">Video Tutorials</h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:bg-white/10 outline-none transition-all duration-300 w-full lg:w-64"
                />
              </div>

              {/* Category Filter */}
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all duration-300"
              >
                <option value="all">All Categories</option>
                {categories.filter(cat => cat !== "all").map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <img 
                    src={tutorial.thumbnail} 
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <div className="flex items-center gap-2 text-white">
                      <Play size={16} />
                      <span className="text-sm">Watch Tutorial</span>
                    </div>
                    <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                      {tutorial.duration}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      tutorial.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      tutorial.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {tutorial.level}
                    </span>
                    <span className="text-gray-400 text-xs">{tutorial.category}</span>
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {tutorial.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + categoryIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center">
                      <Icon size={20} className="text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  </div>

                  <div className="space-y-3">
                    {category.questions.map((faq, faqIndex) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 + categoryIndex * 0.1 + faqIndex * 0.05 }}
                        className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-all duration-300"
                        >
                          <span className="text-white font-medium pr-4">{faq.question}</span>
                          <motion.div
                            animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {expandedFaq === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 border-t border-white/10">
                                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl border border-purple-500/20 p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">Still Need Help?</h3>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Our support team is here to help you get the most out of Pixora
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2"
            >
              <Mail size={18} />
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle size={18} />
              Join Community
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}