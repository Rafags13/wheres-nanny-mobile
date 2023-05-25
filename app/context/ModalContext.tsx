import { createContext, ReactNode, useState } from "react";

export type ModalContextType = {
    isVisible: boolean,
    showModal: (modalInfo: ModalInfo) => void,
    closeModal: () => void,
    modalInfo: ModalInfo
}

export const ModalContext = createContext<ModalContextType | null>(null);

type Props = {
    children: ReactNode
}

type ModalType = 'error' | 'success';

type ModalInfo = {
    message: string,
    modalType: ModalType,
}

export default function ModalProvider({ children }: Props) {
    const [isVisible, setOpenModal] = useState<boolean>(false);
    const [modalInfo, setModalInfo] = useState<ModalInfo>({ message: '', modalType: 'success' });

    function showModal(modalInfo: ModalInfo) {
        setOpenModal(true);
        setModalInfo(modalInfo);
    }

    function closeModal() {
        setOpenModal(false);
    }

    return (
        <ModalContext.Provider value={{ isVisible, showModal, closeModal, modalInfo }}>{children}</ModalContext.Provider>
    )

}