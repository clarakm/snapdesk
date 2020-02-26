import React from "react";

const LiveChat = () => {
  console.log("clicked");
  return (
    <div className="chatBox">
      <div className="chatLog"></div>
      <input type="text" name="chat" placeholder="chat here..." />
      <button className="sendButton">send</button>
    </div>
  );
};

export default LiveChat;
