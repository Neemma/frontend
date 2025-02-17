import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar/Avatar';
import moment from 'moment';
import { deleteAnswer } from "../../actions/question";
import toast from 'react-hot-toast';
import HTMLReactParser from 'html-react-parser';

const DisplayAnswer = ({ question, handleShare }) => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const { id } = useParams();

  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
    toast.success('Answer deleted');
  }

  return (
    <div>
      {question.answers.map((ans) => (
        <div className="display-ans" key={ans.id}>
          <p>{HTMLReactParser(ans.body)}</p>
          <div className="question-actions-user">
            <div>
              <button type="button" onClick={handleShare}>
                Share
              </button>
              {User?.result?.id === ans?.userId && (
                <button
                  type="button"
                  onClick={() => handleDelete(ans.id, question.answers.length)}
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <p>answered {moment(ans.createdAt).fromNow()}</p>
              <Link
                to={`/Users/${ans.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
                <Avatar
                  backgroundColor="lightgreen"
                  px="8px"
                  py="5px"
                  borderRadius="4px"
                >
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayAnswer;
