import { Text, TextInput, View } from "react-native";
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

export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigator = useNavigation<any>();

    async function onLogin(data: any) {
        const requestData = await postData('Authentication', JSON.stringify(data));
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
                    required
                />
                {errors.username && (
                    <MessageError errorMessage={errors.username.message as string} />
                )}
                <Input
                    label="password"
                    control={control}
                    displayNameLabel={"Senha"}
                    hasError={typeof errors.password?.message === 'string'}
                    required
                    isPasswordInput />
                {errors.password && (
                    <MessageError errorMessage={errors.password.message as string} />
                )}

                <Button label={"Entrar"} onClick={handleSubmit(onLogin)} />
            </View>

        </View>
    )
}