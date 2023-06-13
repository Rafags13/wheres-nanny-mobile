import { Control, FieldValues, useController } from "react-hook-form";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getPhotoByBase64 } from "../../assets/util/functions";
import { common, styles } from "./style";

type Props = {
    control: Control<FieldValues, string>,
    hasError?: boolean,
    label: string,
}

export default function ImagePicker({ control, label, hasError = false }: Props) {
    const { field } = useController({
        control,
        defaultValue: '',
        name: 'photo',
    })

    async function getSelectedPhoto() {
        const base64Uri = await getPhotoByBase64() as string;
        field.onChange(base64Uri);
    }
    function removeSelectedPhoto() {
        field.onChange('');
    }

    return field.value ?
        (
            <View style={[styles.imageContainer, hasError ? { borderColor: 'red' } : {}]}>
                <Image
                    source={{
                        uri: `data:image/png;base64,${field.value}`
                    }}
                    style={styles.image}
                />
                <TouchableOpacity style={styles.removeIcon} onPress={removeSelectedPhoto}>
                    <FontAwesome name="remove" size={14} color={'#c4c4c4'} />
                </TouchableOpacity>
            </View>
        ) : (
            <View>
                <TouchableOpacity style={[common.imagePickerContainer, hasError ? { borderColor: 'red' } : {}]} onPress={getSelectedPhoto}>
                    <Entypo name="camera" size={64} color={'#3E9FEB'} />
                </TouchableOpacity>
            </View>
        )


}