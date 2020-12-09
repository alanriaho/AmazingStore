import React from 'react';

import SearchBox from '../SearchBox/SearchBox';
import './Jumbotron.scss';


const Jumbotron = () => (
    <div className='jumbotron'>
        <h1>
            What's your next purchase?
        </h1>
        <div className='search-box-container'>
            <SearchBox />
        </div>
    </div>
);

export default Jumbotron;