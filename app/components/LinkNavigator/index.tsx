import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native";
import { TouchableOpacity } from 'react-native';
import { styles } from "./style";

type Props = {
    label: string,
    navigateTo: string
}

export default function LinkNavigator({ label, navigateTo }: Props) {
    const navigator = useNavigation<any>();

    function navigate() {
        navigator.navigate(navigateTo)
    }
    return (
        <Text style={styles.link} onPress={() => navigate()}>
            {label}
        </Text>
    )
}