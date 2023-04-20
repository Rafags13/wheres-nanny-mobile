import { Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

type Props = {
    label: string,
    onClick: () => void
}

export default function Button({ label, onClick }: Props) {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onClick}>
            <Text style={styles.labelButton}>{label}</Text>
        </TouchableOpacity>
    )
}