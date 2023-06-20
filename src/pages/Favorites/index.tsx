import { Text, View } from "react-native";
import { useState } from "react";
import NannyCardList from "../../features/listNanny/NannyCardList";
import { useAppSelector } from "../../app/hooks";
import Background from "../../components/Background";
import { globalStyles } from "../../styles/global.styles";
import { getAllNannies } from "../../storage";

export default function Favorites() {
    const nannyList = useAppSelector((state) => state.favoriteNannies.listFavoriteNanny)
    return (
        <Background
            header={
                <View style={{ padding: 10, marginBottom: 10 }}>
                    <Text style={globalStyles.headerTitle}>Babás Favoritas</Text>
                </View>
            }
        >
            <NannyCardList nannyList={nannyList} />
        </Background>
    )
}