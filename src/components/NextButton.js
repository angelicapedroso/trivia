import React from 'react';
import { PropTypes } from 'prop-types';

class NextButton extends React.Component {
  render() {
    const { handleClickNext } = this.props;
    return (
      <button
        type="button"
        id="next-btn"
        data-testid="btn-next"
        onClick={ handleClickNext }
      >
        PRÓXIMA
      </button>
    );
  }
}

NextButton.propTypes = {
  handleClickNext: PropTypes.func.isRequired,
};

export default NextButton;
