import { useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ModalContext, ModalContextType } from "../context/ModalContext";
import StackNavigator from "./StackNavigator";
import Modal from 'react-native-modal';
import { Text, View } from "react-native";
import Button from "../components/Button";
import CurrentModal from "../components/CurrentModal";

const queryClient = new QueryClient();

export default function Routes() {
    return (
        <QueryClientProvider client={queryClient}>
            <CurrentModal />
            <StackNavigator />
        </QueryClientProvider>
    )
}