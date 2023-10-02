import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type BackgroundViewProps = {
    children: ReactNode,
    style?: StyleProp<ViewStyle>
}

export default function BackgroundView({ children, style }: BackgroundViewProps) {
    return (
        <View style={[{
            flex: 1,
            backgroundColor: '#F8FDFE',
        }, style]}>
            {children}
        </View>
    )
}