import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Users,
    DollarSign,
    CreditCard,
    TrendingUp,
    Activity,
    Zap,
    Crown,
    AlertCircle,
    CheckCircle,
    Clock,
    Shield,
    ArrowUpRight,
    ArrowDownRight,
    HelpCircle,
} from "lucide-react";
import { getDashboardStats, getActivityLogs } from "../../services/adminService";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [statsResponse, activitiesResponse] = await Promise.all([
                getDashboardStats(),
                getActivityLogs({ limit: 10 })
            ]);

            if (statsResponse.success) {
                setStats(statsResponse.data);
            }

            if (activitiesResponse.success) {
                setActivities(activitiesResponse.data.activities);
            }
        } catch (err) {
            console.error("Failed to load dashboard:", err);
            setError(err.message || "Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const statsCards = stats ? [
        {
            title: "Total Users",
            value: stats.users.total,
            change: `+${stats.users.newToday} today`,
            icon: Users,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-500/10",
        },
        {
            title: "Total Revenue",
            value: `$${parseFloat(stats.revenue.total).toLocaleString()}`,
            change: `$${parseFloat(stats.revenue.monthly).toLocaleString()} this month`,
            icon: DollarSign,
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-500/10",
        },
        {
            title: "Active Subscriptions",
            value: stats.subscriptions.active,
            change: "All active",
            icon: Crown,
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-500/10",
        },
        {
            title: "Pending Approvals",
            value: stats.transactions.pending,
            change: stats.transactions.pending > 0 ? "Requires attention" : "All clear",
            icon: AlertCircle,
            color: stats.transactions.pending > 0 ? "from-orange-500 to-red-500" : "from-green-500 to-emerald-500",
            bgColor: stats.transactions.pending > 0 ? "bg-orange-500/10" : "bg-green-500/10",
        },
    ] : [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400 text-lg">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md">
                    <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2 text-center">Error Loading Dashboard</h2>
                    <p className="text-red-300 text-center">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <motion.div
                className="relative z-10 max-w-7xl mx-auto space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-lg shadow-purple-500/25">
                            <Shield size={28} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
                            <p className="text-gray-300 text-lg">System Overview & Management</p>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsCards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="relative group"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`} />
                            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${card.bgColor}`}>
                                        <card.icon size={24} className={`bg-gradient-to-r ${card.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
                                    </div>
                                    <TrendingUp size={16} className="text-green-400" />
                                </div>
                                <p className="text-gray-400 text-sm font-medium mb-1">{card.title}</p>
                                <p className="text-3xl font-bold text-white mb-2">{card.value}</p>
                                <p className="text-sm text-gray-300">{card.change}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Activity */}
                <motion.div variants={itemVariants} className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Activity size={24} className="text-purple-400" />
                            Recent Activity
                        </h2>
                        <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium">
                            View All →
                        </button>
                    </div>

                    <div className="space-y-3">
                        {activities.length > 0 ? (
                            activities.map((activity, index) => (
                                <motion.div
                                    key={activity.id || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${activity.type === 'credit_purchase' ? 'bg-green-500/20' :
                                            activity.type === 'subscription' ? 'bg-purple-500/20' :
                                                'bg-blue-500/20'
                                            }`}>
                                            {activity.type === 'credit_purchase' ? (
                                                <CreditCard size={18} className="text-green-400" />
                                            ) : activity.type === 'subscription' ? (
                                                <Crown size={18} className="text-purple-400" />
                                            ) : (
                                                <Zap size={18} className="text-blue-400" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">
                                                {activity.user?.name || 'User'} - {activity.description || activity.type}
                                            </p>
                                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                                <Clock size={14} />
                                                <span>{new Date(activity.createdAt).toLocaleString()}</span>
                                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activity.status === 'completed' || activity.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                                    activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        activity.status === 'failed' || activity.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                                            'bg-gray-500/20 text-gray-400'
                                                    }`}>
                                                    {activity.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-semibold">
                                            ${activity.amount?.toFixed(2) || '0.00'}
                                        </p>
                                        {activity.creditsAmount > 0 && (
                                            <p className="text-purple-400 text-sm">
                                                +{activity.creditsAmount} credits
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <Activity size={48} className="text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">No recent activity</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.a
                        href="/dashboard/admin/users"
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30 p-6 hover:border-blue-500/50 transition-all duration-300 group"
                    >
                        <Users size={32} className="text-blue-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Manage Users</h3>
                        <p className="text-gray-300 text-sm mb-4">View and manage all users, roles, and permissions</p>
                        <div className="flex items-center text-blue-400 font-medium group-hover:gap-2 transition-all">
                            Go to Users <ArrowUpRight size={16} className="ml-1" />
                        </div>
                    </motion.a>

                    <motion.a
                        href="/dashboard/admin/payments"
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30 p-6 hover:border-green-500/50 transition-all duration-300 group"
                    >
                        <DollarSign size={32} className="text-green-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Payments</h3>
                        <p className="text-gray-300 text-sm mb-4">Review transactions and manage approvals</p>
                        <div className="flex items-center text-green-400 font-medium group-hover:gap-2 transition-all">
                            View Payments <ArrowUpRight size={16} className="ml-1" />
                        </div>
                    </motion.a>

                    <motion.a
                        href="/dashboard/admin/analytics"
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 p-6 hover:border-purple-500/50 transition-all duration-300 group"
                    >
                        <TrendingUp size={32} className="text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
                        <p className="text-gray-300 text-sm mb-4">View detailed reports and insights</p>
                        <div className="flex items-center text-purple-400 font-medium group-hover:gap-2 transition-all">
                            View Analytics <ArrowUpRight size={16} className="ml-1" />
                        </div>
                    </motion.a>

                    <motion.a
                        href="/dashboard/admin/help"
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl border border-orange-500/30 p-6 hover:border-orange-500/50 transition-all duration-300 group"
                    >
                        <HelpCircle size={32} className="text-orange-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Help Content</h3>
                        <p className="text-gray-300 text-sm mb-4">Manage tutorials and FAQs</p>
                        <div className="flex items-center text-orange-400 font-medium group-hover:gap-2 transition-all">
                            Manage Content <ArrowUpRight size={16} className="ml-1" />
                        </div>
                    </motion.a>
                </motion.div>
            </motion.div>
        </div>
    );
}
