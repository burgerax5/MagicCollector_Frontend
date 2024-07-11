import React from 'react';
import '../styles/modal.css'
import { FiX } from 'react-icons/fi'

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" type="button" onClick={onClose}>
                    <FiX />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;