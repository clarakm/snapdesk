import React, { useState } from "react";

const LiveChat = props => {
  const [text, setText] = useState("");
  // console.log("clicked");
  // console.log("in props.msg", props.messages);

  // pass down chat history here, follow render logic for 'logs'
  const history = props.history.map((chat, i) => {
    return (
      <div key={i}>
        <div className="timeStamp">
          {chat.timestamp.slice(11,19)}
        </div>
        {chat.userName}:&nbsp;&nbsp;{chat.message}
      </div>
    )
  })

  const logs = props.messages.map((chat, i) => {
    return (
      <div key={i}>
        {props.userName}:&nbsp;&nbsp;{chat.messages}
      </div>
    );
  });
  console.log("logs", logs);
  return (
    <div className="chatBox">
      <div className="chatLog">
        {history}
        {logs}
      </div>
      <input
        className="inputBox"
        type="text"
        name="chat"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        className="sendButton"
        onClick={() => {
          props.sendChat({
            messages: text
          });
          setText("");
        }}
      >
        send
      </button>
    </div>
  );
};

export default LiveChat;

//add sendChatAction here
//onClick={() => {
// props.sendChatAction({
//   username: props.username,
//   msg: textValue
// });
// changeTextValue("");
// }}
