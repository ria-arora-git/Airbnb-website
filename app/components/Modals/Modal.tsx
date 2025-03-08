'use client';
import { useCallback, useEffect, useState } from "react";



interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onsubmit?: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryaction?: () => void;
    secondaryLabel?: string;
}

const Modal:React.FC<ModalProps>= ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    ActionLabel,
    disabled,
    SecondaryAction,
    SecondaryLabel
}) => {

    const [ShowModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    },[isOpen]);

    const handleClose = useCallback(() => {
        if (disabled){
            return
        }

        setShowModal(false);
        setTimeout(() =>{
            onClose();
        },
            300);
    },[disabled,onClose]);

    const handleSubmit = useCallback(()=>{
        if (disabled){
            return;
        }

        onSubmit();
    },[disabled,onSubmit]);

    const handleSecondaryAction = useCallback(()=>{
        if (disabled || !SecondaryAction){
            return;
        }

        SecondaryAction();
    },[disabled,SecondaryAction]);

    if (isOpen) {
        return null;
    }
    
    return ( 
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70  ">

            </div>
        </>
     );
}
 
export default Modal;