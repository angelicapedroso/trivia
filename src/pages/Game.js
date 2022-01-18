import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import NextButton from '../components/NextButton';
import changeColor from '../services/changeColor';
import { fetchQuestions } from '../redux/actions';
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

  onClick = () => {
    changeColor();
    this.setState({ visible: true });
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
