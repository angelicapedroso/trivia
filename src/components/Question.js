import React from 'react';
import { PropTypes } from 'prop-types';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 30,
    };
  }

  componentDidMount() {
    const seconds = 1000;
    this.interval = setInterval(
      () => this.setTimer(),
      seconds,
    );
  }

  componentDidUpdate = () => {
    const { time } = this.state;
    const ZERO = 0;
    if (time === ZERO) {
      clearInterval(this.interval);
    }
  };

  setTimer = () => {
    this.setState((prevState) => ({
      time: prevState.time - 1,
    }));
  }

  render() {
    const { time } = this.state;
    const {
      question,
      category,
      correctAnswer,
      wrongs,
      handleClick,
      randomOrder,
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
            name="btnCorrect"
            className="optionButton"
            disabled={ time === 0 && 'true' }
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
              disabled={ time === 0 && 'true' }
            >
              { wrong }
            </button>
          )) }
        </div>
        <div>{ time }</div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  wrongs: PropTypes.string.isRequired,
  randomOrder: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Question;
