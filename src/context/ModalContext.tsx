import { createContext, ReactNode, useContext, useState } from "react";

export type ModalContextType = {
    isVisible: boolean,
    showModal: (modalInfo: ModalInfo) => void,
    sendResponse: (accepted: boolean) => void,
    closeModal: () => void,
    modalInfo: ModalInfo
}

export const ModalContext = createContext<ModalContextType | null>(null);

type Props = {
    children: ReactNode
}

export enum ModalType {
    ERROR = 'error',
    SUCCESS = 'success',
    QUESTION = 'question',
};

type ModalInfo = {
    message: string,
    modalType: ModalType,
    function?: (value: any) => void
}

export default function ModalProvider({ children }: Props) {
    const [isVisible, setOpenModal] = useState<boolean>(false);
    const [modalInfo, setModalInfo] = useState<ModalInfo>({ message: '', modalType: ModalType.SUCCESS, function: () => { } });

    function showModal(modalInfo: ModalInfo) {
        setOpenModal(true);
        setModalInfo(modalInfo);
    }

    function closeModal() {
        setOpenModal(false);
    }

    function sendResponse(accepted: boolean) {
        if (modalInfo.function) {
            modalInfo?.function(accepted);
        }
    }


    return (
        <ModalContext.Provider value={{ isVisible, showModal, closeModal, modalInfo, sendResponse }}>{children}</ModalContext.Provider>
    )

}

export const useModal = () => {
    const context = useContext(ModalContext);

    if (!context)
        throw new Error("useModal must be used within a ModalProvider");

    return context;
}