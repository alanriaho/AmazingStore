import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import CloseButton from '../CloseButton/CloseButton';
import './Modal.scss';

//Props:
//show(boolean)
//modalClosing(function)

const Modal = props => (

    <>
        <Backdrop 
            show = {props.show} 
            closing = {props.modalClosing} 
        />
        <div 
            className='modal'
            style={{
                display: props.show ? 'block' : 'none',
            }}
        >
            <CloseButton 
                closeClicked={props.modalClosing}
                color='#000000' />
            {props.children}
        </div>
    </>
);

export default Modal;