import React from 'react';

import './CloseButton.scss';

//Props:
//closeClicked(function)
//color(string) by default is white

const CloseButton = props => (
    <div className='close-button'>
        <span onClick={props.closeClicked} style={{color: props.color}}></span>
    </div>
);

export default CloseButton;