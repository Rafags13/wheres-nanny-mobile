import { Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FormProvider, useForm } from "react-hook-form";

import SectionList from 'react-native-tabs-section-list';
import Input from "@components/Input";
import Button from "@components/Button";
import Checkbox from "@components/Checkbox";
import MessageError from "@components/MessageError";

import { globalStyles } from "@styles/global.styles";
import { styles } from "./style";

import { COMMON_USER_SECTION, NANNY_SECTION } from '@util/contants';
import { createModelRegisterCommonUser, createModelRegisterNanny } from "@util/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema, registerValidationSchemaNanny } from "@util/yupValidations";
import ImagePicker from "@components/ImagePicker";
import DocumentPick from "@components/DocumentPick";
import { useContext } from "react";
import { ModalContext, ModalContextType } from "@context/ModalContext";
import { LoadingContextType, LoadingContext } from "@context/LoadingContext";
import { registerUser } from "@services/requests/UserRequests";
import { ScrollView } from "react-native";
import CepInput from "@components/CepInput";
import { DeepPartial, FormState, FieldValues, ArrayPath, FieldArray, FieldErrors, Path, RegisterOptions, UseFormRegisterReturn, FieldError } from "react-hook-form/dist/types";

export default function Register() {
    const { setLoading } = useContext(LoadingContext) as LoadingContextType;

    const { params } = useRoute<RouteProp<{ params: { isNannyRegister: boolean } }, 'params'>>();

    const registerForm =
        useForm({
            resolver: yupResolver(params?.isNannyRegister ? registerValidationSchemaNanny : registerValidationSchema)
        });
    const navigator = useNavigation<any>();

    const { showModal } = useContext(ModalContext) as ModalContextType;

    async function onRegister(data: any) {
        setLoading(true);
        console.log(data)
        const userToRegisteSpecified =
            params?.isNannyRegister ?
                createModelRegisterNanny(data) :
                createModelRegisterCommonUser(data);

        const response = registerUser(params?.isNannyRegister, userToRegisteSpecified)

        await response.then((response) => {
            setLoading(false);
            showModal({ message: response.data, modalType: 'success' });
        }).catch((error) => {
            setLoading(false);
            showModal({ message: 'Não foi possível registrar o usuário. Tente Novamente mais tarde.', modalType: 'error' });
        }).finally(() => {
            navigator.navigate('login');
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={globalStyles.title}>
                    Registrar
                </Text>

                <Text style={[globalStyles.subtitle, { marginTop: 20, marginBottom: 15 }]}>Dados Pessoais</Text>
                <FormProvider {...registerForm}>


                    <View style={{ marginBottom: 15 }}>
                        <Input
                            label={'fullname'}
                            control={registerForm.control}
                            displayNameLabel={'Nome Completo'}
                            hasError={registerForm.formState.errors?.fullname?.message !== undefined}
                        />

                        {registerForm.formState.errors?.fullname?.message &&
                            <MessageError errorMessage={registerForm.formState.errors?.fullname?.message as string} />
                        }
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Input
                            label={'username'}
                            control={registerForm.control}
                            displayNameLabel={'Apelido (Nome de usuário)'}
                            hasError={registerForm.formState.errors?.username?.message !== undefined}
                        />

                        {registerForm.formState.errors?.username?.message &&
                            <MessageError errorMessage={registerForm.formState.errors?.username?.message as string} />
                        }
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Input
                            label={'email'}
                            control={registerForm.control}
                            displayNameLabel={'E-mail'}
                            hasError={registerForm.formState.errors?.email?.message !== undefined}
                        />

                        {registerForm.formState.errors?.email?.message &&
                            <MessageError errorMessage={registerForm.formState.errors?.email?.message as string} />
                        }
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Input
                            label={'cellphone'}
                            control={registerForm.control}
                            displayNameLabel={'Telefone'}
                            hasError={registerForm.formState.errors?.cellphone?.message !== undefined}
                        />

                        {registerForm.formState.errors?.cellphone?.message &&
                            <MessageError errorMessage={registerForm.formState.errors?.cellphone?.message as string} />
                        }
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Input
                            label={'cpf'}
                            control={registerForm.control}
                            displayNameLabel={'CPF'}
                            hasError={registerForm.formState.errors?.cpf?.message !== undefined}
                        />

                        {registerForm.formState.errors?.cpf?.message &&
                            <MessageError errorMessage={registerForm.formState.errors?.cpf?.message as string} />
                        }
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Input
                            label={'birthdayDate'}
                            control={registerForm.control}
                            displayNameLabel={'Data de Nascimento'}
                            hasError={registerForm.formState.errors?.birthdayDate?.message !== undefined}
                        />

                        {registerForm.formState.errors?.birthdayDate?.message &&
                            <MessageError errorMessage={registerForm.formState.errors?.birthdayDate?.message as string} />
                        }
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Input
                            label={'password'}
                            control={registerForm.control}
                            displayNameLabel={'Senha'}
                            hasError={registerForm.formState.errors?.password?.message !== undefined}
                            isPasswordInput
                        />

                        {registerForm.formState.errors?.password?.message &&
                            <MessageError errorMessage={registerForm.formState.errors?.password?.message as string} />
                        }
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Input
                            label={'repeatPassword'}
                            control={registerForm.control}
                            displayNameLabel={'Digite a Senha Novamente'}
                            hasError={registerForm.formState.errors?.repeatPassword?.message !== undefined}
                            isPasswordInput
                        />

                        {registerForm.formState.errors?.repeatPassword?.message &&
                            <MessageError errorMessage={registerForm.formState.errors?.repeatPassword?.message as string} />
                        }
                    </View>

                    <Text style={[globalStyles.subtitle, { marginTop: 20, marginBottom: 15 }]}>Endereço</Text>

                    <View style={{ marginBottom: 15 }}>
                        <CepInput
                            label={"cep"}
                            control={registerForm.control}
                            displayNameLabel={'Cep'}
                            hasError={registerForm.formState.errors?.cep?.message !== undefined}
                        />

                        {registerForm.formState.errors?.cep?.message &&
                            <MessageError errorMessage={registerForm.formState.errors?.cep?.message as string} />
                        }
                    </View>

                    <Text style={[globalStyles.subtitle, { marginTop: 20, marginBottom: 15 }]}>Foto Pessoal</Text>

                    <View style={{ marginBottom: 15 }}>
                        <ImagePicker control={registerForm.control} hasError={registerForm.formState.errors?.photo?.message !== undefined} label={'photo'} />
                        {registerForm.formState.errors?.photo?.message &&
                            <MessageError errorMessage={registerForm.formState.errors?.photo?.message as string} />
                        }
                    </View>

                    {params?.isNannyRegister && (
                        <>
                            <Text style={[globalStyles.subtitle, { marginTop: 20, marginBottom: 15 }]}>Documentos</Text>

                            <View style={{ marginBottom: 15 }}>
                                <DocumentPick
                                    control={registerForm.control}
                                    label={'Comprovante de residência'}
                                    documentIdentifier={'proofOfAddress'}
                                    hasError={registerForm.formState.errors?.proofOfAddress?.message !== undefined}
                                />
                                {registerForm.formState.errors?.proofOfAddress?.message &&
                                    <MessageError errorMessage={registerForm.formState.errors?.proofOfAddress?.message as string} />
                                }
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <DocumentPick
                                    control={registerForm.control}
                                    label={'Antecedentes criminais'}
                                    documentIdentifier={'criminalRecord'}
                                    hasError={registerForm.formState.errors?.criminalRecord?.message !== undefined}
                                />
                                {registerForm.formState.errors?.criminalRecord?.message &&
                                    <MessageError errorMessage={registerForm.formState.errors?.criminalRecord?.message as string} />
                                }
                            </View>

                        </>
                    )}

                    <Text style={[globalStyles.subtitle, { marginTop: 20, marginBottom: 15 }]}>Aceite os termos</Text>

                    <Checkbox
                        messageContent={'Confirmo em oferecer todos os dados acima e me comprometo, em caso de causas judiciais, em concedê-los.'}
                        control={registerForm.control} label={'checkbox'}
                        hasError={registerForm.formState.errors?.checkbox?.message !== undefined}
                    />

                    {registerForm.formState.errors?.checkbox?.message &&
                        <MessageError errorMessage={registerForm.formState.errors?.checkbox?.message as string} />
                    }

                    <Button label={"Cadastrar"} onClick={registerForm.handleSubmit(onRegister)} containerStyle={{ marginVertical: 15 }} />
                </FormProvider>
            </ScrollView>
        </View>
    )
}