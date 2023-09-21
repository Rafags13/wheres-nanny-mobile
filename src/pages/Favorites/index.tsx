import { Text, View } from "react-native";
import NannyCardList from "@features/listNanny/NannyCardList";
import { useAppSelector } from "@app/hooks";
import { Background } from "@components/Background";
import { globalStyles } from "@styles/global.styles";

export default function Favorites() {
    const nannyList = useAppSelector((state) => state.favoriteNannies.listFavoriteNanny)
    return (
        <Background.View>
            <Background.Header>
                <View style={{ padding: 10, marginBottom: 10 }}>
                    <Text style={globalStyles.headerTitle}>Babás Favoritas</Text>
                </View>
            </Background.Header>
            <NannyCardList nannyList={nannyList} />
        </Background.View>
    )
}