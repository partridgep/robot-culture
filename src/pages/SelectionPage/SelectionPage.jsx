import React from 'react';
import {Link} from 'react-router-dom';

function SelectionPage(props) {

    console.log('selection page');

    return (
        <div>
            <h1>ROBOT CULTURE</h1>
            <Link to="/robots/1">Select Robot</Link>
        </div>
    );
}

export default SelectionPage;