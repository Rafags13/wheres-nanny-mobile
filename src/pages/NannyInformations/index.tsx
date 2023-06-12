import { RouteProp, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
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
import { getDistance, getPreciseDistance } from 'geolib';
import { getCurrentUser, storage } from "../../storage";
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { formatCellphoneNumber } from "../../assets/util/functions";

export default function NannyInformations() {
    const { setLoading } = useContext(LoadingContext) as LoadingContextType;
    const { params } = useRoute<RouteProp<{ params: { nannyId: number } }, 'params'>>();
    const [date, setDate] = useState<Date>(new Date());
    const { data, isLoading } = useQuery('nanny', async () => {
        setLoading(true)
        var currentUser = getCurrentUser();
        var data = await getData(`Person/GetNannyById/${params.nannyId}/${currentUser.id}`);
        setLoading(false)
        return data
    });

    function openDatePicker(mode: 'date' | 'time') {
        console.log(date.toLocaleDateString('pt-PT'))
        DateTimePickerAndroid.open({
            mode,
            value: date,
            minimumDate: new Date(),
            onChange: (event, date) => {
                console.log(date?.toLocaleDateString('pt-PT'))
                setDate(date || new Date)
                // TODO: Format correct the date and display it correctly.
            },
        });
    }

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
            <LinearGradient colors={['white', '#F2F2F2']} style={styles.mainContentContainer}>
                <View style={{ padding: 15 }}>
                    <Text style={styles.titleLabels}>Informações de contato</Text>
                    <View style={styles.contactNannyContainer}>
                        <Text style={globalStyles.commonText}>
                            Telefone: {formatCellphoneNumber(nannyInformation.person.cellphone)}
                        </Text>
                        <Text style={globalStyles.commonText}>
                            E-mail: {nannyInformation.person.email}
                        </Text>
                    </View>
                    <Text style={styles.titleLabels} >Área de trabalho</Text>
                    <Slider
                        value={Number(nannyInformation.address.distanceBetweenThePeople)}
                        maximumValue={10000}
                        onValueChange={value => { }}
                        thumbTintColor={'#409FEA'}
                        minimumTrackTintColor={'#409FEA'}
                        maximumTrackTintColor={'#ECEEF8'}
                        disabled
                        renderBelowThumbComponent={
                            () => (
                                <View style={{ width: 200, left: -100, alignItems: 'center', marginBottom: 20, }}>
                                    <Text style={globalStyles.commonText}>{nannyInformation.address.distanceBetweenThePeople} m</Text>
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
                    <Text style={styles.dateTimeTitle}>Data e Hora</Text>
                    <View style={styles.dateTimeContainer}>
                        <TouchableOpacity style={styles.dateTimeComponent} onPress={() => openDatePicker('date')}>
                            <View style={styles.iconContainer}>
                                <Feather name='calendar' color='white' size={24} />
                            </View>
                            <Text style={[globalStyles.commonText]}>{date.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dateTimeComponent}>
                            <View style={styles.iconContainer}>
                                <Feather name='clock' color='white' size={24} />
                            </View>
                            <Text style={[globalStyles.commonText, { alignSelf: 'center', marginHorizontal: 10 }]}>10:20 am</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.finalPriceContractNannyContainer}>
                <View>
                    <Text style={[globalStyles.headerSubtitle, { alignSelf: "flex-start" }]}>Preço</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={globalStyles.headerTitle}>R$ {nannyInformation.servicePrice}</Text>
                        <Text style={[globalStyles.headerTitle, { fontSize: 14, alignSelf: 'center' }]}>/Dia</Text>
                    </View>
                </View>
                <Button containerStyle={{ maxWidth: 150, borderRadius: 15, height: 60 }} textStyle={{ fontSize: 16 }} label={"Contratar agora"} onClick={() => { }} />
                {/* Add event that sends to api the necessary informations to contract */}
            </View>

        </Background >
    )
}