import React from 'react';
import {Link} from 'react-router-dom';

function LandPage(props) {

    console.log('homepage');

    return (
        <div>
            <h1 >ROBOT CULTURE</h1>
            <h2>Meet every robot from pop-culture</h2>

            <Link to="/robots">Enter Database</Link>
        </div>
    );
}

export default LandPage;