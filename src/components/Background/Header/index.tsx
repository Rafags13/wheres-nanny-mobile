import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type Props = {
    children: ReactNode,
    style?: StyleProp<ViewStyle>
}

export default function Header({ children, style }: Props) {
    return (
        <View style={style}>
            {children}
        </View>
    )
}