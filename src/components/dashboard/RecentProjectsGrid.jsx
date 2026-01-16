import { Play, Image as ImageIcon, Video, Eye, Download, Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serverURL } from "../../api/axios";

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (project.type === 'video' && videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(err => console.log("Hover play blocked", err));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, project.type]);

  const assetUrl = project.url?.startsWith('http') ? project.url : `${serverURL}/${project.url?.replace(/^\//, '')}`;
  const thumbUrl = project.thumbnailUrl?.startsWith('http')
    ? project.thumbnailUrl
    : project.thumbnailUrl
      ? `${serverURL}/${project.thumbnailUrl.replace(/^\//, '')}`
      : assetUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative aspect-video bg-[#0a0a0f] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/40 transition-all duration-500 shadow-2xl"
    >
      {/* Media Background */}
      <div className="absolute inset-0 z-0">
        {project.type === 'video' ? (
          <>
            <video
              ref={videoRef}
              src={assetUrl.includes('#t=') ? assetUrl : `${assetUrl}#t=0.001`}
              poster={thumbUrl}
              muted
              loop
              playsInline
              preload="metadata"
              className={`w-full h-full object-cover transition-transform duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            {!isHovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-80 group-hover:opacity-0 transition-opacity">
                  <Play size={20} fill="currentColor" />
                </div>
              </div>
            )}
          </>
        ) : (
          <img
            src={thumbUrl}
            alt=""
            className={`w-full h-full object-cover transition-transform duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800'; }}
          />
        )}
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
      </div>

      {/* Top Bar - Type Badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/10 ${project.type === 'image' ? 'bg-emerald-500/20' : 'bg-blue-500/20'}`}>
          {project.type}
        </div>
      </div>

      {/* Hover Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent backdrop-blur-[2px]"
          >
            <div className="space-y-3">
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar size={10} className="text-purple-400" />
                  {new Date(project.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </p>
                <h3 className="text-white font-bold text-sm line-clamp-1 leading-tight drop-shadow-lg">
                  {project.prompt || "Untitled Creation"}
                </h3>
              </motion.div>

              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2">
                <button title="Preview" className="flex-1 flex items-center justify-center p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all">
                  <Eye size={16} />
                </button>
                <button title="Download" className="flex-1 flex items-center justify-center p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all">
                  <Download size={16} />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </motion.div>
  );
};

export default function RecentProjectsGrid({ projects = [], loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-video bg-white/5 rounded-2xl animate-pulse border border-white/10" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="relative rounded-3xl p-12 text-center border border-white/10 bg-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-block p-5 rounded-3xl bg-white/5 mb-6 border border-white/10">
            <ImageIcon size={40} className="text-gray-500" />
          </div>
          <p className="text-white font-bold text-lg mb-2">No creations yet</p>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">Your masterpiece is just a prompt away. Let's create something magical!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={project._id} project={project} index={index} />
      ))}
    </div>
  );
}
