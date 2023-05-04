import { useState } from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getPhotoByBase64 } from "../../assets/util/functions";
import { common, styles } from "./style";

type Props = {
    base64Image: string,
    setBase64Image: (value: string) => void,
}

export default function ImagePicker({ base64Image, setBase64Image }: Props) {
    const [hasImageSelected, setHasImageSelected] = useState<boolean>(false);

    async function getSelectedPhoto() {
        const base64Uri = await getPhotoByBase64() as string;
        setBase64Image(base64Uri);
        setHasImageSelected(!hasImageSelected);
    }

    function removeSelectedPhoto() {
        setBase64Image('');
        setHasImageSelected(!hasImageSelected);
    }

    return hasImageSelected ?
        (
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: `data:image/png;base64,${base64Image}`
                    }}
                    style={styles.image}
                />
                <TouchableOpacity style={styles.removeIcon} onPress={removeSelectedPhoto}>
                    <FontAwesome name="remove" size={14} color={'#c4c4c4'} />
                </TouchableOpacity>
            </View>
        ) : (
            <View>
                <TouchableOpacity style={common.imagePickerContainer} onPress={getSelectedPhoto}>
                    <Entypo name="camera" size={64} color={'#c4c4c4'} />
                </TouchableOpacity>
            </View>
        )


}