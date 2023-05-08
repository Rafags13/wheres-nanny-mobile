import { Alert, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import SectionList from 'react-native-tabs-section-list';
import Input from "../../components/Input";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import MessageError from "../../components/MessageError";

import { globalStyles } from "../../styles/global.styles";
import { styles } from "./style";

import { COMMON_USER_SECTION } from '../../assets/util/contants';
import { RegisterUserDto } from "../../dto/User/RegisterUserDto";
import { ConvertDateBrazilFormatToDateType, isNullOrUndefinedOrEmpty, removeAllSpecialCharacters, removeSpaces } from "../../assets/util/functions";
import { postData } from "../../services/apiRequests";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../../assets/util/yupValidations";
import { useState } from "react";
import ImagePicker from "../../components/ImagePicker";

export default function Register() {
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerValidationSchema) });
    const [base64Image, setBase64Image] = useState<string>('');
    const navigator = useNavigation<any>();

    async function onRegister(data: any) {

        const date = ConvertDateBrazilFormatToDateType(data.birthdayDate);

        if (isNullOrUndefinedOrEmpty(base64Image)) { Alert.alert('Por favor, selecione uma foto para prosseguir') }

        const registerUserDto: RegisterUserDto = {
            fullname: data.fullname,
            username: data.username,
            email: data.email,
            password: data.password,
            cellphone: removeSpaces(removeAllSpecialCharacters(data.cellphone)),
            birthdayDate: date,
            cpf: removeAllSpecialCharacters(data.cpf),
            imageUri: base64Image,
            cep: removeAllSpecialCharacters(data.cep),
            houseNumber: data.number,
            complement: data.complement
        }

        await postData('User/RegisterUser', registerUserDto).then((response) => {
            Alert.alert("Usuário cadastrado no sistema com sucesso");
        }).catch((error) => console.log(error.response.request._response));
        navigator.navigate('login')
    }

    return (
        <View style={styles.container}>
            <Text style={globalStyles.title}>
                Registrar
            </Text>

            <SectionList
                sections={COMMON_USER_SECTION} // all layout
                keyExtractor={item => item.label}
                tabBarStyle={styles.tabBar}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderTab={({ title, isActive }) => (
                    <View
                        style={[
                            styles.tabContainer,
                            {
                                backgroundColor: isActive ? '#c3c3c3' : 'transparent',
                            }
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                { color: isActive ? '#090909' : '#9e9e9e' }
                            ]}
                        >
                            {title}
                        </Text>
                    </View>
                )}
                renderSectionHeader={({ section }) => (
                    <View>
                        <View style={styles.sectionHeaderContainer} />
                        <Text style={[globalStyles.subtitle, { marginBottom: 10 }]}>{section.title}</Text>
                    </View>
                )}
                renderItem={({ item }) => {
                    if (item.label === 'checkbox') {
                        return (
                            <>
                                <Checkbox messageContent={item.content} control={control} label={item.label} hasError={errors?.checkbox?.message !== undefined} />
                                {errors?.checkbox?.message &&
                                    <MessageError errorMessage={errors?.checkbox?.message as string} />
                                }
                                <Button label={"Cadastrar"} onClick={handleSubmit(onRegister)} />
                            </>
                        )
                    }

                    else if (item.label === 'photo') {
                        return (
                            <>
                                <ImagePicker base64Image={base64Image} setBase64Image={(value: string) => setBase64Image(value)} />
                            </>
                        )
                    }

                    return (
                        <View style={{ marginBottom: 15 }}>
                            <Input
                                label={item.label}
                                control={control}
                                displayNameLabel={item.displayNameLabel}
                                hasError={errors?.[item.label]?.message !== undefined}
                                placeholder={item.placeholder || ''}
                                isPasswordInput={item.isPasswordInput}
                            />

                            {errors?.[item.label]?.message &&
                                <MessageError errorMessage={errors?.[item.label]?.message as string} />
                            }

                        </View>
                    )
                }}
            />

        </View>
    )
}