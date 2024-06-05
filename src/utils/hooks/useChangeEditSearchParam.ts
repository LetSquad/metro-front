import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useChangeEditSearchParam() {
    const [searchParams, setSearchParams] = useSearchParams();

    return useCallback(
        (state: boolean) => {
            if (state) {
                searchParams.set("edit", "true");
                setSearchParams(searchParams, { replace: false });
            } else {
                searchParams.delete("edit");
                setSearchParams(searchParams);
            }
        },
        [searchParams, setSearchParams]
    );
}
