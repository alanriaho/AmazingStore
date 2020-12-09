import React from 'react';
import mainLogo from './logo.png';

import './Logo.scss';


const Logo = () => (
    <div className='logo'>
        <img src={mainLogo} alt='Amazing Store Logo' />
    </div>
);

export default Logo;