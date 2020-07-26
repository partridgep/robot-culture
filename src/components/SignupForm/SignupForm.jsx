import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUpForm.module.css';
import userService from '../../utils/userService';

class SignupForm extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    passwordConf: '',
    admin: false
  };

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      this.props.handleSignupOrLogin();
      // Successfully signed up - show Robot Page
      this.props.history.push('/robots');
    } catch (err) {
      console.log(err.message);
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
        <div className={styles.signUp}>
          <p className={styles.message}>{this.props.message}</p>
          <form onSubmit={this.handleSubmit} >
            <div className={styles.field}>
                <input type="text" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} />
            </div>
            <div className={styles.field}>
                <input type="email" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </div>
            <div className={styles.field}>
                <input type="password" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
            </div>
            <div className={styles.field}>
                <input type="password" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
            </div>
            <div className={styles.field}>
              <div className={styles.buttons}>
                <button className="btn btn-default" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
                <Link to='/robots'>Cancel</Link>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

export default SignupForm;
