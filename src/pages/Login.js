import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import '../App.css';
import { getTokenPlayer } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      user: '',
      email: '',
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { user, email } = this.state;
    this.setState({ [name]: value });
    if (user.length > 0 && email.length > 0) this.setState({ isDisabled: false });
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ redirect: true });
    const { setToken } = this.props;
    setToken();
  }

  render() {
    const { isDisabled, user, email, redirect } = this.state;
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
          <button
            data-testid="btn-play"
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
          { redirect && <Redirect to="/game" /> }
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setToken: () => dispatch(getTokenPlayer()),
});

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
