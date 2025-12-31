// src/components/dashboard/TransactionList.jsx
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpCircle, ArrowDownCircle, ExternalLink, Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";

export default function TransactionList({ transactions, loading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = tx.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'all' || tx.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [transactions, searchTerm, filter]);

  if (loading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
        <h3 className="text-lg text-white font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded w-32"></div>
                  <div className="h-3 bg-white/10 rounded w-24"></div>
                </div>
              </div>
              <div className="h-6 bg-white/10 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
    >
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg text-white font-semibold">Recent Transactions</h3>
        
        <div className="flex gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
          
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="all">All</option>
            <option value="purchase">Purchases</option>
            <option value="usage">Usage</option>
            <option value="refund">Refunds</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {filteredTransactions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-3">
              <ArrowUpCircle className="w-12 h-12 mx-auto opacity-50" />
            </div>
            <h3 className="text-white font-semibold mb-2">No transactions found</h3>
            <p className="text-gray-400 text-sm">
              {searchTerm || filter !== 'all' 
                ? "Try adjusting your search or filter" 
                : "Your transaction history will appear here"
              }
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.slice(0, 10).map((tx, i) => (
              <motion.div
                key={tx.id || i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="flex justify-between items-center p-4 rounded-xl transition-all duration-200 cursor-pointer group border border-white/5 hover:border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    tx.type === "purchase" ? "bg-green-500/20" : 
                    tx.type === "refund" ? "bg-blue-500/20" : "bg-red-500/20"
                  }`}>
                    {tx.type === "purchase" ? (
                      <ArrowUpCircle className="w-5 h-5 text-green-400" />
                    ) : tx.type === "refund" ? (
                      <ArrowDownCircle className="w-5 h-5 text-blue-400" />
                    ) : (
                      <ArrowDownCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium group-hover:text-white/90">
                      {tx.description}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(tx.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      tx.type === "purchase" ? "text-green-400" : 
                      tx.type === "refund" ? "text-blue-400" : "text-red-400"
                    }`}
                  >
                    {tx.type === "purchase" ? "+" : tx.type === "refund" ? "+" : "-"} 
                    {tx.amount}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">{tx.type}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* View All Button */}
      {filteredTransactions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <button className="w-full text-center text-purple-400 hover:text-purple-300 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
            View All Transactions
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
