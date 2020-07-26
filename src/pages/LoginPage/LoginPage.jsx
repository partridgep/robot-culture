import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignupForm/SignupForm';
import './LoginPage.css';

class LoginPage extends Component {

    state = {
        login: 1,
        message: ''
    }

    updateMessage = (msg) => {
    this.setState({message: msg});
    }

    chooseLoginOrSignup = e => {
        console.log(e.target.textContent);
        if (e.target.textContent === 'Sign up') this.setState({login: 0});
        else this.setState({login: 1});
    }
  
    render() {
        return (
          <div className="LoginPage">
            <div className='LoginPage-loginWindow'>
            <header className='LoginPage-header'>
                {this.state.login === 1 ? 
                <p>Login | <Link onClick={(e) => this.chooseLoginOrSignup(e)} >Sign up</Link></p>
                :
                <p><Link onClick={(e) => this.chooseLoginOrSignup(e)} >Login</Link> | Sign up</p>
                }
                </header>
                <p className='LoginPage-whySignup'>{this.state.login ? 'Login' : 'Sign up'} to save favorites and update robot database</p>
              {this.state.login ? 
                <LoginForm {...this.props} message={this.state.message} updateMessage={this.updateMessage}/> 
                : 
                <SignUpForm {...this.props} message={this.state.message} updateMessage={this.updateMessage}/>
                }
            </div>
          </div>
        );
    }
}
  
  export default LoginPage;
  