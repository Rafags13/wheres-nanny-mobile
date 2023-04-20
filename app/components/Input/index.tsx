import { forwardRef, useState } from "react";
import { Control, FieldValues, useController } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
    label: string,
    control: Control<FieldValues, string>,
    displayNameLabel: string,
    isPasswordInput?: boolean
}

export default function Input({ label, control, displayNameLabel, isPasswordInput = false }: Props) {
    const { field } = useController({
        control,
        defaultValue: '',
        name: label
    })

    const [showPassword, setShowPassword] = useState<boolean>(true);

    if (isPasswordInput) {
        return (
            <>
                <Text style={styles.label}>
                    {displayNameLabel}
                </Text>
                <View style={styles.input}>
                    <TextInput
                        value={field.value}
                        onChangeText={field.onChange}
                        style={styles.inputPassword}
                        secureTextEntry={showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon name={showPassword ? 'eye' : 'eye-slash'} color={'black'} size={24} />
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    return (
        <>
            <Text style={styles.label}>
                {displayNameLabel}
            </Text>
            <TextInput
                value={field.value}
                onChangeText={field.onChange}
                style={[styles.input, styles.inputNonPassword]}
            />
        </>
    )
}