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

  handleClick = () => {
    const buttons = document.querySelectorAll('.optionButton');
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].name === 'btnCorrect') {
        buttons[i].style.setProperty('border', '3px solid rgb(6, 240, 15)');
      } else {
        buttons[i].style.setProperty('border', '3px solid rgb(255, 0, 0)');
      }
    }
  }

  render() {
    const {
      question,
      category,
      correctAnswer,
      wrongs,
      handleClick,
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
            onClick={ handleClick }
            data-testid="correct-answer"
            onClick={ this.handleClick }
            name="btnCorrect"
            className="optionButton"
          >
            { correctAnswer }
          </button>
          {wrongs.map((wrong, index) => (
            <button
              key={ wrong }
              style={ { order: this.getRandomInt(0, max) } }
              type="button"
              onClick={ handleClick }
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleClick }
              name="btnWrong"
              className="optionButton"
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
  handleClick: PropTypes.func.isRequired,
};

export default Question;
