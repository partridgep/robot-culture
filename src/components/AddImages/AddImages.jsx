import React, { Component } from 'react';
import styles from './AddImages.module.css';

export class AddImages extends Component {

    state = {
        landscapeInvalid: true,
        portraitInvalid: true
    }

    handleChange = async e => {
        await this.props.handleChange(e);
        this.CheckIfLandscapeDoesntLoad(this.props.imageLandscape);
        this.CheckIfPortraitDoesntLoad(this.props.imagePortrait);
    }


    CheckIfLandscapeDoesntLoad = (url) => {
        let test = new Image();
        test.onload = this.validateLandscape;
        test.onerror = this.invalidateLandscape;
        test.src=url;
    }

    validateLandscape = () => {
        console.log('form is valid');
        this.setState({ landscapeInvalid: false });
    }

    invalidateLandscape = () => {
        console.log('form not valid');
        this.setState({ landscapeInvalid : true})
    }

    CheckIfPortraitDoesntLoad = (url) => {
        let test = new Image();
        test.onload = this.validatePortrait;
        test.onerror = this.invalidatePortrait;
        test.src=url;
    }

    validatePortrait = () => {
        console.log('form is valid');
        this.setState({ portraitInvalid: false });
    }

    invalidatePortrait = () => {
        console.log('form not valid');
        this.setState({ portraitInvalid : true})
    }

    render() {
        return (
            <div className={styles.AddImages}>

                    <form>

                    {/* IMAGE 1: LANDSCAPE */}
                    <div className={styles.imageSection}>
                        <p className={styles.message}>Enter a Landscape Picture of {this.props.name}</p>
                        <div 
                            className={styles.imageLandscape} 
                            style={{backgroundImage: `url(${this.props.imageLandscape})`}}
                            src={this.props.imageLandscape} 
                        />
                        <div className={styles.field}>
                            <input 
                                type="url" 
                                placeholder="Image URL" 
                                value={this.props.imageLandscape} 
                                name="imageLandscape" 
                                autoComplete="off" 
                                onChange={this.handleChange} 
                                
                            />
                        </div>
                    </div>

                    {/* IMAGE 2: PORTRAIT */}
                    <div className={styles.imageSection}>
                        <p className={styles.message}>Enter a Portrait Picture of {this.props.name}</p>
                        <div 
                            className={styles.imagePortrait} 
                            style={{backgroundImage: `url(${this.props.imagePortrait})`}}
                            src={this.props.imagePortrait} 
                        />
                        <div className={styles.field}>
                            <input 
                                type="url" 
                                placeholder="Image URL" 
                                value={this.props.imagePortrait} 
                                name="imagePortrait" 
                                autoComplete="off" 
                                onChange={this.handleChange} 
                                onKeyDown={this.props.handleEnter}
                            />
                        </div>
                    </div>
                    </form>

                    <div className={styles.buttons}>
                        <button className={styles.skip} onClick={this.props.handleSkip}>Skip</button>
                        <button 
                            disabled={this.state.landscapeInvalid || this.state.portraitInvalid}
                            onClick={this.props.handleSubmit}
                        >Next</button>&nbsp;&nbsp;
                    </div>
            </div>

        )
    }
}


export default AddImages;
