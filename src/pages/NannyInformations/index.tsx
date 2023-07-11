import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import Background from "../../components/Background";
import Button from "../../components/Button";
import Stars from "../../components/Stars";
import { LoadingContextType, LoadingContext } from "../../context/LoadingContext";
import { NannyContractDto } from "../../dto/Person/NannyContractDto";
import { globalStyles } from "../../styles/global.styles";
import { Slider } from '@miblanchard/react-native-slider';
import Feather from 'react-native-vector-icons/Feather'
import styles from "./style";
import LinearGradient from "react-native-linear-gradient";
import { getCurrentUser } from "../../storage";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { formatCellphoneNumber } from "../../assets/util/functions";
import moment from "moment";
import { ModalContextType, ModalContext } from "../../context/ModalContext";
import { useDispatch, } from "react-redux";
import { loadInitialHomeInformation } from "../../features/listNannySlice";
import { addFavoriteNanny, FavoritedNanny, removingFavoriteFromNanny } from '../../features/favoriteListNannySlice';
import Heart from "../../components/Heart";
import { useAppSelector } from "../../app/hooks";
import { getNannyById } from "../../services/requests/NannyRequests";
import { CreateContractNannyDto } from "../../dto/Nanny/CreateContractNannyDto";
import { hireNanny } from "../../services/requests/ServiceRequests";

export default function NannyInformations() {
    const { setLoading } = useContext(LoadingContext) as LoadingContextType;
    const dispatch = useDispatch<any>();
    const currentUser = getCurrentUser();
    const { params } = useRoute<RouteProp<{ params: { nannyId: number } }, 'params'>>();
    const currentNanny = useAppSelector((state) => state.favoriteNannies.listFavoriteNanny.find(x => x.id === params.nannyId));
    const { showModal } = useContext(ModalContext) as ModalContextType;
    const [date, setDate] = useState<Date>(new Date());
    const { data, isLoading } = useQuery('nanny', async () => {
        setLoading(true)
        var data = await getNannyById(params?.nannyId);
        setLoading(false)
        return data
    });
    const nannyInformation: NannyContractDto = data?.data;
    const navigation = useNavigation<any>();

    function openDatePicker(mode: 'date' | 'time') {
        DateTimePickerAndroid.open({
            mode,
            value: date,
            minimumDate: new Date(),
            onChange: (event, date) => {
                if ((date as Date) < new Date()) {
                    showModal({ message: 'Não é possível escolher uma data menor que a data atual. Tente novamente.', modalType: 'error' });
                    return;
                }
                setDate(date as Date)
            },
        });
    }
    async function contractNanny() {
        const createContractNanny: CreateContractNannyDto = createHireNannyModel();

        const response = hireNanny(createContractNanny);
        response.then(async response => {
            showModal({ modalType: 'success', message: response.data });
            dispatch(loadInitialHomeInformation());
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'home' },
                    ],
                })
            );
        }).catch((err: Error) => {
            showModal({ modalType: 'error', message: 'Algo de errado deu durante a sua requisição. Tente Novamente.' });
        })

    }

    function createHireNannyModel() {
        const createContractNanny: CreateContractNannyDto = {
            serviceFinishHour: date,
            hiringDate: date,
            price: nannyInformation.servicePrice,
            personId: currentUser.id,
            nannyId: nannyInformation.nannyId
        }

        return createContractNanny;
    }

    if (isLoading) return (<></>)
    return (
        <Background hasBackIcon>
            <View style={styles.basicNannyInformationSection}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
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
                    <Heart isFavorited={currentNanny?.isFavorited ?? false} setIsFavorited={(isFavoriting) => {
                        if (isFavoriting) {
                            var newFavoriteNanny: FavoritedNanny = {
                                id: nannyInformation.nannyId,
                                fullname: nannyInformation.person.name,
                                starsCounting: nannyInformation.rankAverageStars,
                                rankCommentCount: nannyInformation.rankCommentCount.toString(),
                                imageUri: nannyInformation.imageProfileBase64Uri,
                                isFavorited: true
                            }
                            dispatch(addFavoriteNanny(newFavoriteNanny));
                        } else {
                            dispatch(removingFavoriteFromNanny(nannyInformation?.nannyId));
                        }
                    }} style={{}} />
                </View>
            </View>
            <LinearGradient colors={['white', '#F6F6F6']} style={styles.mainContentContainer}>
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
                            <Text style={[globalStyles.commonText]}>{moment(date).format('DD/MM/YYYY')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dateTimeComponent} onPress={() => openDatePicker('time')}>
                            <View style={styles.iconContainer}>
                                <Feather name='clock' color='white' size={24} />
                            </View>
                            <Text style={[globalStyles.commonText, { alignSelf: 'center', marginHorizontal: 10 }]}>{moment(date).format('HH:mm')}</Text>
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
                <Button containerStyle={{ maxWidth: 150, borderRadius: 15, height: 60 }} textStyle={{ fontSize: 16 }} label={"Contratar agora"} onClick={contractNanny} />
            </View>

        </Background >
    )
}