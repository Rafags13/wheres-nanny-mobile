import { Alert, Text, TouchableOpacity, View } from "react-native";
import DocumentPicker, { DocumentPickerOptions } from 'react-native-document-picker';
import { styles } from "./style";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Control, FieldValues, useController } from "react-hook-form";
import { SupportedPlatforms } from "react-native-document-picker/lib/typescript/fileTypes";
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import { replacePdfExtensioNames } from "../../assets/util/functions";
import { useState } from "react";

type Props = {
    control: Control<FieldValues, string>,
    label: string,
    documentIdentifier: string,
    hasError?: boolean
}

export default function DocumentPick({ control, label, documentIdentifier, hasError = false }: Props) {
    const { field } = useController({
        control,
        defaultValue: '',
        name: documentIdentifier,
    })
    const [documentName, setDocumentName] = useState<string>('');

    async function getDocument() {
        var options: DocumentPickerOptions<SupportedPlatforms> = {
            copyTo: 'documentDirectory'
        }
        const document = await DocumentPicker.pickSingle(options).then(async (file) => {
            return file
        })

        const result = await RNFetchBlob.fs.readFile(document.fileCopyUri as string, 'base64');
        setDocumentName(replacePdfExtensioNames(document.name as string));
        field.onChange(result);
    }

    function removeDocument() {
        field.onChange('');
        setDocumentName('');
    }
    return (
        <View>
            <Text style={styles.labelToDocument}>
                {label}
            </Text>
            {documentName ?
                (
                    <>
                        <View key={label} style={styles.documentPickerContainer}>
                            <AntDesign name="pdffile1" size={32} color={'white'} style={styles.iconContainer} />
                            <Text numberOfLines={1} style={[styles.labelToDocument, { marginLeft: 10, maxWidth: '80%', marginTop: 0 }]}>
                                {documentName}
                            </Text>
                            <TouchableOpacity style={styles.removeIcon} onPress={removeDocument}>
                                <FontAwesome name="remove" size={14} color={'#c4c4c4'} />
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (

                    <TouchableOpacity key={label} onPress={getDocument} style={[styles.documentPickerContainer, hasError ? { borderColor: 'red' } : {}]}>
                        <Feather name="file-plus" size={32} color={'white'} style={styles.iconContainer} />
                        <Text style={[styles.labelToDocument, { marginLeft: 10 }]}>
                            Clique aqui para selecionar
                        </Text>
                    </TouchableOpacity>
                )
            }
        </View>

    )
}