import { CommonActions, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Image, Text, View } from "react-native";
import Background from "../../components/Background";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { getCurrentUser, logOut } from "../../storage";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from "./style";
import { useRef, useState } from "react";

export default function Profile() {
    const navigation = useNavigation<any>();
    const scrollViewRef = useRef<any>(null);
    const [inputsDisabled, setInputDisabled] = useState<boolean>(true);
    const { control } = useForm();
    const currentUser = getCurrentUser();

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
                    <Input disabled={inputsDisabled} label={"fullname"} control={control} displayNameLabel="Nome Completo" style={{ minWidth: '60%' }} />
                    <Input disabled={inputsDisabled} label={"cpf"} control={control} displayNameLabel="Cpf" style={{ minWidth: '30%' }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Input disabled={inputsDisabled} label={"email"} control={control} displayNameLabel="E-mail" style={{ minWidth: '55%' }} />
                    <Input disabled={inputsDisabled} label={"cellphone"} control={control} displayNameLabel="telefone" style={{ minWidth: '35%' }} />
                </View>

                <Text style={[styles.personalInformationsTitle, { marginTop: 20 }]}>Endereço</Text>

                <Input disabled={inputsDisabled} label={"publicPlace"} control={control} displayNameLabel="Logradouro" style={{ minWidth: '100%' }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Input disabled={inputsDisabled} label={"cep"} control={control} displayNameLabel="Cep" style={{ minWidth: '55%' }} />
                    <Input disabled label={"neighborhood"} control={control} displayNameLabel="Bairro" style={{ minWidth: '35%' }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Input disabled label={"city"} control={control} displayNameLabel="Cidade" style={{ minWidth: '55%' }} />
                    <Input disabled label={"state"} control={control} displayNameLabel="Estado" style={{ minWidth: '35%' }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Input disabled={inputsDisabled} label={"complement"} control={control} displayNameLabel="Complemento" style={{ minWidth: '75%' }} />
                    <Input disabled={inputsDisabled} label={"number"} control={control} displayNameLabel="Número" style={{ minWidth: '15%' }} />
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