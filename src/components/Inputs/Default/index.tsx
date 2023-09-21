import { globalStyles } from "@styles/global.styles";
import { ReactNode } from "react";
import { Control, FieldValues, RegisterOptions, useController } from "react-hook-form";
import { StyleProp, Text, TextInput, TextInputProps, TextStyle, View } from "react-native";
import styles from "./style";

interface InputProps extends Omit<TextInputProps, 'style'> {
    name: string,
    control: Control<FieldValues, string>,
    defaultValue?: string,
    rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"> | undefined,
    label?: ReactNode,
    hasError?: boolean,
    disabled?: boolean,
    style?: StyleProp<TextStyle>
}

export default function DefaultInput({ control, defaultValue, rules, name, label, hasError = false, disabled = false, style, ...props }: InputProps) {
    const { field } = useController({
        control,
        defaultValue,
        rules,
        name,
    })

    return (
        <View >
            {label}
            <TextInput
                value={field.value}
                onChangeText={field.onChange}
                editable={!disabled}
                style={[styles.inputNonPassword, hasError ? globalStyles.errorInput : {}, disabled ? globalStyles.disabledInput : {}, style]}
                {...props}
            />
        </View>
    )
}