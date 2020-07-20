import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../../components/Header/Header';

function SelectionPage(props) {

    const robotLinks = props.robots.map(robot => (
        <Link
            to={'/'+robot.__id}
            key={robot.__id}
        >
            {robot.name}
        </Link>
        )
    )

    return (
        <div className='SelectionPage'>
            <Header />
            <Link to="/robots/1">Select Robot</Link>
            {props.robots && props.robots.length > 0 ? robotLinks : 'Loading...'}
        </div>
    );
}

export default SelectionPage;