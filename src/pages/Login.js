import React from 'react';
import logo from '../trivia.png';
import '../App.css';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      user: '',
      email: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { user, email } = this.state;
    this.setState({ [name]: value });
    if (user.length > 0 && email.length > 0) this.setState({ isDisabled: false });
  }

  render() {
    const { isDisabled, user, email } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <label htmlFor="input-player-name">
            <input
              name="user"
              value={ user }
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="input-gravatar-email">
            <input
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <button data-testid="btn-play" type="button" disabled={ isDisabled }>
            Play
          </button>
          <Link to="/settings">
            <button data-testid="btn-settings" type="button">
              Settings
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

export default Login;
