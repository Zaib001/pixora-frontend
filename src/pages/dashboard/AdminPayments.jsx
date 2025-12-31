import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    DollarSign,
    CreditCard,
    AlertCircle,
    CheckCircle,
    XCircle,
    Clock,
    Filter,
    Download,
    Loader2,
    User,
    Calendar,
    Zap,
} from "lucide-react";
import {
    getAllTransactions,
    getPendingTransactions,
    getTransactionStats,
} from "../../services/paymentService";
import {
    approveTransaction,
    rejectTransaction,
} from "../../services/paymentService";
import { refundTransaction } from "../../services/paymentService";

export default function AdminPayments() {
    const [transactions, setTransactions] = useState([]);
    const [pendingTransactions, setPendingTransactions] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [actionLoading, setActionLoading] = useState(null);
    const [statusFilter, setStatusFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (selectedTab === "all") {
            loadTransactions();
        }
    }, [currentPage, statusFilter, typeFilter]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [statsRes, pendingRes] = await Promise.all([
                getTransactionStats(),
                getPendingTransactions(),
            ]);

            if (statsRes.success) {
                setStats(statsRes.data);
            }

            if (pendingRes.success) {
                setPendingTransactions(pendingRes.data.transactions);
            }

            await loadTransactions();
        } catch (error) {
            console.error("Failed to load data:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadTransactions = async () => {
        try {
            const params = {
                page: currentPage,
                limit: 20,
            };

            if (statusFilter) params.status = statusFilter;
            if (typeFilter) params.type = typeFilter;

            const response = await getAllTransactions(params);
            if (response.success) {
                setTransactions(response.data.transactions);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.error("Failed to load transactions:", error);
        }
    };

    const handleApprove = async (transactionId) => {
        if (!confirm("Are you sure you want to approve this transaction?")) {
            return;
        }

        try {
            setActionLoading(transactionId);
            const response = await approveTransaction(transactionId);
            if (response.success) {
                loadData();
            }
        } catch (error) {
            console.error("Failed to approve transaction:", error);
            alert("Failed to approve transaction");
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (transactionId) => {
        const reason = prompt("Enter rejection reason:");
        if (!reason) return;

        try {
            setActionLoading(transactionId);
            const response = await rejectTransaction(transactionId, reason);
            if (response.success) {
                loadData();
            }
        } catch (error) {
            console.error("Failed to reject transaction:", error);
            alert("Failed to reject transaction");
        } finally {
            setActionLoading(null);
        }
    };

    const handleRefund = async (transactionId) => {
        if (!window.confirm("Are you sure you want to refund this transaction? This will process a Stripe refund and deduct credits from the user.")) {
            return;
        }

        const reason = window.prompt("Please enter a reason for this refund:");
        if (reason === null) return; // Cancelled

        try {
            setActionLoading(transactionId);
            const response = await refundTransaction(transactionId, reason);
            if (response.success) {
                alert("Transaction refunded successfully");
                loadData();
            }
        } catch (error) {
            console.error("Failed to refund transaction:", error);
            alert("Failed to refund transaction: " + (error.response?.data?.message || error.message));
        } finally {
            setActionLoading(null);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
            case "approved":
                return "bg-green-500/20 text-green-400";
            case "pending":
                return "bg-yellow-500/20 text-yellow-400";
            case "failed":
            case "rejected":
                return "bg-red-500/20 text-red-400";
            default:
                return "bg-gray-500/20 text-gray-400";
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case "credit_purchase":
                return <CreditCard size={18} className="text-green-400" />;
            case "subscription":
                return <Zap size={18} className="text-purple-400" />;
            case "refund":
                return <XCircle size={18} className="text-red-400" />;
            default:
                return <DollarSign size={18} className="text-blue-400" />;
        }
    };

    return (
        <div className="min-h-screen p-8">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg shadow-green-500/25">
                            <DollarSign size={28} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">Payment Management</h1>
                            <p className="text-gray-300 text-lg">Monitor transactions and manage approvals</p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-gray-400 text-sm">Total Revenue</p>
                                <DollarSign size={20} className="text-green-400" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">${stats.totalRevenue}</p>
                            <p className="text-green-400 text-sm">All time</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-gray-400 text-sm">Total Transactions</p>
                                <CreditCard size={20} className="text-blue-400" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{stats.totalTransactions}</p>
                            <p className="text-gray-400 text-sm">Processed</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-gray-400 text-sm">Credits Issued</p>
                                <Zap size={20} className="text-purple-400" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{stats.totalCreditsIssued}</p>
                            <p className="text-purple-400 text-sm">Total credits</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-gray-400 text-sm">Pending Approvals</p>
                                <AlertCircle size={20} className={stats.pendingApprovals > 0 ? "text-yellow-400" : "text-green-400"} />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{stats.pendingApprovals}</p>
                            <p className={`text-sm ${stats.pendingApprovals > 0 ? "text-yellow-400" : "text-green-400"}`}>
                                {stats.pendingApprovals > 0 ? "Needs review" : "All clear"}
                            </p>
                        </motion.div>
                    </div>
                )}

                {/* Tabs */}
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-2">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setSelectedTab("pending")}
                            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${selectedTab === "pending"
                                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            Pending ({pendingTransactions.length})
                        </button>
                        <button
                            onClick={() => setSelectedTab("all")}
                            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${selectedTab === "all"
                                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            All Transactions
                        </button>
                    </div>
                </div>

                {/* Filters (for All Transactions tab) */}
                {selectedTab === "all" && (
                    <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                            >
                                <option value="">All Status</option>
                                <option value="completed">Completed</option>
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                                <option value="rejected">Rejected</option>
                            </select>

                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                            >
                                <option value="">All Types</option>
                                <option value="credit_purchase">Credit Purchase</option>
                                <option value="subscription">Subscription</option>
                                <option value="refund">Refund</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Transactions List */}
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 size={48} className="animate-spin text-purple-400" />
                        </div>
                    ) : (
                        <>
                            {selectedTab === "pending" ? (
                                pendingTransactions.length > 0 ? (
                                    <div className="divide-y divide-white/5">
                                        {pendingTransactions.map((tx, index) => (
                                            <motion.div
                                                key={tx.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="p-6 hover:bg-white/5 transition-colors"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4 flex-1">
                                                        <div className="p-3 bg-yellow-500/20 rounded-xl">
                                                            {getTypeIcon(tx.type)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-1">
                                                                <p className="text-white font-medium">{tx.user?.name}</p>
                                                                <span className="text-gray-400 text-sm">({tx.user?.email})</span>
                                                            </div>
                                                            <p className="text-gray-400 text-sm mb-1">
                                                                {tx.description || tx.type}
                                                            </p>
                                                            <div className="flex items-center gap-4 text-sm">
                                                                <span className="text-gray-500">
                                                                    <Clock size={14} className="inline mr-1" />
                                                                    {formatDate(tx.createdAt)}
                                                                </span>
                                                                {tx.creditsAmount > 0 && (
                                                                    <span className="text-purple-400">
                                                                        <Zap size={14} className="inline mr-1" />
                                                                        {tx.creditsAmount} credits
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="text-right mr-6">
                                                            <p className="text-2xl font-bold text-white">
                                                                ${tx.amount.toFixed(2)}
                                                            </p>
                                                            <p className="text-gray-400 text-sm">{tx.currency.toUpperCase()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleApprove(tx.id)}
                                                            disabled={actionLoading === tx.id}
                                                            className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors disabled:opacity-50 flex items-center gap-2"
                                                        >
                                                            <CheckCircle size={18} />
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(tx.id)}
                                                            disabled={actionLoading === tx.id}
                                                            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50 flex items-center gap-2"
                                                        >
                                                            <XCircle size={18} />
                                                            Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20">
                                        <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                                        <p className="text-gray-400">No pending transactions</p>
                                    </div>
                                )
                            ) : (
                                <>
                                    {transactions.length > 0 ? (
                                        <>
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead className="bg-white/5 border-b border-white/10">
                                                        <tr>
                                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">User</th>
                                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Type</th>
                                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Amount</th>
                                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Credits</th>
                                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
                                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {transactions.map((tx, index) => (
                                                            <motion.tr
                                                                key={tx.id}
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ delay: index * 0.02 }}
                                                                className="border-b border-white/5 hover:bg-white/5"
                                                            >
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                                                            <span className="text-white text-xs font-semibold">
                                                                                {tx.user?.name?.charAt(0).toUpperCase()}
                                                                            </span>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-white text-sm">{tx.user?.name}</p>
                                                                            <p className="text-gray-400 text-xs">{tx.user?.email}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-2">
                                                                        {getTypeIcon(tx.type)}
                                                                        <span className="text-gray-300 text-sm">{tx.type.replace('_', ' ')}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p className="text-white font-medium">${tx.amount.toFixed(2)}</p>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p className="text-purple-400">{tx.creditsAmount}</p>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                                                                        {tx.status}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p className="text-gray-400 text-sm">{formatDate(tx.createdAt)}</p>
                                                                    {/* Add Refund Action */}
                                                                    {tx.status === 'completed' && (
                                                                        <button
                                                                            onClick={() => handleRefund(tx.id)}
                                                                            disabled={actionLoading === tx.id}
                                                                            className="mt-2 text-xs text-red-400 hover:text-red-300 hover:underline disabled:opacity-50"
                                                                        >
                                                                            Refund
                                                                        </button>
                                                                    )}
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
                                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 hover:bg-white/10"
                                                    >
                                                        Previous
                                                    </button>
                                                    <button
                                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                        disabled={currentPage === totalPages}
                                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 hover:bg-white/10"
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-20">
                                            <DollarSign size={48} className="text-gray-600 mx-auto mb-4" />
                                            <p className="text-gray-400">No transactions found</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
