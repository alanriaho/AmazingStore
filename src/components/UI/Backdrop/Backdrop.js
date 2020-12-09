import React from 'react';
import './Backdrop.scss';


// Props:
// show(boolean)
// closing(function): to close the backdrop when clicking it.


const Backdrop = props => (
    props.show ? <div className='backdrop' onClick={props.closing} ></div> : null
);

export default Backdrop;