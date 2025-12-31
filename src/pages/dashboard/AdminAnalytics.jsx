import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Users,
    DollarSign,
    Zap,
    Calendar,
    Loader2,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import {
    getRevenueAnalytics,
    getCreditAnalytics,
    getUserStats,
} from "../../services/adminService";

export default function AdminAnalytics() {
    const [revenueData, setRevenueData] = useState(null);
    const [creditData, setCreditData] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState("30"); // days
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAnalytics();
    }, [dateRange]);

    const loadAnalytics = async () => {
        try {
            setLoading(true);
            setError(null);

            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - parseInt(dateRange));

            const params = {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                groupBy: dateRange === "7" ? "day" : dateRange === "30" ? "day" : "month",
            };

            const [revenueRes, creditRes, userRes] = await Promise.all([
                getRevenueAnalytics(params),
                getCreditAnalytics(params),
                getUserStats(),
            ]);

            if (revenueRes.success) {
                setRevenueData(revenueRes.data);
            }

            if (creditRes.success) {
                setCreditData(creditRes.data);
            }

            if (userRes.success) {
                setUserStats(userRes.data);
            }
        } catch (err) {
            console.error("Failed to load analytics:", err);
            setError(err.message || "Failed to load analytics");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 size={48} className="animate-spin text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Loading analytics...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md">
                    <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2 text-center">Error Loading Analytics</h2>
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

            <div className="relative z-10 max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg shadow-purple-500/25">
                            <TrendingUp size={28} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">Analytics & Reports</h1>
                            <p className="text-gray-300 text-lg">Insights and trends across your platform</p>
                        </div>
                    </div>

                    {/* Date Range Selector */}
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    >
                        <option value="7">Last 7 Days</option>
                        <option value="30">Last 30 Days</option>
                        <option value="90">Last 90 Days</option>
                        <option value="365">Last Year</option>
                    </select>
                </div>

                {/* User Statistics */}
                {userStats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-gray-400 text-sm">Total Users</p>
                                <Users size={20} className="text-blue-400" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{userStats.totalUsers}</p>
                            <div className="flex items-center gap-1 text-green-400 text-sm">
                                <ArrowUpRight size={16} />
                                <span>{userStats.newUsers} new</span>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-gray-400 text-sm">Active Users</p>
                                <Users size={20} className="text-green-400" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{userStats.activeUsers}</p>
                            <p className="text-gray-400 text-sm">
                                {((userStats.activeUsers / userStats.totalUsers) * 100).toFixed(1)}% of total
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-gray-400 text-sm">Verified Users</p>
                                <Users size={20} className="text-purple-400" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{userStats.verifiedUsers}</p>
                            <p className="text-gray-400 text-sm">
                                {((userStats.verifiedUsers / userStats.totalUsers) * 100).toFixed(1)}% verified
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-gray-400 text-sm">Inactive Users</p>
                                <Users size={20} className="text-gray-400" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{userStats.inactiveUsers}</p>
                            <p className="text-gray-400 text-sm">Suspended accounts</p>
                        </motion.div>
                    </div>
                )}

                {/* Revenue Analytics */}
                {revenueData && (
                    <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <DollarSign size={24} className="text-green-400" />
                            Revenue Analytics
                        </h2>

                        {/* Revenue by Type */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {revenueData.revenueByType && revenueData.revenueByType.map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white/5 rounded-xl p-6 border border-white/10"
                                >
                                    <p className="text-gray-400 text-sm mb-2">{item._id.replace('_', ' ')}</p>
                                    <p className="text-2xl font-bold text-white mb-1">${item.revenue.toFixed(2)}</p>
                                    <p className="text-gray-400 text-sm">{item.count} transactions</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Revenue by Subscription Plan */}
                        {revenueData.revenueByPlan && revenueData.revenueByPlan.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Revenue by Subscription Plan</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {revenueData.revenueByPlan.map((plan, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.02 }}
                                            className={`bg-gradient-to-br ${plan._id === 'enterprise' ? 'from-purple-500/20 to-pink-500/20' :
                                                    plan._id === 'pro' ? 'from-blue-500/20 to-cyan-500/20' :
                                                        'from-gray-500/20 to-gray-600/20'
                                                } rounded-xl p-6 border border-white/10`}
                                        >
                                            <p className="text-gray-300 text-sm mb-2 uppercase">{plan._id}</p>
                                            <p className="text-3xl font-bold text-white mb-1">${plan.revenue.toFixed(2)}</p>
                                            <p className="text-gray-400 text-sm">{plan.count} subscriptions</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Credit Analytics */}
                {creditData && (
                    <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Zap size={24} className="text-purple-400" />
                            Credit Analytics
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl p-6 border border-purple-500/30"
                            >
                                <p className="text-gray-300 text-sm mb-2">Total Credits in System</p>
                                <p className="text-3xl font-bold text-white mb-1">{creditData.totalCreditsInSystem?.toLocaleString()}</p>
                                <p className="text-purple-400 text-sm">Available credits</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30"
                            >
                                <p className="text-gray-300 text-sm mb-2">Credits Issued</p>
                                <p className="text-3xl font-bold text-white mb-1">{creditData.creditsIssued?.toLocaleString()}</p>
                                <p className="text-green-400 text-sm">In selected period</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30"
                            >
                                <p className="text-gray-300 text-sm mb-2">Average per User</p>
                                <p className="text-3xl font-bold text-white mb-1">{parseFloat(creditData.avgCreditsPerUser || 0).toFixed(0)}</p>
                                <p className="text-blue-400 text-sm">Credits per user</p>
                            </motion.div>
                        </div>
                    </div>
                )}

                {/* User Distribution */}
                {userStats && userStats.usersByRole && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                            <h3 className="text-xl font-bold text-white mb-6">Users by Role</h3>
                            <div className="space-y-4">
                                {userStats.usersByRole.map((role, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${role._id === 'superadmin' ? 'bg-red-500' :
                                                    role._id === 'admin' ? 'bg-purple-500' :
                                                        'bg-blue-500'
                                                }`} />
                                            <span className="text-gray-300 capitalize">{role._id}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-semibold">{role.count}</p>
                                            <p className="text-gray-400 text-sm">
                                                {((role.count / userStats.totalUsers) * 100).toFixed(1)}%
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                            <h3 className="text-xl font-bold text-white mb-6">Users by Plan</h3>
                            <div className="space-y-4">
                                {userStats.usersByPlan && userStats.usersByPlan.map((plan, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${plan._id === 'enterprise' ? 'bg-purple-500' :
                                                    plan._id === 'pro' ? 'bg-blue-500' :
                                                        'bg-gray-500'
                                                }`} />
                                            <span className="text-gray-300 capitalize">{plan._id}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-semibold">{plan.count}</p>
                                            <p className="text-gray-400 text-sm">
                                                {((plan.count / userStats.totalUsers) * 100).toFixed(1)}%
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
