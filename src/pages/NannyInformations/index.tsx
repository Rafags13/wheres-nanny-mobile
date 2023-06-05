import { RouteProp, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import Background from "../../components/Background";
import Button from "../../components/Button";
import Stars from "../../components/Stars";
import { LoadingContextType, LoadingContext } from "../../context/LoadingContext";
import { NannyContractDto } from "../../dto/Person/NannyContractDto";
import { getData } from "../../services/apiRequests";
import { globalStyles } from "../../styles/global.styles";
import { Slider } from '@miblanchard/react-native-slider';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import styles from "./style";
import LinearGradient from "react-native-linear-gradient";

export default function NannyInformations() {
    const { setLoading } = useContext(LoadingContext) as LoadingContextType;
    const { params } = useRoute<RouteProp<{ params: { nannyId: number } }, 'params'>>();
    const { data, isLoading } = useQuery('nanny', async () => {
        setLoading(true)
        var data = await getData(`Person/GetNannyById/${params.nannyId}`);
        setLoading(false)
        return data
    });

    const nannyInformation: NannyContractDto = data?.data;

    if (isLoading) return (<></>)

    return (
        <Background hasBackIcon>
            <View style={styles.basicNannyInformationSection}>
                <Image style={styles.nannyProfilePicture} source={{ uri: `data:image/png;base64,${nannyInformation.imageProfileBase64Uri}` }} />
                <View style={styles.nameAndRatingContainer}>
                    <Text style={[globalStyles.headerTitle, { fontSize: 18 }]}>{nannyInformation.person.name}</Text>
                    <Text style={[globalStyles.headerSubtitle, { fontSize: 16, textAlign: 'left' }]}>babá</Text>
                    <View style={styles.starsRatingContainer}>
                        <Stars rating={nannyInformation.rankAverageStars} tintBackgroundColorStar={'white'} backgroundColorStars={"#c4c4c4"} />
                        <Text style={styles.textStarsNumber}>{nannyInformation.rankAverageStars}</Text>
                        <Text>({nannyInformation.rankCommentCount})</Text>
                    </View>
                </View>
            </View>
            <LinearGradient colors={['#FCFCFC', '#F2F2F2']} style={styles.mainContentContainer}>
                <View style={{ padding: 15, }}>
                    <Text style={styles.titleLabels}>Informações de contato</Text>
                    <View style={styles.contactNannyContainer}>
                        <Text style={globalStyles.commonText}>
                            Telefone: {nannyInformation.person.cellphone}
                        </Text>
                        <Text style={globalStyles.commonText}>
                            E-mail: {nannyInformation.person.email}
                        </Text>
                    </View>
                    <Text style={styles.titleLabels} >Área de trabalho</Text>
                    <Slider
                        value={100}
                        maximumValue={1000}
                        onValueChange={value => { }}
                        thumbTintColor={'#409FEA'}
                        minimumTrackTintColor={'#409FEA'}
                        maximumTrackTintColor={'#ECEEF8'}
                        disabled
                        renderBelowThumbComponent={
                            () => (
                                <View style={{ width: 200, left: -100, alignItems: 'center', marginBottom: 20, }}>
                                    <Text style={globalStyles.commonText}>1000 km</Text>
                                </View>
                            )
                        }
                        thumbStyle={{
                            backgroundColor: '#409FEA',
                            borderColor: 'white',
                            borderRadius: 30 / 2,
                            borderWidth: 3,
                            height: 25,
                            width: 25,
                            ...globalStyles.shadow
                        }}

                    />
                    <Text style={[styles.titleLabels, { marginTop: 40, marginBottom: 15 }]}>Data e Hora</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>

                        <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 10, ...globalStyles.shadow }}>
                            <View style={{ backgroundColor: '#3E9FEB', padding: 5, borderRadius: 10 }}>
                                <Feather name='calendar' color='white' size={24} />
                            </View>
                            <Text style={[globalStyles.commonText]}>10/10/2010</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 10, ...globalStyles.shadow }}>
                            <View style={{ backgroundColor: '#3E9FEB', padding: 5, borderRadius: 10 }}>
                                <Feather name='clock' color='white' size={24} />
                            </View>
                            <Text style={[globalStyles.commonText, { alignSelf: 'center', marginHorizontal: 10 }]}>10:20am</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleLabels}>Endereço</Text>
                    <View style={{ paddingVertical: 10, paddingHorizontal: 25, marginVertical: 10, borderRadius: 15, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...globalStyles.shadow }}>
                        <Text style={[globalStyles.commonText, { fontSize: 16 }]}>Rua engenheiro Antônio Góes, 91</Text>
                        <TouchableOpacity onPress={() => console.log('redirecting to map')}>
                            <Octicons name='location' size={32} color={'#c4c4c4'} />
                        </TouchableOpacity>
                        {/* {nannyInformation.address.} */}
                        {/* search name street by cep and put it here adding in the end
                        the number (if exists) */}
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', padding: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={[globalStyles.headerSubtitle, { alignSelf: "flex-start" }]}>Preço</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={globalStyles.headerTitle}>R$ {nannyInformation.servicePrice}</Text>
                            <Text style={[globalStyles.headerTitle, { fontSize: 14, alignSelf: 'center' }]}>/Dia</Text>
                        </View>
                    </View>
                    <Button containerStyle={{ maxWidth: 150, borderRadius: 15, height: 60 }} textStyle={{ fontSize: 16 }} label={"Contratar agora"} onClick={() => { }} />
                </View>
                {/* finish the layout and add google route by cep */}
            </LinearGradient>

        </Background >
    )
}