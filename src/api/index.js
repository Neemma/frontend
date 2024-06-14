import axios from 'axios'
const API = axios.create({ baseURL: 'https://backend-one-black.vercel.app' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

// AUTH
export const logIn = (authData) => (
  API.post('/user/login', authData)
)
export const signUp = (authData) => (
  API.post('/user/signup', authData)
)

export const postQuestion = (newQuestion) => API.post('/questions', newQuestion);
export const getAllQuestions = () => API.get('/questions');
export const postAnswer = (id, answer) => API.post(`/questions/${id}/answers`, answer);
export const deleteAnswer = (questionId, answerId) => API.delete(`/questions/${questionId}/answers/${answerId}`);
export const deleteQuestion = (id) => API.delete(`/questions/${id}`);
export const voteQuestion = (id, voteType, userId) => API.post(`/questions/${id}/vote`, { vote: voteType, userId });
export const voteAnswer = (questionId, answerId, voteType, userId) => API.post(`/questions/${questionId}/answers/${answerId}/vote`, { vote: voteType, userId });

// USER
export const fetchAllUsers = () => API.get("/user/getAllUsers");

export const updateProfile = (id, updatedData) =>
  API.patch(`/user/update/${id}`, updatedData);
