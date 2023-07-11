import { Control, FieldValues, RegisterOptions, useController, useFormContext, useWatch, } from "react-hook-form"
import { StyleProp, Text, TextInput, TextStyle, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { viaCepRequestGetByCep } from "../../services/apiRequests";
import { getCurrentUser } from "../../storage";
import { removeAllSpecialCharacters } from "../../assets/util/functions";

type Props = {
    label: string,
    displayNameLabel?: string,
    control: Control<FieldValues, string>,
    disabled?: boolean,
    hasError?: boolean,
    defaultValue?: string,
    placeholder?: string,
    style?: StyleProp<TextStyle>
    rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"> | undefined
}

export default function CepInput({ label, control, displayNameLabel = '', defaultValue = '', disabled = false, hasError = false, rules = undefined, placeholder = '', style = {} }: Props) {
    const { field } = useController({
        control,
        defaultValue,
        rules,
        name: label,
    });
    const { setValue } = useFormContext();

    async function searchAddressByCep() {
        const viacepResponse = await viaCepRequestGetByCep(removeAllSpecialCharacters(field.value));
        const { bairro, localidade, uf, logradouro } = viacepResponse.data;
        setValue("neighborhood", bairro);
        setValue("publicPlace", logradouro);
        setValue("city", localidade);
        setValue("state", uf);
    }

    return (
        <View >
            {displayNameLabel && (
                <Text style={styles.label}>
                    {displayNameLabel}
                </Text>
            )}
            <View style={[styles.commonInput, hasError ? styles.inputError : {}, disabled ? styles.inputDisabled : {}, style]}>
                <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    style={[styles.inputPassword, disabled ? styles.textInputDisabled : {}]}
                    placeholder={placeholder}
                    editable={!disabled}
                />
                <TouchableOpacity onPress={searchAddressByCep} disabled={disabled}>
                    <FontAwesome name={'search'} color={disabled ? '#c4c4c4' : '#192553'} size={24} />
                </TouchableOpacity>
            </View>
        </View>
    )
}