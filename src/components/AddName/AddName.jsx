import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AddName.module.css';

const AddName = (props) => {

    return (
        <div className={styles.addName}>
            <form onSubmit={props.handleSubmit} >
                <div className={styles.field}>
                    <input type="text" placeholder="Name" value={props.name} name="name" onChange={props.handleChange} />
                </div>
                <div className={styles.buttons}>
                    <Link to='/robots'>Cancel</Link>
                    <button disabled={!(props.name.length > 0)}>Next</button>&nbsp;&nbsp;
                </div>
            </form>
        </div>

    )
}


export default AddName;
