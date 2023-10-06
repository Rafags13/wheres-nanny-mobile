import { useAppDispatch, useAppSelector } from "@app/hooks";
import { loadInitialHomeInformation } from "@features/listNanny/listNannySlice";
import { useEffect } from "react";

export default function useHomeInformation() {
    const dispatch = useAppDispatch();
    const isLoadingData = useAppSelector((state) => state.userInformation.statusQuery === 'loading');
    const error = useAppSelector((state) => state.userInformation.error);
    const currentInformation = useAppSelector((state) => state.userInformation.value);
    const nannyList = useAppSelector((state) => state.userInformation.value.nannyListOrderedByFilter);

    useEffect(() => {
        dispatch(loadInitialHomeInformation());
    }, []);

    return { isLoadingData, error, currentInformation, nannyList };
}