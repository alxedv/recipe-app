import React, { useState } from 'react';
import { useHistory } from 'react-router';
// import MyContext from '../MyContext';
import '../styles/Login.css';
import Logo from '../assets/logo.png';

function Login() {
  const INITIAL_STATE = {
    email: '',
    password: '',
  };

  const history = useHistory();

  const checkButton = (senha, email) => {
    // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const validEmail = /\S+@\S+\.\S+/.test(email);
    const minSenhaLength = 6;
    const validSenha = (senha.length > minSenhaLength);
    const check = (validEmail && validSenha);
    return !check;
  };

  const [loginState, setLoginState] = useState(INITIAL_STATE);
  const { email, password } = loginState;

  const inputHandler = ({ target }) => {
    const { name, value } = target;
    setLoginState({ ...loginState, [name]: value });
  };

  const loginButtonHandler = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  return (
    <div className="main-container">
      <img src={ Logo } alt="" />
      <div className="login-container">
        <input
          type="email"
          id="email"
          data-testid="email-input"
          placeholder="Digite seu email..."
          value={ email }
          name="email"
          onChange={ inputHandler }
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          data-testid="password-input"
          value={ password }
          name="password"
          onChange={ inputHandler }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ checkButton(password, email) }
          onClick={ loginButtonHandler }
          className="login-button"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
