const questionsReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "POST_QUESTION":
      return { ...state, data: [...state.data, action.payload] };

    case "POST_ANSWER":
      return {
        ...state,
        data: state.data.map(question =>
          question.id === action.payload.id
            ? { ...question, answers: [...question.answers, action.payload.answer] }
            : question
        ),
      };

    case "FETCH_ALL_QUESTIONS":
      return { ...state, data: action.payload };

    default:
      return state;
  }
};
export default questionsReducer;
