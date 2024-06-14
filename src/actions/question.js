import * as api from '../api'

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postQuestion(questionData)
    dispatch({ type: 'POST_QUESTION', payload: data})
    dispatch(fetchAllQuestions())
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const fetchAllQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions()
    dispatch({ type: 'FETCH_ALL_QUESTIONS', payload: data })
  } catch (error) {
    console.log(error)
  }
}
export const postAnswer = (answerData) => async (dispatch) => {
  try {
    const { id, answerBody, userAnswered, userId, noOfAnswers } = answerData;
    const response = await fetch(`https://backend-one-black.vercel.app/questions/${id}/answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body: answerBody, userAnswered, userId }),
    });
    const data = await response.json();
    dispatch({ type: 'POST_ANSWER', payload: { id, answer: data } });
  } catch (error) {
    console.error('Error posting answer:', error);
  }
};

export const deleteAnswer = (questionId, answerId, newNoOfAnswers) => async (dispatch) => {
  try {
    await fetch(`https://backend-one-black.vercel.app/questions/${questionId}/answers/${answerId}`, {
      method: 'DELETE',
    });
    dispatch({ type: 'DELETE_ANSWER', payload: { questionId, answerId, newNoOfAnswers } });
  } catch (error) {
    console.error('Error deleting answer:', error);
  }
};

export const deleteQuestion = (id, navigate) => async (dispatch) => {
  try {
    await fetch(`https://backend-one-black.vercel.app/questions/${id}`, {
      method: 'DELETE',
    });
    dispatch({ type: 'DELETE_QUESTION', payload: id });
    navigate('/');
  } catch (error) {
    console.error('Error deleting question:', error);
  }
};

export const voteQuestion = (id, voteType, userId) => async (dispatch) => {
  try {
    const response = await fetch(`https://backend-one-black.vercel.app/questions/${id}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vote: voteType, userId }),
    });
    const data = await response.json();
    dispatch({ type: 'VOTE_QUESTION', payload: { id, votes: data.votes } });
  } catch (error) {
    console.error('Error voting question:', error);
  }
};

export const voteAnswer = (questionId, answerId, voteType, userId) => async (dispatch) => {
  try {
    const response = await fetch(`https://backend-one-black.vercel.app/questions/${questionId}/answers/${answerId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vote: voteType, userId }),
    });
    const data = await response.json();
    dispatch({ type: 'VOTE_ANSWER', payload: { questionId, answerId, votes: data.votes } });
  } catch (error) {
    console.error('Error voting answer:', error);
  }
};
