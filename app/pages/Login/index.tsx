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

export default function Login() {
    const { control, handleSubmit } = useForm();
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
            <View style={{ flex: 1 }}>
                <Input label="username" control={control} displayNameLabel={"Nome de Usuário"} />
                <Input label="password" control={control} displayNameLabel={"Senha"} isPasswordInput />

                <Button label={"Entrar"} onClick={handleSubmit(onLogin)} />
            </View>

        </View>
    )
}