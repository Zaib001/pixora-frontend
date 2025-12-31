import { Play, Image as ImageIcon, Video } from "lucide-react";

export default function RecentProjectsGrid({ projects = [], loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-white/5 rounded-xl border border-white/10"></div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center border border-white/10 bg-white/5">
        <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
          <ImageIcon size={32} className="text-gray-500" />
        </div>
        <p className="text-gray-400 font-medium">No recent projects yet.</p>
        <p className="text-gray-500 text-sm mt-1">Your generated results will appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project._id}
          className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all duration-300"
        >
          {/* Thumbnail */}
          <div className="relative h-48 overflow-hidden bg-black/50">
            {project.thumbnailUrl ? (
              <img
                src={project.thumbnailUrl}
                alt={project.prompt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                {project.type === 'video' ? <Video /> : <ImageIcon />}
              </div>
            )}

            {/* Type Badge */}
            <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-medium text-white capitalize flex items-center gap-1">
              {project.type === 'video' ? <Video size={12} /> : <ImageIcon size={12} />}
              {project.type}
            </div>

            {/* Play Button Overlay (if video) */}
            {project.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Play size={20} className="text-white ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4 bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
            <p className="text-white font-medium text-sm truncate mb-1">{project.prompt}</p>
            <p className="text-xs text-gray-400">
              {new Date(project.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
