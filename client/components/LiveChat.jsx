import React, { useState } from "react";

const LiveChat = props => {
  const [text, setText] = useState("");
  // console.log("clicked");
  // console.log("in props.msg", props.messages);
  const logs = props.messages.map((chat, i) => {
    return <div key={i}>{chat.messages}</div>;
  });
  console.log("logs", logs);
  return (
    <div className="chatBox">
      <div className="chatLog">{logs}</div>
      <input
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
