import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const playersInfo = JSON.parse(localStorage.getItem('ranking'));
    playersInfo.sort((a, b) => b.score - a.score);
    // reference sort: https://ricardo-reis.medium.com/o-m%C3%A9todo-sort-do-array-javascript-482576734e0a#:~:text=Por%20padr%C3%A3o%2C%20o%20m%C3%A9todo%20sort,para%20determinar%20as%20suas%20ordens.

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="btn-go-home"
        >
          HOME
        </button>
        <section>
          {
            playersInfo.map((player, index) => (
              <div key={ index }>
                <img
                  src={ player.picture }
                  alt={ player.name }
                />
                <h3 data-testid={ `player-name-${index}` }>
                  { player.name }
                </h3>
                <h4 data-testid={ `player-score-${index}` }>
                  { player.score }
                </h4>
              </div>
            ))
          }
        </section>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Ranking;
