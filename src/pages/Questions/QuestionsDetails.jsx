import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";
import toast from 'react-hot-toast';
import HTMLReactParser from 'html-react-parser';

import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import {
  postAnswer,
  deleteQuestion,
  voteQuestion,
  voteAnswer
} from "../../actions/question";
import Editor from "../../components/Editor/Editor";
import Loader from "../../components/Loader/Loader";

const QuestionsDetails = () => {
  const { id } = useParams();
  const questionsList = useSelector((state) => state.questionsReducer.data);

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const url = "https://stack-overflow-clone-gautam.vercel.app/";

  useEffect(() => {
    if (questionsList) {
      const foundQuestion = questionsList.find(q => q.id === parseInt(id));
      setQuestion(foundQuestion);
    }
  }, [questionsList, id]);

  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (answer === "") {
      toast.error("Enter an answer before submitting");
    } else {
      dispatch(
        postAnswer({
          id: question.id,
          noOfAnswers: answerLength + 1,
          answerBody: answer,
          userAnswered: "Anonymous",  // Default to anonymous user
          userId: null                // No user ID
        })
      );
      setAnswer("");
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    toast.success('URL copied to clipboard');
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
    toast.success('Question deleted');
  };

  const handleUpVote = () => {
    dispatch(voteQuestion(id, 'upVote', null));
    toast.success('Upvoted');
  };

  const handleDownVote = () => {
    dispatch(voteQuestion(id, 'downVote', null));
    toast.success('Downvoted');
  };

  const handleAnswerUpVote = (answerId) => {
    dispatch(voteAnswer(id, answerId, 'upVote', null));
    toast.success('Upvoted answer');
  };

  const handleAnswerDownVote = (answerId) => {
    dispatch(voteAnswer(id, answerId, 'downVote', null));
    toast.success('Downvoted answer');
  };

  if (!question) return <Loader />;

  return (
    <div className="question-details-page">
      <section className="question-details-container">
        <h1>{question.title}</h1>
        <div className="question-details-container-2">
          <div className="question-votes">
            <img
              src={upvote}
              alt=""
              width="18"
              className="votes-icon"
              onClick={handleUpVote}
            />
            <p>{question.votes}</p>
            <img
              src={downvote}
              alt=""
              width="18"
              className="votes-icon"
              onClick={handleDownVote}
            />
          </div>
          <div style={{ width: "100%" }}>
            <p className="question-body">{HTMLReactParser(question.body)}</p>
            <div className="question-details-tags">
              {question.tags.map((tag) => (
                <div key={tag}>{tag}</div>
              ))}
            </div>
            <div className="question-actions-user">
              <div>
                <button type="button" onClick={handleShare}>
                  Share
                </button>
                <button type="button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
              <div>
                <p className="time">Asked {moment(question.created_at).fromNow()}</p>
                {question.userPosted && (
                  <Link
                    to={`/Users/${question.userId}`}
                    className="user-link"
                    style={{ color: "#0086d8" }}
                  >
                    <Avatar
                      backgroundColor="#3AB24F"
                      px="8px"
                      py="5px"
                      borderRadius="4px"
                    >
                      {question.userPosted.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>{question.userPosted}</div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {question.answers && question.answers.length > 0 && (
        <section>
          <h3>{question.answers.length} Answers</h3>
          {question.answers.map(answer => (
            <div key={answer.id} className="answer">
              <div className="answer-votes">
                <img
                  src={upvote}
                  alt=""
                  width="18"
                  className="votes-icon"
                  onClick={() => handleAnswerUpVote(answer.id)}
                />
                <p>{answer.votes}</p>
                <img
                  src={downvote}
                  alt=""
                  width="18"
                  className="votes-icon"
                  onClick={() => handleAnswerDownVote(answer.id)}
                />
              </div>
              <div className="answer-details">
                <p>{HTMLReactParser(answer.body)}</p>
                <div className="answer-comments">
                  {answer.comments && answer.comments.length > 0 && (
                    <div>
                      <h4>Comments</h4>
                      {answer.comments.map(comment => (
                        <p key={comment.id}>{comment.body}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
      <section className="post-ans-container">
        <h3>Your Answer</h3>
        <form
          onSubmit={(e) => {
            handlePostAns(e, question.answers.length);
          }}
        >
          <div>
            <Editor
              value={answer}
              onChange={setAnswer}
            />
          </div>
          <br />
          <input
            type="submit"
            className="post-ans-btn"
            value="Post Your Answer"
          />
        </form>
      </section>
    </div>
  );
};

export default QuestionsDetails;
