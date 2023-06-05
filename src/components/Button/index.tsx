import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { styles } from "./style";

type Props = {
    label: string,
    containerStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    onClick: () => void
}

export default function Button({ label, onClick, containerStyle, textStyle }: Props) {
    return (
        <TouchableOpacity style={[styles.buttonContainer, containerStyle]} onPress={onClick}>
            <Text style={[styles.labelButton, textStyle]}>{label}</Text>
        </TouchableOpacity>
    )
}