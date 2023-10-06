import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Background } from "@components/Background";
import Father from "@components/icons/FatherIcon";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { globalStyles, text } from "@styles/global.styles";
import { styles } from "./style";
import Line from "@components/Line";
import moment from "moment";
import Button from "@components/Button";
import { useQuery } from "react-query";
import { NannyServiceInformationDto } from "@dtos/Service/NannyServiceInformationDto";
import { getNannyServiceInformation } from "@services/requests/NannyRequests";

export default function ServiceInformation() {
    const navigator = useNavigation<any>();
    const { params } = useRoute<RouteProp<{ params: { serviceId: number, isCommonUser: boolean } }, 'params'>>();
    const { data, isLoading } = useQuery<NannyServiceInformationDto>(['GetServiceInformation', params.serviceId], async () => {
        const response = await getNannyServiceInformation(params?.serviceId);
        return response.data;
    });

    if (isLoading) {
        return (
            <>
            </>
        )
    }

    // TODO: change this to skeleton

    return (

        <Background.ScrollView>
            <Background.BackHeader title={`Serviço n° #${params.serviceId}`} />
            <View style={{ padding: 10 }}>


                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.title}>Informações Gerais</Text>
                    <Line styles={{ backgroundColor: '#192553' }} />
                </View>

                <View style={styles.iconContainer}>
                    <Father width={'24px'} height={'30px'} fill="#192553" />
                    <Text style={text.common}>{data?.parentName}</Text>
                </View>

                <View style={styles.iconContainer}>
                    <Ionicons name="location" size={24} color="#192553" />
                    <Text style={text.common}>{data?.cep}</Text>
                </View>

                <View style={styles.iconContainer}>
                    <MaterialIcons name="attach-money" size={24} color="#192553" />
                    <Text style={text.common}>R$ {data?.servicePrice}</Text>
                </View>

                <View style={styles.iconContainer}>
                    <FontAwesome name="calendar" size={24} color="#192553" />
                    <Text style={text.common}>{moment(data?.hiringDate).format('DD/MM/YYYY [às] HH:mm')}</Text>
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.title}>Babá</Text>
                    <Line styles={{ backgroundColor: '#192553' }} />
                </View>

                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="baby-bottle" size={24} color="#192553" />
                    <Text style={text.common}>{data?.nannyName}</Text>
                </View>

                <View style={styles.iconContainer}>
                    <AntDesign name="star" size={24} color="#192553" />
                    <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                        <Text style={text.common}>Avaliada em {data?.nannyCountStars}</Text>
                        <AntDesign name="star" size={12} color="#192553" />
                    </View>
                </View>
                {params.isCommonUser && (
                    <Button label={"Contratar Novamente?"} onClick={() => navigator.navigate('nannyInformation', { nannyId: data?.nannyId })} containerStyle={{ marginVertical: 20 }} />
                )}
            </View>
        </Background.ScrollView>
    )
}