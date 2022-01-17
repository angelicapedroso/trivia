import React from 'react';
import { PropTypes } from 'prop-types';

class NextButton extends React.Component {
  render() {
    const { handleClick } = this.props;
    return (
      <button type="button" data-testid="btn-next" onClick={ handleClick }>Next</button>
    );
  }
}

NextButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default NextButton;
