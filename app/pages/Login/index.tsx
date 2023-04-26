import { Text, TextInput, View } from "react-native";
import { useForm } from "react-hook-form";
import { styles } from "./style";
import Input from "../../components/Input";
import LinkNavigator from "../../components/LinkNavigator";
import Button from '../../components/Button';
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../styles/global.styles";
import { storage } from "../../storage";

export default function Login() {
    const { control, handleSubmit } = useForm();
    const navigator = useNavigation<any>();

    function onLogin(data: any) {
        console.log(data);
        storage.set('user', JSON.stringify({ name: control }))
        // navigator.navigate('logged', { screen: 'home' });
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