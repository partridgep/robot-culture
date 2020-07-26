import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignupForm/SignupForm';
import './LoginPage.css';

class LoginPage extends Component {

    state = {
        login: 1
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
              {this.state.login ? <LoginForm {...this.props} /> : <SignUpForm {...this.props} />}
            </div>
          </div>
        );
    }
}
  
  export default LoginPage;
  