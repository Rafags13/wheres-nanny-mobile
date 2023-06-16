import { CommonActions, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Image, Text, View, } from "react-native";
import Background from "../../components/Background";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { getCurrentUser, logOut } from "../../storage";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from "./style";
import { useEffect, useRef, useState, useContext } from "react";
import { useQuery } from "react-query";
import { getData, viaCepRequestGetByCep } from "../../services/apiRequests";
import { LoadingContext, LoadingContextType } from "../../context/LoadingContext";
import { ProfileUpdateDataDto } from "../../dto/Person/ProfileUpdateDataDto";

export default function Profile() {
    const currentUser = getCurrentUser();
    const navigation = useNavigation<any>();
    const scrollViewRef = useRef<any>(null);
    const [inputsDisabled, setInputDisabled] = useState<boolean>(true);
    const { setLoading } = useContext(LoadingContext) as LoadingContextType
    const { control } = useForm();
    const { data, isLoading } = useQuery('getProfileInformation', async () => {
        const response = await getData(`Person/GetProfileInformation/${currentUser.id}`);
        const viacepResponse = await viaCepRequestGetByCep(currentUser.cep);
        const profileData: ProfileUpdateDataDto = {
            ...response.data,
            addressFromUpdateInformation: {
                cep: viacepResponse.data.cep,
                bairro: viacepResponse.data.bairro,
                cidade: viacepResponse.data.localidade,
                logradouro: viacepResponse.data.logradouro,
                estado: viacepResponse.data.uf
            },
        };
        return profileData;
    });

    if (isLoading) {
        return (<></>)
    }

    function scrollToTop() {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }

    return (
        <Background
            header={
                <View style={{ padding: 10, backgroundColor: '#F8FDFE' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, }}>
                        <Text style={styles.title}>Meu Perfil</Text>
                        <Ionicons name="person-circle" size={32} color='#192553' />
                    </View>
                    <View style={styles.imageProfileContainer}>
                        <Image style={styles.nannyProfilePicture} source={{ uri: `data:image/png;base64,${currentUser.imageUri}` }} />
                    </View>
                </View>
            }
            isScroll
            scrollviewRef={scrollViewRef}
        >

            <View style={{ padding: 15 }}>
                <Text style={styles.personalInformationsTitle}>Informações Pessoais</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Input defaultValue={data?.personInformation.fullname} disabled={inputsDisabled} label={"fullname"} control={control} displayNameLabel="Nome Completo" style={{ minWidth: '60%' }} />
                    <Input defaultValue={data?.personInformation.cpf} disabled={inputsDisabled} label={"cpf"} control={control} displayNameLabel="Cpf" style={{ minWidth: '30%' }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Input defaultValue={data?.personInformation.email} disabled={inputsDisabled} label={"email"} control={control} displayNameLabel="E-mail" style={{ minWidth: '55%' }} />
                    <Input defaultValue={data?.personInformation.cellphone} disabled={inputsDisabled} label={"cellphone"} control={control} displayNameLabel="Telefone" style={{ minWidth: '35%' }} />
                </View>

                <Text style={[styles.personalInformationsTitle, { marginTop: 20 }]}>Endereço</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Input defaultValue={data?.addressFromUpdateInformation.cep} disabled={inputsDisabled} label={"cep"} control={control} displayNameLabel="Cep" style={{ minWidth: '55%' }} />
                    <Input defaultValue={data?.addressFromUpdateInformation.bairro} disabled label={"neighborhood"} control={control} displayNameLabel="Bairro" style={{ minWidth: '35%' }} />
                </View>

                <Input defaultValue={data?.addressFromUpdateInformation.logradouro} disabled={inputsDisabled} label={"publicPlace"} control={control} displayNameLabel="Logradouro" style={{ minWidth: '100%' }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Input defaultValue={data?.addressFromUpdateInformation.cidade} disabled label={"city"} control={control} displayNameLabel="Cidade" style={{ minWidth: '55%' }} />
                    <Input defaultValue={data?.addressFromUpdateInformation.estado} disabled label={"state"} control={control} displayNameLabel="Estado" style={{ minWidth: '35%' }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Input defaultValue={data?.addressFromUpdateInformation.complement} disabled={inputsDisabled} label={"complement"} control={control} displayNameLabel="Complemento" style={{ minWidth: '75%' }} />
                    <Input defaultValue={data?.addressFromUpdateInformation.number} disabled={inputsDisabled} label={"number"} control={control} displayNameLabel="Número" style={{ minWidth: '15%' }} />
                </View>
                {inputsDisabled ? (
                    <Button
                        label={"Alterar"}
                        onClick={() => {
                            setInputDisabled(false);
                            scrollToTop();
                        }}
                        icon={
                            <FontAwesome5 name="pen" size={16} color={'white'} />
                        }
                    />
                ) : (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                        <Button
                            label={"Salvar"}
                            onClick={() => {
                                setInputDisabled(true);
                                scrollToTop();
                            }}
                            containerStyle={{ backgroundColor: '#218838', width: '45%' }}
                            icon={
                                <FontAwesome name="check" size={16} color={'white'} />
                            }
                        />
                        <Button
                            label={"Cancelar"}
                            onClick={() => console.log('')}
                            containerStyle={{ backgroundColor: '#C82333', width: '45%' }}
                            icon={
                                <FontAwesome name="remove" size={16} color="white" />
                            }
                        />
                    </View>
                )}

                <View style={{ marginTop: 10 }}>

                    <Text style={styles.personalInformationsTitle}>Alterar Senha</Text>

                    <Input label={"currentPassword"} control={control} displayNameLabel="Senha Atual" isPasswordInput />
                    <Input label={"newPassword"} control={control} displayNameLabel="Nova Senha" isPasswordInput />

                    <Button label="Atualizar" onClick={() => { }} containerStyle={{ marginTop: 15 }} />

                </View>
                <Button
                    label={"Sair"}
                    onClick={() => {
                        logOut();
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    { name: 'login' },
                                ],
                            })
                        );
                    }}
                    containerStyle={{ backgroundColor: '#C82333', marginTop: 20 }}
                    icon={
                        <MaterialIcons name="logout" size={16} color="white" />
                    }
                />
            </View>

        </Background>
    )
}