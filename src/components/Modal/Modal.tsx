import React, { useCallback, useEffect} from "react";
import {createPortal} from 'react-dom';
import style from './styles/modal.module.scss';

const modalRoot=document.querySelector('#modal-root') as HTMLElement;

interface IProps {
    children:React.ReactNode,
    onClose:() => void
}
export default function Modal({children,onClose}:IProps){

    const closeModalEscape =useCallback((e: { code: string; }) => {

        if (e.code === "Escape") {
            onClose();
        }
    },[onClose])


    useEffect(()=> {
        window.addEventListener('keydown', closeModalEscape);
        return () => {
            window.removeEventListener('keydown', closeModalEscape)
        }
    },[closeModalEscape]);


    const closeClickModal=(e:React.SyntheticEvent) => {
        if(e.target === e.currentTarget) {
            onClose();
        }
    }

    return createPortal(<div className={style.Modal__backdrop} onClick={closeClickModal}>
        <div className={style.Modal__content}>{children}</div>
    </div>,modalRoot)
}
