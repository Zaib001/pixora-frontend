import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users as UsersIcon,
    Search,
    Filter,
    MoreVertical,
    User,
    Shield,
    Ban,
    CheckCircle,
    X,
    Crown,
    Loader2,
    AlertCircle,
    Mail,
    Calendar,
    Zap,
} from "lucide-react";
import { getAllUsers, getUserById, updateUserRole, toggleUserStatus } from "../../services/adminService";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        loadUsers();
    }, [currentPage, search, roleFilter, statusFilter]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: 20,
                search,
            };

            if (roleFilter) params.role = roleFilter;
            if (statusFilter !== "") params.isActive = statusFilter;

            const response = await getAllUsers(params);
            if (response.success) {
                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.error("Failed to load users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewUser = async (userId) => {
        try {
            setActionLoading(true);
            const response = await getUserById(userId);
            if (response.success) {
                setSelectedUser(response.data);
                setShowUserModal(true);
            }
        } catch (error) {
            console.error("Failed to load user details:", error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleToggleStatus = async (userId, currentStatus) => {
        if (!confirm(`Are you sure you want to ${currentStatus ? 'suspend' : 'activate'} this user?`)) {
            return;
        }

        try {
            setActionLoading(true);
            const response = await toggleUserStatus(userId, !currentStatus);
            if (response.success) {
                loadUsers();
                if (selectedUser && selectedUser.user._id === userId) {
                    setShowUserModal(false);
                }
            }
        } catch (error) {
            console.error("Failed to toggle user status:", error);
            alert("Failed to update user status");
        } finally {
            setActionLoading(false);
        }
    };

    const handleUpdateRole = async (userId, newRole) => {
        if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
            return;
        }

        try {
            setActionLoading(true);
            const response = await updateUserRole(userId, newRole);
            if (response.success) {
                loadUsers();
                if (selectedUser && selectedUser.user._id === userId) {
                    setShowUserModal(false);
                }
            }
        } catch (error) {
            console.error("Failed to update user role:", error);
            alert("Failed to update user role. You might not have permission.");
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg shadow-blue-500/25">
                            <UsersIcon size={28} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">User Management</h1>
                            <p className="text-gray-300 text-lg">Manage users, roles, and permissions</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>

                        {/* Role Filter */}
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                        >
                            <option value="">All Roles</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Super Admin</option>
                        </select>

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                        >
                            <option value="">All Status</option>
                            <option value="true">Active</option>
                            <option value="false">Suspended</option>
                        </select>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 size={48} className="animate-spin text-purple-400" />
                        </div>
                    ) : users.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-white/5 border-b border-white/10">
                                        <tr>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">User</th>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Email</th>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Role</th>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Credits</th>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Plan</th>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <motion.tr
                                                key={user._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                                            <span className="text-white font-semibold">
                                                                {user.name?.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium">{user.name}</p>
                                                            <p className="text-gray-400 text-sm">
                                                                Joined {new Date(user.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-gray-300">{user.email}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'superadmin' ? 'bg-red-500/20 text-red-400' :
                                                        user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                                                            'bg-blue-500/20 text-blue-400'
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1 text-purple-400">
                                                        <Zap size={16} />
                                                        <span className="font-medium">{user.credits}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.subscriptionPlan === 'enterprise' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400' :
                                                        user.subscriptionPlan === 'pro' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400' :
                                                            'bg-gray-500/20 text-gray-400'
                                                        }`}>
                                                        {user.subscriptionPlan || 'free'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                                        }`}>
                                                        {user.isActive ? 'Active' : 'Suspended'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleViewUser(user._id)}
                                                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                                            title="View Details"
                                                        >
                                                            <User size={18} className="text-gray-400 hover:text-white" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleToggleStatus(user._id, user.isActive)}
                                                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                                            title={user.isActive ? "Suspend User" : "Activate User"}
                                                        >
                                                            {user.isActive ? (
                                                                <Ban size={18} className="text-red-400" />
                                                            ) : (
                                                                <CheckCircle size={18} className="text-green-400" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between px-6 py-4 bg-white/5">
                                <p className="text-gray-400 text-sm">
                                    Page {currentPage} of {totalPages}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <UsersIcon size={48} className="text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No users found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* User Details Modal */}
            <AnimatePresence>
                {showUserModal && selectedUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowUserModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                        <span className="text-white font-bold text-2xl">
                                            {selectedUser.user.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{selectedUser.user.name}</h2>
                                        <p className="text-gray-400">{selectedUser.user.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowUserModal(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* User Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-xl p-4">
                                        <p className="text-gray-400 text-sm mb-1">Role</p>
                                        <p className="text-white font-medium">{selectedUser.user.role}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4">
                                        <p className="text-gray-400 text-sm mb-1">Status</p>
                                        <p className={`font-medium ${selectedUser.user.isActive ? 'text-green-400' : 'text-red-400'}`}>
                                            {selectedUser.user.isActive ? 'Active' : 'Suspended'}
                                        </p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4">
                                        <p className="text-gray-400 text-sm mb-1">Credits</p>
                                        <p className="text-purple-400 font-medium">{selectedUser.user.credits}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4">
                                        <p className="text-gray-400 text-sm mb-1">Total Spent</p>
                                        <p className="text-green-400 font-medium">${selectedUser.totalSpent}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleToggleStatus(selectedUser.user._id, selectedUser.user.isActive)}
                                        disabled={actionLoading}
                                        className={`flex-1 py-3 rounded-xl font-medium transition-colors ${selectedUser.user.isActive
                                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                            }`}
                                    >
                                        {selectedUser.user.isActive ? 'Suspend User' : 'Activate User'}
                                    </button>
                                    <select
                                        onChange={(e) => handleUpdateRole(selectedUser.user._id, e.target.value)}
                                        disabled={actionLoading}
                                        defaultValue=""
                                        className="flex-1 px-4 py-3 bg-purple-500/20 border border-purple-500/30 rounded-xl text-white focus:outline-none hover:bg-purple-500/30 transition-colors"
                                    >
                                        <option value="" disabled>Change Role...</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Super Admin</option>
                                    </select>
                                </div>

                                {/* Recent Transactions */}
                                {selectedUser.recentTransactions && selectedUser.recentTransactions.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-3">Recent Transactions</h3>
                                        <div className="space-y-2">
                                            {selectedUser.recentTransactions.slice(0, 5).map((tx, index) => (
                                                <div key={index} className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
                                                    <div>
                                                        <p className="text-white text-sm">{tx.description || tx.type}</p>
                                                        <p className="text-gray-400 text-xs">{new Date(tx.createdAt).toLocaleString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-white font-medium">${tx.amount.toFixed(2)}</p>
                                                        <p className="text-purple-400 text-xs">+{tx.creditsAmount} credits</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
