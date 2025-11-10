// src/components/dashboard/CreditsBadge.jsx
import { useSelector } from "react-redux";

export default function CreditsBadge() {
  const { credits } = useSelector((state) => state.credits);

  return (
    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
      Credits: <span className="text-primary font-semibold">{credits}</span>
    </div>
  );
}
