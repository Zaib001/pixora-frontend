import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCredits } from "../redux/actions/creditActions";

/**
 * Custom hook for managing user credits
 * Provides real-time credit balance and auto-refresh functionality
 */
const useCredits = (autoRefresh = false, refreshInterval = 30000) => {
    const dispatch = useDispatch();
    const { credits, loading, error } = useSelector((state) => state.credits);
    const user = useSelector((state) => state.auth.user);

    // Fetch credits on mount
    useEffect(() => {
        if (user) {
            dispatch(fetchCredits());
        }
    }, [dispatch, user]);

    // Auto-refresh credits if enabled
    useEffect(() => {
        if (autoRefresh && user) {
            const interval = setInterval(() => {
                dispatch(fetchCredits());
            }, refreshInterval);

            return () => clearInterval(interval);
        }
    }, [autoRefresh, refreshInterval, dispatch, user]);

    /**
     * Manually refresh credits
     */
    const refreshCredits = () => {
        if (user) {
            dispatch(fetchCredits());
        }
    };

    return {
        credits: credits || user?.credits || 0,
        loading,
        error,
        refreshCredits,
    };
};

export default useCredits;
