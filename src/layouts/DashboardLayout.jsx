import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import TidioChat from "../components/common/TidioChat";
import { fetchUserProfile } from "../redux/actions/authActions";
import { fetchCredits } from "../redux/actions/creditActions";

export default function DashboardLayout() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            // Centralized profile & credit synchronization
            dispatch(fetchUserProfile());
            dispatch(fetchCredits());
        }
    }, [dispatch, isAuthenticated]);

    return (
        <div className="flex min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
            {/* Modular Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
                {/* Modular Header */}
                <Header />

                {/* Scrollable Main Content */}
                <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative">
                    <div className="p-8 pb-20">
                        <Outlet />
                    </div>
                </main>
            </div>

            <TidioChat />
        </div>
    );
}
