import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import NextButton from '../components/NextButton';
import { fetchQuestions, sum } from '../redux/actions';
import changeColor from '../services/changeColor';
import getRandomInt from '../services/getRandomInt';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      visible: false,
      order: getRandomInt(),
    };
  }

  componentDidMount() {
    const { questions } = this.props;
    const token = localStorage.getItem('token');
    questions(token);
  }

  handleClick = () => {
    const { index } = this.state;
    const max = 4;
    const array = getRandomInt();
    if (index < max) {
      this.setState({ index: index + 1, visible: false, order: array });
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  onClick = ({ target }) => {
    const { name } = target;
    const { getQuestions } = this.props;
    const hard = 3;
    changeColor();
    this.setState({ visible: true });
    const questionText = target.parentNode.parentNode.firstChild.lastChild.innerText;
    const difficult = getQuestions.find((e) => e.question === questionText).difficulty;
    if (name === 'btnCorrect') {
      switch (difficult) {
      case 'easy':
        this.scoreAdd(1, 1);
        break;
      case 'medium':
        this.scoreAdd(1, 2);
        break;
      case 'hard':
        this.scoreAdd(1, hard);
        break;
      default:
        return 0;
      }
    }
  }

  scoreAdd = (timer = 1, difficult = 0) => {
    const ten = 10;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking[0].score = ranking[0].score + ten + (timer * difficult);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { props: { getQuestions }, state: { index, visible, order } } = this;
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
          />
        )}
        <div id="next">
          {visible && <NextButton handleClickNext={ this.handleClick } />}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  getQuestions: state.questions,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  questions: (token) => dispatch(fetchQuestions(token)),
  dispatchSoma: (score) => dispatch(sum(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
