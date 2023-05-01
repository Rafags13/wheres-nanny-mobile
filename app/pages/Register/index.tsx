import { useNavigation } from "@react-navigation/native";
import { ArrayPath, DeepPartial, FieldArray, FieldError, FieldErrors, FieldValues, FormState, Path, RegisterOptions, useForm, UseFormRegisterReturn } from "react-hook-form";
import { Alert, ScrollView, Text, View } from "react-native";
import Input from "../../components/Input";
import { globalStyles } from "../../styles/global.styles";
import SectionList from 'react-native-tabs-section-list';
import CheckBox from '@react-native-community/checkbox';
import { styles } from "./style";
import { useState } from "react";
import Button from "../../components/Button";
import { COMMON_USER_SECTION } from '../../assets/util/contants';
import MessageError from "../../components/MessageError";
import { RegisterUserDto } from "../../dto/User/RegisterUserDto";
import { ConvertDateBrazilFormatToDateType } from "../../assets/util/functions";
import { postData } from "../../services/apiRequests";

export default function Register() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [toggleCheckbox, setToggleCheckbox] = useState<boolean>();
    const navigator = useNavigation<any>();

    async function onRegister(data: any) {
        const date = ConvertDateBrazilFormatToDateType(data.birthdayDate);

        const registerUserDto: RegisterUserDto = {
            fullname: data.fullname,
            username: data.username,
            email: data.email,
            password: data.password,
            cellphone: data.cellphone,
            birthdayDate: date,
            cpf: data.cpf,
            isNanny: false,
            cep: data.cep,
            houseNumber: data.number,
            complement: data.complement
        }

        await postData('User/RegisterUser', registerUserDto).then((response) => {
            Alert.alert("Usuário cadastrado no sistema com sucesso");
        }).catch((error) => Alert.alert(error.response.request._response));
        navigator.navigate('login')
    }


    return (
        <View style={styles.container}>
            <Text style={globalStyles.title}>
                Registrar
            </Text>

            <SectionList
                sections={COMMON_USER_SECTION}
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
                                <View style={{ flexDirection: 'row' }}>
                                    <CheckBox
                                        disabled={false}
                                        value={toggleCheckbox}
                                        onValueChange={(newValue) => setToggleCheckbox(newValue)}
                                    />
                                    <Text style={globalStyles.commonText}>
                                        {item.content}
                                    </Text>
                                </View>
                                <Button label={"Cadastrar"} onClick={handleSubmit(onRegister)} />
                            </>
                        )
                    }

                    return (
                        <View style={{ marginBottom: 15, gap: 5 }}>
                            <Input
                                label={item.label}
                                control={control}
                                displayNameLabel={item.displayNameLabel}
                                hasError={typeof errors?.[item.label]?.message === 'string'}
                                rules={item.rules}
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