import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import NextButton from '../components/NextButton';
import { fetchQuestions, sum } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      visible: false,
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
    if (index < max) this.setState({ index: index + 1, visible: false });
  }

  onClick = () => {
    this.setState({ visible: true });
  }

  scoreAdd = (timer, level) => {
    const { getSum } = this.props;
    const ten = 10;
    const difficult = { hard: 3, medium: 2, easy: 1 };
    const sumScore = (timer * difficult[level]) + ten;
    localStorage.setItem('sum', sumScore);
    getSum(sumScore);
  }

  render() {
    const { props: { getQuestions }, state: { index, visible } } = this;
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
  getSum: PropTypes.func.isRequired,
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
