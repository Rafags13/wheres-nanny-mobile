import { useState } from "react";
import { Control, FieldValues, RegisterOptions, useController } from "react-hook-form";
import { StyleProp, Text, TextInput, TextStyle, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
    label: string,
    control: Control<FieldValues, string>,
    style?: StyleProp<TextStyle>,
    disabled?: boolean,
    displayNameLabel?: string,
    isPasswordInput?: boolean,
    placeholder?: string,
    hasError?: boolean,
    rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"> | undefined
}

export default function Input({ label, control, disabled = false, displayNameLabel = '', isPasswordInput = false, hasError = false, rules = undefined, placeholder = '', style }: Props) {
    const { field } = useController({
        control,
        defaultValue: '',
        rules,
        name: label,
    })

    const [showPassword, setShowPassword] = useState<boolean>(true);

    if (isPasswordInput) {
        return (
            <View>
                {displayNameLabel && (
                    <Text style={styles.label}>
                        {displayNameLabel}
                    </Text>
                )}
                <View style={[styles.commonInput, hasError ? styles.inputError : {}, style]}>
                    <TextInput
                        value={field.value}
                        onChangeText={field.onChange}
                        style={styles.inputPassword}
                        secureTextEntry={showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon name={showPassword ? 'eye' : 'eye-slash'} color={'#192553'} size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View >
            {displayNameLabel && (
                <Text style={styles.label}>
                    {displayNameLabel}
                </Text>
            )}
            <TextInput
                value={field.value}
                onChangeText={field.onChange}
                editable={!disabled}
                style={[styles.inputNonPassword, hasError ? styles.inputError : {}, disabled ? styles.inputDisabled : {}, style]}
                placeholder={placeholder}
            />
        </View>
    )
}