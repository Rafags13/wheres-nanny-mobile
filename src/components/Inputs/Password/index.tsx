import { globalStyles } from "@styles/global.styles";
import { ReactNode, useState } from "react";
import { Control, FieldValues, RegisterOptions, useController } from "react-hook-form";
import { StyleProp, TextInput, TextStyle, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
    label?: ReactNode,
    name: string,
    control: Control<FieldValues, string>,
    defaultValue?: string,
    hasError?: boolean,
    style?: StyleProp<TextStyle>,
    placeholder?: string,
    rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"> | undefined
}

export default function PasswordInput({ control, defaultValue, rules, name, label, style, hasError = false, placeholder = '' }: Props) {
    const { field } = useController({
        control,
        defaultValue,
        rules,
        name,
    })

    const [showPassword, setShowPassword] = useState<boolean>(true);

    return (
        <View>
            {label}
            <View style={[globalStyles.input, hasError ? globalStyles.errorInput : {}, style]}>
                <TextInput
                    numberOfLines={1}
                    value={field.value}
                    onChangeText={field.onChange}
                    style={globalStyles.inputWithIcon}
                    secureTextEntry={showPassword}
                    placeholderTextColor={'#c4c4c4'}
                    placeholder={placeholder}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon name={showPassword ? 'eye' : 'eye-slash'} color={'#192553'} size={24} />
                </TouchableOpacity>
            </View>
        </View>
    )
}