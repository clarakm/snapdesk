import React, { useState } from "react";

const CommentBox = () => {
  const [comments, setComments] = useState("");
  const [logs, setLogs] = useState([]);
  console.log("test log", logs);
  const commentList = logs.map(cmt => {
    return <div className="singleComment">{cmt}</div>;
  });
  return (
    <div className="commentBox">
      <div className="commentLog">{commentList}</div>
      <input
        className="inputBox"
        type="text"
        name="comment"
        value={comments}
        onChange={e => {
          setComments(e.target.value);
        }}
      />
      <button
        className="postCommentButton"
        onClick={() => {
          setLogs([...logs, comments]);
          setComments("");
        }}
      >
        post
      </button>
    </div>
  );
};

export default CommentBox;
