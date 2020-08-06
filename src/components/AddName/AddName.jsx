import React from 'react';
import styles from './AddName.module.css';

function doesNameExist(name, robots) {
    for (var robot of robots) {
        if (robot.name.toLowerCase() === name.toLowerCase()) {
            return true
        }
    }
}

const AddName = (props) => {

    return (
        <div className={styles.addName}>
            {doesNameExist(props.name, props.robots) ? 
                <p className={styles.alert}>Name already exists</p>
                    :
                <p className={styles.message}>What is this robot called?</p>
                }

            <form onSubmit={props.handleSubmit} >
                <div className={styles.field}>
                    <input type="text" placeholder="Name" value={props.name} name="name" autoComplete="off" onChange={props.handleChange} />
                </div>
                <div className={styles.buttons}>
                    <button disabled={
                        doesNameExist(props.name, props.robots) 
                        ||
                        !(props.name.length > 0) 
                        }>Next</button>&nbsp;&nbsp;
                </div>
            </form>
        </div>

    )
}


export default AddName;
