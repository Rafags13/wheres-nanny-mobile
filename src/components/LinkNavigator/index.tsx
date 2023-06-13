import { useNavigation } from "@react-navigation/native"
import { StyleProp, Text, TextStyle } from "react-native";
import { styles } from "./style";

type Props = {
    label: string,
    navigateTo: string,
    style?: StyleProp<TextStyle>,
    params?: {}
}

export default function LinkNavigator({ label, navigateTo, params, style }: Props) {
    const navigator = useNavigation<any>();

    function navigate() {
        navigator.navigate(navigateTo, params)
    }
    return (
        <Text style={[styles.link, style]} onPress={() => navigate()}>
            {label}
        </Text>
    )
}