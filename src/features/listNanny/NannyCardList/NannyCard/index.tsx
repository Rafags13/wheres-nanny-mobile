import { Image, Text, TouchableOpacity, View } from "react-native";
import { getCurrentUser } from "../../../../storage";
import Stars from "../../../../components/Stars";
import { styles } from "./style";

export type NannyCardProps = {
    id: number,
    fullname: string,
    starsCounting: number,
    rankCommentCount: string,
    imageUri: string
}

export default function NannyCard({ fullname, starsCounting, rankCommentCount, imageUri }: NannyCardProps) {
    const currentUser = getCurrentUser();
    return (
        <TouchableOpacity style={[styles.labels, { marginBottom: 20 }]}>
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