import React, { Component } from "react";

import LiveChat from "./LiveChat";
import io from "socket.io-client";
let socket;
socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"]
});

class RightNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderChat: false,
      messages: []
    };
    this.renderChat = this.renderChat.bind(this);
    this.sendChat = this.sendChat.bind(this);
  }

  componentDidMount() {
    socket.on("chat", message => {
      console.log("sock on cm", message);
      this.setState(prevState => ({
        messages: prevState.messages.concat(message)
      }));
      // console.log(this.state.messages);
    });
  }
  renderChat() {
    console.log("in render chat");
    this.setState({ renderChat: true });
  }

  // Socket send chat action
  sendChat(value) {
    console.log("in send chat");
    socket.emit("chat", value);
  }
  render() {
    let chatBox;
    if (this.state.renderChat) {
      chatBox = (
        <LiveChat
          sendChat={this.sendChat}
          messages={this.state.messages}
          userName={this.props.userName}
        />
      );
    }

    return (
      <div className="rightNav">
        <div className="rightBar">
          <div className="rightField">
            Active Tickets: {this.props.ticketsCount}
          </div>
          <div className="rightField">
            Resolved Tickets: {this.props.resolvedTickets}
          </div>
          <div className="chatContainer">
            <button
              onClick={() => this.renderChat()}
              id="chatBtn"
              className="btn btn-success"
            >
              Chat
            </button>
            {chatBox}
          </div>
        </div>
      </div>
    );
  }
}

export default RightNav;
