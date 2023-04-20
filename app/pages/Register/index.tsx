import { useNavigation } from "@react-navigation/native";
import { ArrayPath, DeepPartial, FieldArray, FieldError, FieldErrors, FieldValues, FormState, Path, RegisterOptions, useForm, UseFormRegisterReturn } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import Input from "../../components/Input";
import { globalStyles } from "../../styles/global.styles";
import SectionList from 'react-native-tabs-section-list';
import CheckBox from '@react-native-community/checkbox';
import { styles } from "./style";
import { useState } from "react";
import Button from "../../components/Button";

function Sections(control: any) {
    return [
        {
            title: 'Dados Pessoais',
            data: [
                {
                    label: 'name',
                    displayNameLabel: 'Nome'
                },
                {
                    label: 'cpf',
                    displayNameLabel: 'CPF'
                },
                {
                    label: 'birthdayDate',
                    displayNameLabel: 'Data de Nascimento'
                },
            ]
        }, {
            title: 'Endereço',
            data: [
                {
                    label: 'cep',
                    displayNameLabel: 'CEP'
                },
                {
                    label: 'city',
                    displayNameLabel: 'Cidade'
                },
                {
                    label: 'state',
                    displayNameLabel: 'Estado'
                },
                {
                    label: 'neighborhood',
                    displayNameLabel: 'Bairro'
                },
                {
                    label: 'street',
                    displayNameLabel: 'Rua'
                },
                {
                    label: 'number',
                    displayNameLabel: 'Número'
                },
                {
                    label: 'complement',
                    displayNameLabel: 'Complemento'
                }
            ]
        },
        {
            title: 'Termos',
            data: [
                {
                    label: 'checkbox',
                    content: 'Confirmo em oferecer todos os dados acima e me comprometo, em caso de problemas judiciais, em concedê-los.'
                }
            ]
        }
    ]
}

export default function Register() {
    const { control, handleSubmit } = useForm();
    const [toggleCheckbox, setToggleCheckbox] = useState<boolean>();
    const navigator = useNavigation<any>();

    function onRegister() {
        navigator.navigate('login')
    }



    return (
        <View style={styles.container}>
            <Text style={globalStyles.title}>
                Registrar
            </Text>

            <SectionList
                sections={Sections(control)}
                keyExtractor={item => item.label}
                scrollToLocationOffset={50}
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
                                <Button label={"Cadastrar"} onClick={onRegister} />
                            </>
                        )
                    }

                    return (
                        <Input label={item.label} control={control} displayNameLabel={item.displayNameLabel} />
                    )
                }}
            />



        </View>
    )
}