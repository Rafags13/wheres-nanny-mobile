import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import { Text, View } from 'react-native';
import Button from '../Button';
import { useContext } from 'react';
import { ModalContext, ModalContextType } from '../../context/ModalContext';
import { globalStyles } from '../../styles/global.styles';
import { styles } from './style';

export default function CurrentModal() {
    const { isVisible, closeModal, modalInfo } = useContext(ModalContext) as ModalContextType;

    return (
        <Modal isVisible={isVisible} animationIn={"fadeIn"} animationOut={"fadeOut"}>
            <View style={styles.modalContainer}>
                <Lottie
                    source={modalInfo.modalType === 'success' ? require('../../lottie/success.json') : require('../../lottie/error.json')}
                    style={styles.lottie}
                    autoPlay
                    loop={false}
                />

                <Text style={[globalStyles.commonText, modalInfo.modalType === 'error' ? { color: 'red' } : {}, { textAlign: 'center' }, { marginBottom: 15 }]}>{modalInfo.message}</Text>

                <Button label={"Ok"} onClick={closeModal} />
            </View>
        </Modal>
    )
}