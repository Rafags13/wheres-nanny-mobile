import { createContext, ReactNode, useContext, useState } from "react";

export type LoadingContextType = {
    isLoading: boolean,
    setLoading: (isLoading: boolean) => void,
}

export const LoadingContext = createContext<LoadingContextType | null>(null);

type Props = {
    children: ReactNode
}

export default function LoadingProvider({ children }: Props) {
    const [isLoading, setIsVisible] = useState<boolean>(false);

    function setLoading(isLoading: boolean) {
        setIsVisible(isLoading);
    }

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>{children}</LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const context = useContext(LoadingContext);

    if (!context)
        throw new Error("useLoading must be used within a LoadingProvider");

    return context;
}