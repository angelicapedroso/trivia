import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleclick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          onClick={ this.handleclick }
          type="button"
          data-testid="btn-go-home"
        >
          HOME
        </button>
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
