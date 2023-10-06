import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import { Text, View } from 'react-native';
import Button from '@components/Button';
import { ModalContext, ModalContextType, useModal, ModalType } from '@context/ModalContext';
import { styles } from './style';
import { Dictionary } from '@models/dictionary';

type ModalTypes = 'success' | 'error' | 'question';

export default function CurrentModal() {
    const { isVisible, closeModal, modalInfo, sendResponse } = useModal();
    const style = styles(modalInfo.modalType === ModalType.ERROR);
    const dictionary: Dictionary<ModalTypes> = {
        [ModalType.SUCCESS]: require('@lottie/success.json'),
        [ModalType.ERROR]: require('@lottie/error.json'),
        [ModalType.QUESTION]: require('@lottie/question.json'),
    }

    return (
        <Modal isVisible={isVisible} animationIn={"fadeIn"} animationOut={"fadeOut"}>
            <View style={style.modalContainer}>
                <Lottie
                    source={dictionary[modalInfo.modalType]}
                    style={style.lottie}
                    autoPlay
                    loop={false}
                />

                <Text style={style.message}>{modalInfo.message}</Text>

                {modalInfo.modalType === 'question' ?
                    (
                        <View style={style.questionContainer}>
                            <Button label={'Sim'} onClick={() => { closeModal(); sendResponse(true); }} containerStyle={{ backgroundColor: '#218838', width: '45%' }} />
                            <Button label={'Cancelar'} onClick={() => { closeModal(); sendResponse(false); }} containerStyle={{ backgroundColor: '#C82333', width: '45%' }} />
                        </View>
                    ) : (
                        <Button label={"Ok"} onClick={closeModal} />
                    )}
            </View>
        </Modal>
    )
}