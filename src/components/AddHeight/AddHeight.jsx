import React, { Component } from 'react';
import styles from './AddHeight.module.css';


export class AddHeight extends Component {

    state = {
        feet: '',
        inches: ''
    };

    handleChangeHeight = async e => {
        let unit = e.target.name;
        let value = parseInt(e.target.value);
        console.log(value);
        if (isNaN(value)) value = 0;
        await this.setState({ [unit]: value });
        let height = {...this.props.height};
        height.feet = this.state.feet;
        height.inches = this.state.inches;
        this.props.handleClickOption(height, 'height');
    }

    handleEnter = e => {
        // if user hits Enter
        if (e.keyCode === 13) {
            this.props.handleSubmit();
        }
    }

    render() {
        return (
            <div className={styles.AddHeight}>
                    <p className={styles.message}>How tall is {this.props.name}?</p>
    
                    <div className={styles.heightFields}>
                        <div className={styles.field}>
                            <input 
                                name="feet"
                                type="number" 
                                placeholder="0" 
                                value={this.state.feet} 
                                autoComplete="off" 
                                onChange={this.handleChangeHeight}
                            />
                        </div><p>'</p>
                        <div className={styles.field}>
                            <input 
                                name="inches"
                                type="number" 
                                placeholder="0" 
                                value={this.state.inches} 
                                autoComplete="off" 
                                onChange={this.handleChangeHeight} 
                                onKeyDown={this.handleEnter}
                            />
                        </div><p>"</p>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.skip} onClick={this.props.handleSkip}>Skip</button>
                        <button disabled={!this.state.feet && !this.state.inches } onClick={this.props.handleSubmit}>Next</button>&nbsp;&nbsp;
                    </div>
    
            </div>
        )
    }

}


export default AddHeight;
