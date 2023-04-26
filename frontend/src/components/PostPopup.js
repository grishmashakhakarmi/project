import React from "react";
import moment from 'moment';

const PostPopup = ({ userPostData }) => {
  return (
    <>
      <h3 className="card-header">{userPostData.problem_name}</h3>
      <div className="card-body">
        <h5 className="card-title">{userPostData.condition}</h5>
        <p className="card-text">{userPostData.contact_number}</p>
        <p className="card-text">{moment(userPostData.occur_date).fromNow()}</p>
        <p className="card-text">{userPostData.blood_group}</p>
        <p className="card-text">{userPostData.problem_description}</p>
      </div>
    </>
  );
};

export default PostPopup;
