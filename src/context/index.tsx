import { ReactNode } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import LoadingProvider from "./LoadingContext"
import ModalProvider from "./ModalContext"

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <SafeAreaProvider>
            <ModalProvider>
                <LoadingProvider>
                    {children}
                </LoadingProvider>
            </ModalProvider>
        </SafeAreaProvider>
    )
}