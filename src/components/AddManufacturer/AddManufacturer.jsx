import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AddManufacturer.module.css';

const AddManufacturer = (props) => {

    return (
        <div className={styles.AddManufacturer}>
            <form onSubmit={props.handleSubmit} >
                <div className={styles.field}>
                    <input type="text" placeholder="Manufacturer" value={props.manufacturer} name="manufacturer" onChange={props.handleChange} />
                </div>
                <div className={styles.buttons}>
                    <Link onClick={props.handleSkip}>Skip</Link>
                    <button disabled={!(props.manufacturer.length > 0)}>Next</button>&nbsp;&nbsp;
                </div>
            </form>
        </div>

    )
}


export default AddManufacturer;