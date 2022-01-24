import React from 'react';
import { PropTypes } from 'prop-types';

class Players extends React.Component {
  render() {
    const {
      src,
      name,
      score,
      index,
    } = this.props;
    return (
      <table id="table-ranking">
        <tr>
          <td><img src={ src } alt="Player" /></td>
          <th>Jogador:</th>
          <td data-testid={ `player-name-${index}` }>{ name }</td>
          <th>Pontuação:</th>
          <td data-testid={ `player-score-${index}` }>{ score }</td>
        </tr>
      </table>
    );
  }
}

Players.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};

export default Players;
