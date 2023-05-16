import { StyleProp, View, ViewStyle } from "react-native";
import style from "./style";

type Props = {
    styles?: StyleProp<ViewStyle>
}

export default function Line({ styles }: Props) {
    const lineStyle = style(styles);
    return (
        <View style={lineStyle.lineContainer} />
    )
}