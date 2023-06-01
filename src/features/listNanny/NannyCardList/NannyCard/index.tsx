import { Image, Text, TouchableOpacity, View } from "react-native";
import { getCurrentUser } from "../../../../storage";
import Stars from "../../../../components/Stars";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";

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
        <TouchableOpacity style={[styles.labels, { marginBottom: 20 }]} onPress={redirectToNannyProfile}>
            <Image style={styles.personPhoto} source={{ uri: `data:image/png;base64,${imageUri}` }} />

            <View>
                <Text style={styles.fullnameNannyItem}>{fullname}</Text>
                <Text style={styles.workNannyItem}>babá</Text>
                <View style={styles.starsNannyCountingContainer}>
                    <Stars rating={starsCounting} tintBackgroundColorStar={'white'} backgroundColorStars={"#c4c4c4"} />
                    <Text style={styles.starsNannyCouting}>{starsCounting.toString()} ({rankCommentCount})</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}