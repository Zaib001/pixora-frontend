// src/components/dashboard/Header.jsx
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    navigate("/login");
  };

  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-600/30 transition flex items-center gap-2"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}
