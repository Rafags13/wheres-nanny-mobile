import { QueryClient, QueryClientProvider } from "react-query";
import StackNavigator from "./StackNavigator";
import CurrentModal from "../components/CurrentModal";
import Spinner from "../components/Spinner";
import messaging from '@react-native-firebase/messaging';
import { useContext, useEffect } from "react";
import { ModalContextType, ModalContext } from "../context/ModalContext";

const queryClient = new QueryClient();

export default function Routes() {
    return (
        <QueryClientProvider client={queryClient}>
            <CurrentModal />
            <Spinner />
            <StackNavigator />
        </QueryClientProvider>
    )
}