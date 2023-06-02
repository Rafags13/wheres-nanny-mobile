import { createContext, ReactNode, useState } from "react";

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