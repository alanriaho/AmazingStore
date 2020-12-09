import React from 'react';

import './MenuButton.scss';

//Props:
//color(string), by default is white.

const MenuButton = (props) => (
    <div className='menu-button'>
        <div className='menu-bar' style={{backgroundColor: props.color}}></div>
        <div className='menu-bar' style={{backgroundColor: props.color}}></div>
        <div className='menu-bar' style={{backgroundColor: props.color}}></div>
    </div>
);

export default MenuButton;