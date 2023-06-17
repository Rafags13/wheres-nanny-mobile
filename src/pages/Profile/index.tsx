import { CommonActions, useNavigation } from "@react-navigation/native";
import { FormProvider, useForm } from "react-hook-form";
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
import { getData, updateData, viaCepRequestGetByCep } from "../../services/apiRequests";
import { LoadingContext, LoadingContextType } from "../../context/LoadingContext";
import { ProfileUpdateDataDto } from "../../dto/Person/ProfileUpdateDataDto";
import { ModalContextType, ModalContext } from "../../context/ModalContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePersonValidationSchema } from "../../assets/util/yupValidations";
import { formatCellphoneNumber, formatCpf, removeSpecialCharacter } from "../../assets/util/functions";
import CepInput from "../../components/CepInput";

export default function Profile() {
    const currentUser = getCurrentUser();
    const navigation = useNavigation<any>();
    const scrollViewRef = useRef<any>(null);
    const { showModal, modalQuestionResponse, questionStatus } = useContext(ModalContext) as ModalContextType;
    const { setLoading } = useContext(LoadingContext) as LoadingContextType;
    const form = useForm({ resolver: yupResolver(updatePersonValidationSchema) });
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

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    if (isLoading) {
        return (<></>)
    }

    async function updateInformations(data: any) {
        const updateDataProfile: ProfileUpdateDataDto = createUpdateProfileModel(data);

        await updateData("Person/UpdatePersonData", updateDataProfile).then((response) => {
            showModal({ modalType: 'success', message: response.data });
            questionStatus(true);
        }).catch((error: Error) => {
            showModal({ modalType: "error", message: error.message })
        });
    }

    function createUpdateProfileModel(data: any) {
        const updatedProfileModel: ProfileUpdateDataDto = {
            personInformation: {
                id: currentUser.id,
                fullname: data.fullname,
                cpf: removeSpecialCharacter(data.cpf),
                email: data.email,
                cellphone: removeSpecialCharacter(data.cellphone)
            },
            addressFromUpdateInformation: {
                cep: removeSpecialCharacter(data.cep),
                bairro: "",
                logradouro: "",
                cidade: "",
                estado: "",
                complement: "",
                number: ""
            }
        }

        return updatedProfileModel;
    }

    function onInvalid(data: any) {
        let message = [];
        for (const key in data) {
            message.push(data[key].message);
        }

        showModal({ modalType: 'error', message: message.join("\n") })
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
            <FormProvider {...form}>
                <View style={{ padding: 15 }}>
                    <Text style={styles.personalInformationsTitle}>Informações Pessoais</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Input defaultValue={data?.personInformation.fullname} disabled={modalQuestionResponse} label={"fullname"} control={form.control} displayNameLabel="Nome Completo" style={{ minWidth: 200, maxWidth: '70%' }} />
                        <Input defaultValue={formatCpf(data?.personInformation.cpf as string)} disabled={modalQuestionResponse} label={"cpf"} control={form.control} displayNameLabel="Cpf" style={{ minWidth: 150, maxWidth: '30%' }} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Input defaultValue={data?.personInformation.email} disabled={modalQuestionResponse} label={"email"} control={form.control} displayNameLabel="E-mail" style={{ minWidth: 200, maxWidth: '70%' }} />
                        <Input defaultValue={formatCellphoneNumber(data?.personInformation.cellphone as string)} disabled={modalQuestionResponse} label={"cellphone"} control={form.control} displayNameLabel="Telefone" style={{ minWidth: 150, maxWidth: '30%' }} />
                    </View>

                    <Text style={[styles.personalInformationsTitle, { marginTop: 20 }]}>Endereço</Text>

                    <CepInput placeholder="00000-00" defaultValue={data?.addressFromUpdateInformation.cep} disabled={modalQuestionResponse} label={"cep"} control={form.control} displayNameLabel="Cep" style={{ minWidth: '55%' }} />

                    <Input defaultValue={data?.addressFromUpdateInformation.bairro} disabled label={"neighborhood"} control={form.control} displayNameLabel="Bairro" style={{ maxWidth: '100%' }} />

                    <Input defaultValue={data?.addressFromUpdateInformation.logradouro} disabled={modalQuestionResponse} label={"publicPlace"} control={form.control} displayNameLabel="Logradouro" style={{ minWidth: '100%' }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Input defaultValue={data?.addressFromUpdateInformation.cidade} disabled label={"city"} control={form.control} displayNameLabel="Cidade" style={{ minWidth: '55%' }} />
                        <Input defaultValue={data?.addressFromUpdateInformation.estado} disabled label={"state"} control={form.control} displayNameLabel="Estado" style={{ minWidth: '35%' }} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Input defaultValue={data?.addressFromUpdateInformation.complement} disabled={modalQuestionResponse} label={"complement"} control={form.control} displayNameLabel="Complemento" style={{ minWidth: '75%' }} />
                        <Input defaultValue={data?.addressFromUpdateInformation.number} disabled={modalQuestionResponse} label={"number"} control={form.control} displayNameLabel="Número" style={{ minWidth: '15%' }} />
                    </View>
                    {modalQuestionResponse ? (
                        <Button
                            label={"Alterar"}
                            onClick={() => {
                                questionStatus(false);
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
                                onClick={form.handleSubmit(updateInformations, onInvalid)}
                                containerStyle={{ backgroundColor: '#218838', width: '45%' }}
                                icon={
                                    <FontAwesome name="check" size={16} color={'white'} />
                                }
                            />
                            <Button
                                label={"Cancelar"}
                                onClick={() => {
                                    showModal({ modalType: 'question', message: 'Deseja sair sem salvar as alterações?' })

                                }}
                                containerStyle={{ backgroundColor: '#C82333', width: '45%' }}
                                icon={
                                    <FontAwesome name="remove" size={16} color="white" />
                                }
                            />
                        </View>
                    )}

                    <View style={{ marginTop: 10 }}>

                        <Text style={styles.personalInformationsTitle}>Alterar Senha</Text>

                        <Input label={"currentPassword"} control={form.control} displayNameLabel="Senha Atual" isPasswordInput />
                        <Input label={"newPassword"} control={form.control} displayNameLabel="Nova Senha" isPasswordInput />

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
            </FormProvider>
        </Background>
    )
}