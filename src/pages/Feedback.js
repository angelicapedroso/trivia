import React from 'react';
import { PropTypes } from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  componentDidMount() {
    this.getHash();
  }

  getHash = () => {
    const { name, score, email } = this.props;
    const hash = md5(email).toString();
    const saveRanking = { name, score, picture: `https://www.gravatar.com/avatar/${hash}` };
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking && name) {
      ranking.push(saveRanking);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
    if (!ranking && name) localStorage.setItem('ranking', JSON.stringify([saveRanking]));
  }

  handleClick = ({ target }) => {
    const { history } = this.props;
    if (target.name === 'play') {
      history.push('/');
    } else {
      history.push('/ranking');
    }
  }

  render() {
    const { assertions } = this.props;
    const MIN = 3;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">Feedback</h2>
        <h4 data-testid="feedback-text">
          { assertions < MIN ? 'Could be better...' : 'Well Done!' }
        </h4>
        <button
          type="button"
          name="play"
          onClick={ this.handleClick }
          data-testid="btn-play-again"
        >
          Jogue Novamente
        </button>
        <button
          type="button"
          name="ranking"
          onClick={ this.handleClick }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  assertions: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
