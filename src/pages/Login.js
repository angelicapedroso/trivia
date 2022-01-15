import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUser, getTokenPlayer } from '../redux/actions/index';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      userName: '',
      email: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { userName, email } = this.state;
    this.setState({ [name]: value });
    if (userName.length > 0 && email.length > 0) this.setState({ isDisabled: false });
  }

  handleClick = (event) => {
    event.preventDefault();
    const { userName, email } = this.state;
    const { setToken, user, history } = this.props;
    setToken();
    user({ userName, email });
    history.push('/game');
  }

  render() {
    const { isDisabled, userName, email } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <label htmlFor="input-player-name">
            <input
              name="userName"
              value={ userName }
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

const mapDispatchToProps = (dispatch) => ({
  setToken: () => dispatch(getTokenPlayer()),
  user: (state) => dispatch(addUser(state)),
});

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  user: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
