import { Text } from "react-native";
import { styles } from "./style";

type Props = {
    errorMessage: string
}

export default function MessageError({ errorMessage }: Props) {
    return (
        <Text style={styles.label}>
            {errorMessage}
        </Text>
    )
}