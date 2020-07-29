import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './AddManufacturer.module.css';

export class AddManufacturer extends Component {

    render() {
        return (
            <div className={styles.addManufacturer}>
                <p className={styles.message}>Who made this robot?</p>
                <form onSubmit={this.props.handleSubmit} >
                    <div className={styles.field}>
                        <input type="text" placeholder="Manufacturer" value={this.props.manufacturer} name="manufacturer" autoComplete="off" onChange={this.props.handleChange} />
                    </div>
                    <div className={styles.buttons}>
                        <Link onClick={this.props.handleSkip}>Skip</Link>
                        <button disabled={!(this.props.manufacturer.length > 0)}>Next</button>&nbsp;&nbsp;
                    </div>
                </form>
            </div>
    
        )
    }
}


export default AddManufacturer;