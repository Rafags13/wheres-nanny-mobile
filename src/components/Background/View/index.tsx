import { ReactNode } from "react";
import { View } from "react-native";

export default function BackgroundView({ children }: { children: ReactNode }) {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#F8FDFE',
        }}>
            {children}
        </View>
    )
}