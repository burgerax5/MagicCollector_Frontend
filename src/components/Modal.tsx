import React from 'react';
import '../styles/modal.css'
import { FiX } from 'react-icons/fi'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/rootReducer';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    if (!show)
        return null;

    return (
        <div className="modal-overlay" onClick={onClose} style={!isDarkMode ? { background: "rgba(0,0,0,0.25)" } : {}}>
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