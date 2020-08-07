import React, { Component } from 'react';
import styles from './AddCategories.module.css';

export class AddCategories extends Component {

    state = {
        activeOption: 0,
        filteredOptions: this.getCategories(),
        showOptions: true,
        userInput: '',
        options: this.getCategories()
    };

    /*----      HELPER FUNCTIONS        ----*/

    // function to grab possible movie matches from our movie API
    getCategories() {
        console.log('getting category options');
        let categories = [];
        console.log(this.props.robots);
        for (var robot of this.props.robots) {
            console.log(robot.name);
            for (var category of robot.categories) {
                if (!categories.includes(category) && !this.props.categories.includes(category)) {
                    categories.push(category);
                }
            }
        }
        console.log(categories);
        categories.sort();
        return categories;
    }

    pushNewCategoryToState(newCategory) {
        //first, prevent from adding duplicates
        for (var otherCategory of this.props.categories) {
            if (newCategory === otherCategory) return;
        }
         // copy categories array from state
         let categories = [...this.props.categories];
         // add selected category
         categories.push(newCategory);
         // save categories array to state
         this.props.handleClickOption(categories, 'categories');
    }

    // scroll to anchor div at bottom of chosen options list
    scrollToBottom = () => {
        if (this.optionsEnd) this.optionsEnd.scrollIntoView({ behavior: "smooth" });
      }

    /*----      LIFECYCLE METHOD        ----*/

    // scroll to bottom when new options gets selected
    componentDidUpdate() {
        this.scrollToBottom();
      }

    /*----      EVENT HANDLERS        ----*/

    // function to handle change and consider options
    handleChangeWithOptions = (e) => {
        // call regular handleChange method to set input to state
        //this.props.handleChange(e);
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
            userInput
        });
    };

    // puts text from clicked element into input field
    onClick = async (e) => {
        // get corresponding media object in options array
        let chosenOption = e.target.textContent;
        await this.pushNewCategoryToState(chosenOption);
        this.setState({ userInput: '', filteredOptions: this.getCategories()});
    };


    onKeyDown = (e) => {
        const { activeOption, options } = this.state;
        // if user hits Enter
        if (e.keyCode === 13) {
            // if adding new category
            if (!this.state.filteredOptions.length) {
                console.log(this.state.userInput);
                this.pushNewCategoryToState(this.state.userInput);
                this.setState({ userInput: '', filteredOptions: this.getCategories()});
            }
            else {
                // get selected category
                let category = options[activeOption];
                // set option to state
                this.pushNewCategoryToState(category);
            }
        // if user hits the Up key
        } else if (e.keyCode === 38) {
            // prevent user from going past first option
            if (activeOption === 0) return;
            // get previous option
            this.setState({ activeOption: activeOption - 1 });
        // if user hits the Down Key
        } else if (e.keyCode === 40) {
            // prevent user from going past last option
            if (activeOption === options.length - 1) return;
            // get next option
            this.setState({ activeOption: activeOption + 1 });
        }
    };

    handleCategoryRemoval = async (e) => {
        // get name of option user wants to remove
        const category = e.target.parentElement.textContent.slice(0,-1);
        console.log(category);
        // make copy of categories array
        let categories = [...this.props.categories];
        // find actor with same name and remove them
        for (let i=0; i<categories.length; i++) {
            if (categories[i] === category) {
                categories.splice(i, 1);
                break;
            }
        }
        // save categories array to state
        await this.props.handleClickOption(categories, 'categories');
        // filter our options to see which fit the user input
        const filteredOptions = this.state.options.filter(
            (option) => option.toLowerCase().indexOf(this.state.userInput.toLowerCase()) > -1
        );
        this.setState({filteredOptions});
    }

    render() {

        const {
            handleChangeWithOptions,
            onClick,
            onKeyDown,
            handleCategoryRemoval,
            state: { activeOption, filteredOptions }
        } = this;

        // variable for autosuggestions
        let optionList =  (
                    <ul className={styles.options}>
                        {filteredOptions.map((optionName, index) => {
                            let className;
                            if (index === activeOption) {
                                className = styles.activeOption;
                            }
                            return (
                                <li className={className} key={optionName} onClick={onClick} name="category" value={optionName}>
                                    {optionName}
                                </li>
                            );
                        })}
                    </ul>
                );

        // variable for items selected by user
        let chosenOptionsList;
        // only show if media in question contains at least one item
        if (this.props.categories && this.props.categories.length) {
            chosenOptionsList = (
                <ul className={styles.chosenOptions}>
                    {this.props.categories && this.props.categories.map((category, index) => {
                        return (
                            <li key={index}>{category}<button onClick={handleCategoryRemoval}>X</button></li>
                        )
                    })}
                    {/* anchor div at bottom to always scroll down to */}
                    <div ref={(el) => { this.optionsEnd = el; }}></div>
                </ul>
            )
        }

        return (
            <div className={styles.AddCategories}>
                <p className={styles.message}>Select that categories that best describe {this.props.name} or enter new ones</p>
                    <div className={styles.field}>
                        {chosenOptionsList}
                        <input
                            type="text"
                            placeholder="Categories"
                            value={this.state.userInput}
                            autoComplete="off"
                            onChange={handleChangeWithOptions}
                            onKeyDown={onKeyDown}
                        />
                        {optionList}
                    </div>
                    <div className={styles.buttons}>
                        {this.props.addProcess && <button className={styles.skip} onClick={this.props.handleSkip}>Skip</button>}
                        <button disabled={!this.props.categories.length} onClick={this.props.handleFinalSubmit} >Next</button>&nbsp;&nbsp;
                </div>
            </div>

        )
    }
}

export default AddCategories;