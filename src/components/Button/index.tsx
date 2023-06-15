import { ReactNode } from "react";
import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { styles } from "./style";

type Props = {
    label: string,
    containerStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    icon?: ReactNode
    onClick: () => void
}

export default function Button({ label, onClick, containerStyle, textStyle, icon = null }: Props) {
    return (
        <TouchableOpacity style={[styles.buttonContainer, containerStyle]} onPress={onClick}>
            {icon}
            <Text style={[styles.labelButton, textStyle]}>{label}</Text>
        </TouchableOpacity>
    )
}