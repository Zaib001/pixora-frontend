// src/components/dashboard/ProfileCard.jsx
import { motion } from "framer-motion";
import { User, Mail, Calendar, Edit, MapPin, Globe } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/actions/authActions";

export default function ProfileCard({ user }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    country: user?.country || '',
    language: user?.language || 'en'
  });

  const handleSave = async () => {
    try {
      await dispatch(updateProfile(formData)).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!user) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/10 rounded w-1/2"></div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-white/10 rounded"></div>
              <div className="h-3 bg-white/10 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Profile Overview</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
        >
          <Edit className="w-4 h-4 text-gray-300" />
        </motion.button>
      </div>

      {/* Profile Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-900"></div>
        </div>
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ) : (
            <h4 className="text-white font-semibold text-lg">{user.name}</h4>
          )}
          <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
            <Mail className="w-3 h-3" />
            {user.email}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Member since
          </span>
          <span className="text-white text-sm">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Country
          </span>
          {isEditing ? (
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-24 bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          ) : (
            <span className="text-white text-sm">{user.country || 'Not set'}</span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm flex items-center gap-1">
            <Globe className="w-3 h-3" />
            Language
          </span>
          {isEditing ? (
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          ) : (
            <span className="text-white text-sm capitalize">{user.language || 'en'}</span>
          )}
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-white/10"
        >
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Save Changes
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}