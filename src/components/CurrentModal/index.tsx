import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import { Text, View } from 'react-native';
import Button from '../Button';
import { useContext } from 'react';
import { ModalContext, ModalContextType } from '../../context/ModalContext';
import { globalStyles } from '../../styles/global.styles';
import { styles } from './style';

export default function CurrentModal() {
    const { isVisible, closeModal, modalInfo, questionStatus, sendResponse } = useContext(ModalContext) as ModalContextType;
    const dictionary = {
        'success': require('../../lottie/success.json'),
        'error': require('../../lottie/error.json'),
        'question': require('../../lottie/question.json'),
    }

    return (
        <Modal isVisible={isVisible} animationIn={"fadeIn"} animationOut={"fadeOut"}>
            <View style={styles.modalContainer}>
                <Lottie
                    source={dictionary[modalInfo.modalType]}
                    style={styles.lottie}
                    autoPlay
                    loop={false}
                />

                <Text style={[globalStyles.commonText, modalInfo.modalType === 'error' ? { color: 'red' } : {}, { textAlign: 'center' }, { marginBottom: 15 }]}>{modalInfo.message}</Text>

                {modalInfo.modalType === 'question' ?
                    (
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button label={'Sim'} onClick={() => { questionStatus(true); closeModal(); sendResponse(true); }} containerStyle={{ backgroundColor: '#218838', width: '45%' }} />
                            <Button label={'Cancelar'} onClick={() => { questionStatus(false); closeModal(); sendResponse(false); }} containerStyle={{ backgroundColor: '#C82333', width: '45%' }} />
                        </View>
                    ) : (
                        <Button label={"Ok"} onClick={closeModal} />
                    )}
            </View>
        </Modal>
    )
}