import { useCallback } from "react";
import { useLocation } from "react-router-dom";

export function useLocationActive() {
    const location = useLocation();

    return useCallback((path: string) => path === location.pathname, [location.pathname]);
}
