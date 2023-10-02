import { Text, TouchableOpacity, View } from "react-native";
import { useForm } from "react-hook-form";
import { styles } from "./style";
import DefaultInput from "@components/Inputs/Default";
import LinkNavigator from "@components/LinkNavigator";
import Button from '@components/Button';
import { CommonActions, useNavigation } from "@react-navigation/native";
import { globalStyles, text } from "@styles/global.styles";
import MessageError from "@components/MessageError";
import { useLoading } from "@context/LoadingContext";
import { ModalType, useModal } from "@context/ModalContext";
import messaging from "@react-native-firebase/messaging";
import { LoginDto } from "@dtos/User/LoginDto";
import { LoginRequest } from "@services/requests/AutenticationRequests";
import { returnRouteNameByProfileType } from "@util/functions";
import { TypeOfUser } from "@enums/TypeOfUser";
import PasswordInput from "@components/Inputs/Password";
import useLoggedUser from "@hooks/useLoggedUser";
import { getCurrentUserAsync } from "@storage/index";

export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { setToken } = useLoggedUser();
    const { setLoading } = useLoading();
    const { showModal } = useModal();
    const navigator = useNavigation<any>();

    async function onLogin(data: any) {
        setLoading(true);
        const deviceId = await getUserDeviceId();
        const dataToRequest: LoginDto = {
            username: data.username,
            password: data.password,
            deviceId
        }

        const response = LoginRequest(dataToRequest);

        response.then((response) => {
            setToken(response.data);
            sendUserToCorrectRoute(getCurrentUserAsync().typeOfUser);
        }).catch((error) => {
            showModal({ modalType: ModalType.ERROR, message: error.response.data });
        }).finally(() => {
            setLoading(false);
        });

    }

    async function getUserDeviceId(): Promise<string> {
        messaging().registerDeviceForRemoteMessages();
        const deviceId = await messaging()
            .getToken()
            .then(token => {
                return token
            });

        return deviceId;
    }

    function sendUserToCorrectRoute(typeOfUser: TypeOfUser) {
        const routeName = returnRouteNameByProfileType(typeOfUser);

        navigator.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: routeName.mainContainer },
                ],
            })
        );
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
            <View style={{ gap: 10 }}>
                <DefaultInput
                    name="username"
                    control={control}
                    label={
                        <Text style={globalStyles.label}>
                            Nome de Usuário
                        </Text>
                    }
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
                <PasswordInput
                    name="password"
                    control={control}
                    label={
                        <Text style={globalStyles.label}>
                            Senha
                        </Text>
                    }
                    hasError={typeof errors.password?.message === 'string'}
                    rules={{
                        required: {
                            value: true,
                            message: "A Senha é obrigatória"
                        }
                    }} />
                {errors.password && (
                    <MessageError errorMessage={errors.password.message as string} />
                )}

                <Button label={"Entrar"} onClick={handleSubmit(onLogin)} />

                <Text style={{ ...text.common, textAlign: 'center' }}>
                    ou
                </Text>

                <Button label={"Quero ser uma babá"} onClick={() => { navigator.navigate('register', { isNannyRegister: true }) }}
                    textStyle={{ ...text.common, color: '#3E9FEB' }}
                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: '#3E9FEB' }} />
            </View>

        </View>
    )
}