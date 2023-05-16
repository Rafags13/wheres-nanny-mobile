import { FlatList, Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect, useRef, useState } from "react";
import ItemToFilterListNanny from "../ItemToFilterListNanny";
import { globalStyles } from "../../styles/global.styles";

type Props = {

}

const LABELS = [
    {
        icon: <Ionicons name={"location"} size={24} color={'#D5493C'} />,
        label: 'Mais próximo de mim'
    },
    {
        icon: <FontAwesome5 name={"money-bill-wave"} size={24} color={'#85bb65'} />,
        label: 'Preço mais acessível'
    },
    {
        icon: <AntDesign name={"star"} size={24} color={'#FFCD3C'} />,
        label: 'Maior pontuação'
    },
];

export default function ListFilterNanny() {
    const listRef = useRef<any>(null);
    const [flatListIndex, setFlatListIndex] = useState(0);
    useEffect(() => {
        listRef.current?.scrollToIndex({
            index: flatListIndex,
            animated: true,
            viewPosition: 0.5
        })
    }, [flatListIndex])
    return (

        <FlatList
            data={LABELS}
            initialScrollIndex={flatListIndex}
            ref={listRef}
            renderItem={({ item, index: flatListIndex }) => {
                const { icon, label } = item;
                return (
                    <ItemToFilterListNanny icon={icon} label={label} setFlatListIndex={() => setFlatListIndex(flatListIndex)} />
                )
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
        />
    )
}