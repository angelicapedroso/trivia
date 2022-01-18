import React from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  handleClick = ({ target }) => {
    const { history } = this.props;
    if (target.name === 'play') {
      history.push('/');
    } else {
      history.push('/ranking');
    }
  }

  render() {
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">Feedback</span>
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
  history: PropTypes.string.isRequired,
};

export default Feedback;
