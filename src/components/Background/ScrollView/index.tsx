import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "@styles/global.styles";
import { ReactNode, useState } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import styles from "./style";

type Props = {
    children: ReactNode,
    scrollviewRef?: any,
    scrollToTopFunction?: () => void
}

export default function BackgroundScrollView({ children, scrollviewRef, scrollToTopFunction = () => { } }: Props) {
    const navigator = useNavigation();
    const [refresh, setRefresh] = useState(false);

    function onRefresh() {
        setRefresh(true);
        scrollToTopFunction();
        setRefresh(false);
    }

    return (
        <ScrollView style={styles.background}
            ref={scrollviewRef}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
        >
            {children}
        </ScrollView>
    )
}