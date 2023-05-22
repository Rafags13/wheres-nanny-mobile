import { Alert, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import SectionList from 'react-native-tabs-section-list';
import Input from "../../components/Input";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import MessageError from "../../components/MessageError";

import { globalStyles } from "../../styles/global.styles";
import { styles } from "./style";

import { COMMON_USER_SECTION, NANNY_SECTION } from '../../assets/util/contants';
import { createModelRegisterCommonUser, createModelRegisterNanny } from "../../assets/util/functions";
import { postData } from "../../services/apiRequests";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema, registerValidationSchemaNanny } from "../../assets/util/yupValidations";
import ImagePicker from "../../components/ImagePicker";
import DocumentPick from "../../components/DocumentPick";

export default function Register() {
    const { params } = useRoute<RouteProp<{ params: { isNannyRegister: boolean } }, 'params'>>();
    const { control, handleSubmit, formState: { errors } } =
        useForm({
            resolver: yupResolver(params?.isNannyRegister ? registerValidationSchemaNanny : registerValidationSchema)
        });
    const navigator = useNavigation<any>();
    console.log(params?.isNannyRegister ? true : false)

    async function onRegister(data: any) {
        console.log(data)
        const userToRegisteSpecified =
            params?.isNannyRegister ?
                createModelRegisterNanny(data) :
                createModelRegisterCommonUser(data);

        await postData(`User/${params?.isNannyRegister ? 'RegisterNanny' : 'RegisterUser'}`, userToRegisteSpecified).then((response) => {
            Alert.alert("Usuário cadastrado no sistema com sucesso");
        }).catch((error) => console.log(error.response.request._response));
        navigator.navigate('login')
    }

    const ComponentToReturn = (item: any, index: number): JSX.Element => {
        switch (item.label) {
            case 'checkbox':
                return (
                    <>
                        <Checkbox key={index} messageContent={item.content} control={control} label={item.label} hasError={errors?.checkbox?.message !== undefined} />
                        {errors?.checkbox?.message &&
                            <MessageError errorMessage={errors?.checkbox?.message as string} />
                        }
                        <Button label={"Cadastrar"} onClick={handleSubmit(onRegister)} />
                    </>
                )
            case 'photo':
                return (
                    <>
                        <ImagePicker key={index} control={control} hasError={errors?.photo?.message !== undefined} label={item.label} />
                        {errors?.photo?.message &&
                            <MessageError errorMessage={errors?.photo?.message as string} />
                        }
                    </>
                )
            case 'document':
                return (
                    <>
                        <DocumentPick control={control} label={item.typeOfDocument} documentIdentifier={item.documentIdentifier} hasError={errors?.[item.documentIdentifier]?.message !== undefined} />
                        {errors?.[item.documentIdentifier]?.message &&
                            <MessageError errorMessage={errors?.[item.documentIdentifier]?.message as string} />
                        }
                    </>
                )
            default:
                return (
                    <View style={{ marginBottom: 15 }}>
                        <Input
                            key={index}
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
        }
    }

    return (
        <View style={styles.container}>
            <Text style={globalStyles.title}>
                Registrar
            </Text>

            <SectionList
                sections={params?.isNannyRegister ? NANNY_SECTION : COMMON_USER_SECTION} // all layout
                scrollToOverflowEnabled={false}
                keyExtractor={(item, index) => index.toString()}
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
                                { color: isActive ? '#192553' : '#9e9e9e' }
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
                renderItem={({ item, index }) => {
                    return ComponentToReturn(item, index)
                }}
            />

        </View>
    )
}