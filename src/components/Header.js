import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { score, name, email } = this.props;
    const hash = md5(email).toString();
    return (
      <header>
        <img
          id="userIMG"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="foto-de-perfil"
        />
        <div>
          <p data-testid="header-player-name">
            Bem vindo:
            { name }
          </p>
          <p>
            Score:
            <i data-testid="header-score">{ score }</i>
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
