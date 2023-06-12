import { Text, TouchableOpacity } from "react-native"
import { useAppDispatch } from "../../app/hooks"
import { changeNannyListByFilter } from "../../features/listNannySlice"
import { styles } from "./style"

type Props = {
    icon: JSX.Element,
    label: string,
    orderBy: string,
    setFlatListIndex: () => void
}

export default function ItemToFilterListNanny({ icon, label, orderBy, setFlatListIndex }: Props) {
    const dispatch = useAppDispatch();

    function filterListerBySelectOrdernation() {
        setFlatListIndex();
        dispatch(changeNannyListByFilter(orderBy))
    }

    return (
        <TouchableOpacity style={styles.labels} onPress={filterListerBySelectOrdernation}>
            {icon}
            <Text style={{ color: '#192553', fontSize: 16, fontFamily: 'Gellix-Regular' }}>{label}</Text>
        </TouchableOpacity>
    )
}