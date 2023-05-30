import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useForm } from "react-hook-form";
import { styles } from "./style";
import Input from "../../components/Input";
import LinkNavigator from "../../components/LinkNavigator";
import Button from '../../components/Button';
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../styles/global.styles";
import { storage } from "../../storage";
import { postData } from "../../services/apiRequests";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import MessageError from "../../components/MessageError";
import Line from "../../components/Line";

export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigator = useNavigation<any>();

    async function onLogin(data: any) {
        const dataToRequest: { username: string, password: string } = {
            username: data.username,
            password: data.password
        }
        const requestData = await postData('Authentication', dataToRequest);
        storage.set('token', requestData.data);
        navigator.navigate('logged', { screen: 'home' });
    }

    return (
        <View style={styles.container}>
            <Text style={globalStyles.title}>Entrar</Text>
            <Text
                style={styles.createAccountText}>
                Não tem uma conta ainda?
                {" "}
                <LinkNavigator label={"Crie uma conta"} navigateTo={"register"} />
                {" "}
                para poder acessar e desfrutar do nosso sistema.
            </Text>
            <View style={{ flex: 1, gap: 10 }}>
                <Input
                    label="username"
                    control={control}
                    displayNameLabel={"Nome de Usuário"}
                    hasError={typeof errors.username?.message === 'string'}
                    rules={{
                        required: {
                            value: true,
                            message: "O Nome de Usuário é obrigatório"
                        }
                    }}
                />
                {errors.username && (
                    <MessageError errorMessage={errors.username.message as string} />
                )}
                <Input
                    label="password"
                    control={control}
                    displayNameLabel={"Senha"}
                    hasError={typeof errors.password?.message === 'string'}
                    rules={{
                        required: {
                            value: true,
                            message: "A Senha é obrigatória"
                        }
                    }}
                    isPasswordInput />
                {errors.password && (
                    <MessageError errorMessage={errors.password.message as string} />
                )}

                <Button label={"Entrar"} onClick={handleSubmit(onLogin)} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 20 }}>
                    <Line styles={{ width: '45%' }} />
                    <Text style={globalStyles.commonText}>
                        ou
                    </Text>
                    <Line styles={{ width: '45%' }} />
                </View>

                <TouchableOpacity style={{ alignItems: 'center' }}>
                    <LinkNavigator
                        label={"Quero ser uma babá"}
                        navigateTo={"register"}
                        params={{ isNannyRegister: true }}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}