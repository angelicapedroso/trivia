import React from 'react';
import { PropTypes } from 'prop-types';

class Question extends React.Component {
  // função getRandomInt copiada do site
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    const {
      question,
      category,
      correctAnswer,
      wrongs,
    } = this.props;
    const max = 5;
    return (
      <div id="game">
        <div id="question-category">
          <p id="category" data-testid="question-category">{ category }</p>
          <p id="question" data-testid="question-text">{ question }</p>
        </div>
        <div id="options" data-testid="answer-options">
          <button
            style={ { order: this.getRandomInt(0, max) } }
            type="button"
            data-testid="correct-answer"
          >
            { correctAnswer }
          </button>
          {wrongs.map((wrong, index) => (
            <button
              key={ wrong }
              style={ { order: this.getRandomInt(0, max) } }
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              { wrong }
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  wrongs: PropTypes.string.isRequired,
};

export default Question;
