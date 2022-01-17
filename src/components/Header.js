import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [''],
    };
  }

  componentDidMount() {
    this.getHash();
  }

  getHash = () => {
    const { name, score, email } = this.props;
    const hash = md5(email).toString();
    const saveRanking = [{ name, score, picture: `https://www.gravatar.com/avatar/${hash}` }];
    if (name) localStorage.setItem('ranking', JSON.stringify(saveRanking));
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking });
  }

  render() {
    const { ranking } = this.state;
    return (
      <header>
        <img
          id="userIMG"
          data-testid="header-profile-picture"
          src={ ranking[0].picture }
          alt="foto-de-perfil"
        />
        <div>
          <p data-testid="header-player-name">
            Bem vindo:
            { ranking[0].name }
          </p>
          <p data-testid="header-score">
            Score:
            { ranking[0].score }
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
