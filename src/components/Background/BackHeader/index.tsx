import { useNavigation } from "@react-navigation/native"
import { globalStyles } from "@styles/global.styles"
import { Text, TouchableOpacity, View } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import styles from "./style";

export default function BackHeader({ title }: { title: string }) {
    const navigator = useNavigation();

    return (
        <View style={styles.backIconContainer}>
            <TouchableOpacity style={styles.backButtonHeader} onPress={() => { navigator.goBack() }}>
                <Entypo name="chevron-small-left" size={32} color={"#c4c4c4"} />
            </TouchableOpacity>

            <View style={styles.absoluteTitle}>
                <Text style={globalStyles.headerTitle}>{title}</Text>
            </View>
        </View>
    )
}