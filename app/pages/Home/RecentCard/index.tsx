import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { USER } from "../../../storage";
import { styles } from "./style";
import LinearGradient from 'react-native-linear-gradient';

type Props = {
    nannyName: string,
    serviceDate: string
}

export default function RecentCard({ nannyName, serviceDate }: Props) {
    return (
        <TouchableOpacity style={{ alignItems: 'center' }}>
            <LinearGradient colors={['#3E9FEB', '#51a8ed']} style={styles.cardContainerLinearGradient}>
                <View style={styles.mainInformationContainer}>
                    <Image style={styles.personPhoto} source={{ uri: `data:image/png;base64,${USER.imageUri}` }} />

                    <View>
                        <Text style={styles.fullnameText}>{nannyName}</Text>
                        <Text style={{ color: '#f6f6f6' }}>Babá</Text>
                    </View>
                </View>

                <View style={styles.dataContainer}>
                    <MaterialCommunityIcons name="calendar-blank" size={16} color="white" />
                    <Text style={{ color: 'white' }}>{serviceDate}</Text>
                </View>
            </LinearGradient >
            <View style={styles.bottomOne} />
            <View style={styles.bottomTwo} />
        </TouchableOpacity>
    )
}