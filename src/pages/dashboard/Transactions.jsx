import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export default function Transactions() {
  const { transactions, loading } = useSelector((state) => state.credits);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Transaction History
      </motion.h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
          />
        </div>
      ) : transactions && transactions.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
        >
          <table className="min-w-full text-left">
            <thead className="bg-white/10 text-gray-300 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {transactions.map((tx, i) => (
                <motion.tr
                  key={tx.id || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-white/5 transition-all"
                >
                  <td className="px-6 py-4 text-gray-300">
                    {format(new Date(tx.date), "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    {tx.type === "credit" ? (
                      <ArrowUpCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <ArrowDownCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="capitalize">{tx.type}</span>
                  </td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      tx.type === "credit" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {tx.type === "credit" ? "+" : "-"} {tx.amount} credits
                  </td>
                  <td className="px-6 py-4 text-gray-400 capitalize">
                    {tx.status}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400 py-10"
        >
          No transactions found.
        </motion.p>
      )}
    </div>
  );
}
