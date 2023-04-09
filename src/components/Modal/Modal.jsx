import { useEffect } from "react";
import { Overlay, ModalContainer, ModalImg, CloseModalBtn } from "./Modal.styled";
import { ImCross } from "react-icons/im";

function Modal({ query, bigImgUrl, onClose }) {
    const handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            return onClose();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    }, [bigImgUrl])

    useEffect(() => {
        return () => { window.removeEventListener('keydown', handleKeyDown); };
    }, [handleKeyDown])


    return (
        <Overlay>
            <ModalContainer>
                <ModalImg src={bigImgUrl} alt={query} />
            </ModalContainer>
            <CloseModalBtn><ImCross size={28}/></CloseModalBtn>
        </Overlay>
    )
}

export default Modal;