import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Players from '../components/Players';

class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const playersInfo = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div id="ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="btn-go-home"
        >
          Jogue Novamente
        </button>
        <section>
          {
            playersInfo.map((player, index) => (
              <Players
                key={ index }
                src={ player.picture }
                index={ index }
                name={ player.name }
                score={ player.score }
              />
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
