// src/pages/Projects.jsx
import { motion } from "framer-motion";
import { ArrowLeft, Video, Calendar, Download, MoreVertical, Play, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Projects() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Summer Vacation Memories",
      type: "video",
      duration: "2:30",
      status: "completed",
      createdAt: "2024-01-15",
      thumbnail: "🌴",
      credits: 50
    },
    {
      id: 2,
      title: "Business Presentation",
      type: "video",
      duration: "5:15",
      status: "processing",
      createdAt: "2024-01-14",
      thumbnail: "📊",
      credits: 75
    },
    {
      id: 3,
      title: "Product Launch Teaser",
      type: "video",
      duration: "1:45",
      status: "draft",
      createdAt: "2024-01-13",
      thumbnail: "🚀",
      credits: 30
    },
    {
      id: 4,
      title: "Wedding Highlights",
      type: "video",
      duration: "4:20",
      status: "completed",
      createdAt: "2024-01-12",
      thumbnail: "💍",
      credits: 100
    },
    {
      id: 5,
      title: "Tutorial Series Part 1",
      type: "video",
      duration: "8:30",
      status: "completed",
      createdAt: "2024-01-10",
      thumbnail: "🎬",
      credits: 120
    },
    {
      id: 6,
      title: "Social Media Ad",
      type: "video",
      duration: "0:45",
      status: "failed",
      createdAt: "2024-01-09",
      thumbnail: "📱",
      credits: 25
    }
  ];

  const statusColors = {
    completed: "text-green-400 bg-green-400/20",
    processing: "text-yellow-400 bg-yellow-400/20",
    draft: "text-blue-400 bg-blue-400/20",
    failed: "text-red-400 bg-red-400/20"
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </motion.button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">My Projects</h1>
          <p className="text-gray-300">Manage and view your created videos</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/projects/new')}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          New Project
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'completed', 'processing', 'draft', 'failed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
              filter === status
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg hover:border-white/20 transition-all duration-300"
          >
            {/* Thumbnail */}
            <div className="aspect-video bg-white/10 rounded-xl mb-4 flex items-center justify-center text-4xl relative group">
              {project.thumbnail}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
                  <Play className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
                  <Edit className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                <button className="p-1 hover:bg-white/10 rounded">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <Video className="w-4 h-4" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{project.createdAt}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                  {project.status}
                </span>
                <span className="text-gray-400 text-sm">{project.credits} credits</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-sm font-medium">
                  Edit
                </button>
                <button className="flex-1 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors text-white text-sm font-medium flex items-center justify-center gap-1">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
          <p className="text-gray-400 mb-6">No projects match your current filter</p>
          <button
            onClick={() => setFilter('all')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
