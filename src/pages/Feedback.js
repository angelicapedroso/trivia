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
    const { assertions, score } = this.props;
    const MIN = 3;
    return (
      <div>
        <Header />
        <div id="feedback">
          <h2 data-testid="feedback-text">Feedback</h2>
          {assertions < MIN
            ? (
              <h4 style={ { color: 'red' } } data-testid="feedback-text">
                Could be better...
              </h4>)
            : (
              <h4 style={ { color: 'green' } } data-testid="feedback-text">
                Well Done!
              </h4>
            )}
          <table>
            <tr>Desempenho:</tr>
            <tr>
              <p>Acertos</p>
              <td data-testid="feedback-total-question">{ assertions }</td>
            </tr>
            <tr>
              <p>Pontuação</p>
              <td data-testid="feedback-total-score">{ score }</td>
            </tr>
          </table>
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
