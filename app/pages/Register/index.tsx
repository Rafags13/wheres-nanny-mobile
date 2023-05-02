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
import { ConvertDateBrazilFormatToDateType } from "../../assets/util/functions";
import { postData } from "../../services/apiRequests";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../../assets/util/yupValidations";

export default function Register() {
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerValidationSchema) });
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
                sections={COMMON_USER_SECTION} // all layout and verifications
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

                    return (
                        <View style={{ marginBottom: 15 }}>
                            <Input
                                label={item.label}
                                control={control}
                                displayNameLabel={item.displayNameLabel}
                                hasError={errors?.[item.label]?.message !== undefined}
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