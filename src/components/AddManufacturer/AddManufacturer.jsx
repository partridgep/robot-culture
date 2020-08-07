import React, { Component } from 'react';
import styles from './AddManufacturer.module.css';



export class AddManufacturer extends Component {

    state = {
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: '',
        options: this.getManufacturers()
    };

    getManufacturers() {
        let manufacturers = [];
        for (var robot of this.props.robots) {
            if (!manufacturers.includes(robot.manufacturer)) manufacturers.push(robot.manufacturer);
        }
        return manufacturers;
    }


    // function to handle change and consider options
    handleChangeWithOptions = (e) => {
        // call regular handleChange method to set input to state
        this.props.handleChange(e);
        // destructure options array
        const options = this.state.options;
        // grab user input
        const userInput = e.currentTarget.value;
        // filter our options to see which fit the user input
        const filteredOptions = options.filter(
            (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        this.setState({
            activeOption: 0,
            filteredOptions,
            showOptions: true,
            userInput
        });
    };

    // turns suggestions off and puts text from clicked element into input field
    onClick = (e) => {
        this.setState({
            activeOption: 0,
            filteredOption: [],
            showOptions: false,
        });
        // save option to state
        this.props.handleChooseOption(e, 'manufacturer');
    };

    onKeyDown = (e) => {
        const { activeOption, filteredOptions } = this.state;
        // if user hits Enter
        if (e.keyCode === 13) {
            // if already selected one of the options
            // OR
            // user has put in a brand new option,
            // submit form and exit
            if (this.state.options.includes(this.props.manufacturer) || (this.state.filteredOptions.length === 0 && this.state.showOptions)) {
                this.props.handleSubmit();
                return;
            }
            // set option to state
            this.props.handleClickOption(filteredOptions[activeOption], 'manufacturer');
            // turn suggestions off
            this.setState({
                activeOption: 0,
                showSuggestions: false,
                showOptions: false
            });
        // if user hits the Up key
        } else if (e.keyCode === 38) {
            // prevent user from going past first option
            if (activeOption === 0) return;
            // get previous option
            this.setState({ activeOption: activeOption - 1 });
        // if user hits the Down Key
        } else if (e.keyCode === 40) {
            // prevent user from going past last option
            if (activeOption === filteredOptions.length - 1) return;
            // get next option
            this.setState({ activeOption: activeOption + 1 });
        }
    };

    render() {

        const {
            handleChangeWithOptions,
            onClick,
            onKeyDown,
            state: { activeOption, filteredOptions, showOptions, userInput }
        } = this;

        let optionList;

        if (showOptions && userInput) {
            if (filteredOptions.length) {
                optionList = (
                    <ul className={styles.options}>
                        {filteredOptions.map((optionName, index) => {
                            let className;
                            if (index === activeOption) {
                                className = styles.activeOption;
                            }
                            return (
                                <li className={className} key={optionName} onClick={onClick} name="manufacturer" value={optionName}>
                                    {optionName}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        }

        return (
            <div className={styles.addManufacturer}>
                <p className={styles.message}>Who made this robot?</p>
                    <div className={styles.field}>
                        <input
                            type="text"
                            placeholder="Manufacturer"
                            value={this.props.manufacturer}
                            name="manufacturer"
                            autoComplete="off"
                            onChange={handleChangeWithOptions}
                            onKeyDown={onKeyDown}
                        />
                    {optionList}
                    </div>
                    <div className={styles.buttons}>
                    {this.props.addProcess && <button className={styles.skip} onClick={this.props.handleSkip}>Skip</button>}
                        <button onClick={this.props.handleSubmit} disabled={!(this.props.manufacturer.length > 0)}>Next</button>&nbsp;&nbsp;
                </div>
            </div>

        )
    }
}


    export default AddManufacturer;