import { useContext } from "react";
import { Control, FieldValues, useController } from "react-hook-form";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getPhotoByBase64 } from "@util/functions";
import { ModalContextType, ModalContext, ModalType } from "@context/ModalContext";
import { common, styles } from "./style";

type Props = {
    control: Control<FieldValues, string>,
    defaultValue?: string,
    hasError?: boolean,
    label: string,
}

export default function ImagePicker({ control, label, hasError = false, defaultValue = '' }: Props) {
    const { showModal } = useContext(ModalContext) as ModalContextType;
    const { field } = useController({
        control,
        defaultValue,
        name: 'photo',
    })

    async function getSelectedPhoto() {
        await getPhotoByBase64().then((photo) => {
            field.onChange(photo);
        }).catch((error: Error) => {
            showModal({ modalType: ModalType.ERROR, message: error.message })
        })
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