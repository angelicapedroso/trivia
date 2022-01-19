import React from 'react';
import { PropTypes } from 'prop-types';

class Question extends React.Component {
  render() {
    const {
      question,
      category,
      correctAnswer,
      wrongs,
      handleClick,
      randomOrder,
      isDisabled,
    } = this.props;
    return (
      <div id="game">
        <div id="question-category">
          <p id="category" data-testid="question-category">{ category }</p>
          <p id="question" data-testid="question-text">{ question }</p>
        </div>
        <div id="options" data-testid="answer-options">
          <button
            style={ { order: randomOrder[0] } }
            type="button"
            onClick={ handleClick }
            data-testid="correct-answer"
            id="btnCorrect"
            name="btnCorrect"
            className="optionButton"
            disabled={ isDisabled }
          >
            { correctAnswer }
          </button>
          { wrongs.map((wrong, index) => (
            <button
              key={ wrong }
              style={ { order: randomOrder[index + 1] } }
              type="button"
              onClick={ handleClick }
              data-testid={ `wrong-answer-${randomOrder[index + 1]}` }
              name="btnWrong"
              className="optionButton"
              disabled={ isDisabled }
            >
              { wrong }
            </button>
          )) }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  isDisabled: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  wrongs: PropTypes.string.isRequired,
  randomOrder: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Question;
