import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';
import userService from '../../utils/userService';

class LoginForm extends Component {
  
    state = {
      email: '',
      pw: ''
    };

    handleChange = (e) => {
        this.setState({
          // Using ES2015 Computed Property Names
          [e.target.name]: e.target.value
        });
      }
    
    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.login(this.state);
            this.props.handleSignupOrLogin();
            // Successfully signed up - show RobotPage
            this.props.history.push('/robots');
        } catch (err) {
            console.log(err.message);
            // Invalid user data (probably duplicate email)
            this.props.updateMessage(err.message);
        }
    }

    isFormInvalid() {
        return !(this.state.email && this.state.pw);
      }
    
    render() {
        return (
            <div className={styles.login}>
                <p className={styles.message}>{this.props.message}</p>
                <form onSubmit={this.handleSubmit} >
                    <div className={styles.field}>
                        <input type="email" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
                    </div>
                    <div className={styles.field}>
                        <input type="password" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
                    </div>
                    <div className={styles.buttons}>
                        <button disabled={this.isFormInvalid()}>Log In</button>&nbsp;&nbsp;&nbsp;
                        <Link to='/robots'>Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm;
