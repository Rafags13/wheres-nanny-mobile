import CheckBox from "@react-native-community/checkbox";
import { Control, FieldValues, useController } from "react-hook-form";
import { Text, View } from "react-native";
import { globalStyles } from "../../styles/global.styles";

type Props = {
    messageContent: string,
    control: Control<FieldValues, string>,
    label: string,
    hasError?: boolean
}

export default function Checkbox({ messageContent, control, label, hasError = false }: Props) {
    const { field } = useController({
        control,
        defaultValue: false,
        name: label,
    })

    return (
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <CheckBox
                disabled={false}
                value={field.value}
                onValueChange={field.onChange}
                tintColors={hasError ? { false: 'red' } : { true: 'black' }}
            />
            <Text style={globalStyles.commonText}>
                {messageContent}
            </Text>
        </View>
    )
}