import { Image, Text, TouchableOpacity, View } from "react-native";
import Stars from "@components/Stars";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "@styles/global.styles";

export type NannyCardProps = {
    id: number,
    fullname: string,
    starsCounting: number,
    rankCommentCount: string,
    imageUri: string
}

export default function NannyCard({ fullname, starsCounting, rankCommentCount, imageUri, id }: NannyCardProps) {
    const navigator = useNavigation<any>();

    function redirectToNannyProfile() {
        navigator.navigate('nannyInformation', { nannyId: id });
    }

    return (
        <TouchableOpacity style={[styles.labels]} activeOpacity={0.7} onPress={redirectToNannyProfile}>
            <Image style={globalStyles.personPhotoSmall} source={{ uri: `data:image/png;base64,${imageUri}` }} />

            <View>
                <Text style={styles.fullnameNannyItem}>{fullname}</Text>
                <Text style={styles.workNannyItem}>babá</Text>
                <View style={styles.starsNannyCountingContainer}>
                    <Stars rating={starsCounting} />
                    <Text style={styles.starsNannyCouting}>{starsCounting.toString()} ({rankCommentCount})</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}