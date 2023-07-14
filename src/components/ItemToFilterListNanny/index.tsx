import { Text, TouchableOpacity } from "react-native"
import { useAppDispatch } from "../../app/hooks"
import { changeNannyListByFilter } from "../../features/listNanny/listNannySlice"
import { globalStyles, text } from "../../assets/styles/global.styles"
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
        <TouchableOpacity style={styles.filterContainer} onPress={filterListerBySelectOrdernation}>
            {icon}
            <Text style={text.common}>{label}</Text>
        </TouchableOpacity>
    )
}