import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Questions = ({ question }) => {
  return (
    <div className="display-question-container">
      <div className="display-votes-ans">
        <p>{question.votes}</p>
        <p>votes</p>
      </div>
      <div className="display-votes-ans">
        <p>{question.answers.length}</p>
        <p>answers</p>
      </div>
      <div className="display-question-details">
        <Link to={`/Questions/${question.id}`} className="question-title-link">
          {question.title.length > (window.innerWidth <= 400 ? 70 : 90)
            ? question.title.substring(0, window.innerWidth <= 400 ? 70 : 90) + "..."
            : question.title}
        </Link>
        <div className="display-tags-time">
          <div className="display-tags">
            {question.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
          <p className="display-time">
            Asked {moment(question.created_at).fromNow()} by {question.userPosted}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Questions;
