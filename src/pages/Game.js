import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import NextButton from '../components/NextButton';
import { fetchQuestions, addPoint } from '../redux/actions';
import changeColor from '../services/changeColor';
import getRandomInt from '../services/getRandomInt';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      visible: false,
      order: getRandomInt(),
      time: 30,
    };
  }

  componentDidMount() {
    const { questions } = this.props;
    const token = localStorage.getItem('token');
    questions(token);
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

  handleClick = () => {
    const { index } = this.state;
    const max = 4;
    const array = getRandomInt();
    if (index < max) {
      this.setState({ index: index + 1, visible: false, order: array, time: 30 });
      const seconds = 1000;
      this.interval = setInterval(
        () => this.setTimer(),
        seconds,
      );
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  onClick = ({ target }) => {
    const { name } = target;
    const { getQuestions } = this.props;
    const { time } = this.state;
    const hard = 3;
    clearInterval(this.interval);
    changeColor();
    this.setState({ visible: true });
    const questionText = target.parentNode.parentNode.firstChild.lastChild.innerText;
    const difficult = getQuestions.find((e) => e.question === questionText).difficulty;
    if (name === 'btnCorrect') {
      switch (difficult) {
      case 'easy':
        this.scoreAdd(time, 1);
        break;
      case 'medium':
        this.scoreAdd(time, 2);
        break;
      case 'hard':
        this.scoreAdd(time, hard);
        break;
      default:
        return 0;
      }
    }
  }

  scoreAdd = (timer = 1, difficult = 0) => {
    const { setRanking } = this.props;
    const ten = 10;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const i = ranking.length - 1;
    ranking[i].score = ranking[i].score + ten + (timer * difficult);
    setRanking(ranking[i]);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { props: { getQuestions }, state: { index, visible, order, time } } = this;
    return (
      <div>
        <Header />
        {getQuestions && (
          <Question
            key={ getQuestions[index].question }
            question={ getQuestions[index].question }
            category={ getQuestions[index].category }
            correctAnswer={ getQuestions[index].correct_answer }
            wrongs={ getQuestions[index].incorrect_answers }
            handleClick={ this.onClick }
            randomOrder={ order }
            isDisabled={ time === 0 && 'true' }
          />
        )}
        <div>{ time }</div>
        <div id="next">
          {(visible || time === 0) && <NextButton handleClickNext={ this.handleClick } />}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  setRanking: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  getQuestions: state.questions,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  questions: (token) => dispatch(fetchQuestions(token)),
  setRanking: (ranking) => dispatch(addPoint(ranking)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
