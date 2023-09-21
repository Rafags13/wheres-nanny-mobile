import { globalStyles } from "@styles/global.styles";
import { ReactNode } from "react";
import { Control, FieldValues, RegisterOptions, useController } from "react-hook-form";
import { StyleProp, Text, TextInput, TextStyle, View } from "react-native";
import styles from "./style";

type Props = {
    name: string,
    control: Control<FieldValues, string>,
    defaultValue?: string,
    rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"> | undefined,
    label?: ReactNode,
    multiline?: boolean,
    disabled?: boolean,
    hasError?: boolean,
    placeholder?: string,
    style?: StyleProp<TextStyle>
}

export default function DefaultInput({ control, defaultValue, rules, name, label, multiline = false, disabled = false, hasError = false, placeholder = '', style }: Props) {
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
                multiline={multiline}
                editable={!disabled}
                style={[styles.inputNonPassword, hasError ? globalStyles.errorInput : {}, disabled ? globalStyles.disabledInput : {}, style]}
                placeholder={placeholder}
            />
        </View>
    )
}