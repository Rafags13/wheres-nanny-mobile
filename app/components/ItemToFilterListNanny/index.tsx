import { Text, TouchableOpacity } from "react-native"
import { styles } from "./style"

type Props = {
    icon: JSX.Element,
    label: string,
    setFlatListIndex: () => void
}

export default function ItemToFilterListNanny({ icon, label, setFlatListIndex }: Props) {
    return (
        <TouchableOpacity style={styles.labels} onPress={() => setFlatListIndex()}>
            {icon}
            <Text style={{ color: '#192553', fontSize: 16 }}>{label}</Text>
        </TouchableOpacity>
    )
}