/**
 * ************************************
 *
 * @module  BystanderTicketBox
 * @author
 * @date
 * @description  component that renders a single textbox for all Bystanders / Mentors
 *
 * ************************************
 */
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import CommentBox from "./CommentBox.jsx";

let buttons;
class BystanderTicketBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBox: false,
      comments: []
    };
    this.renderComments = this.renderComments.bind(this);
    // this.renderChat = this.renderChat.bind(this);
  }
  renderComments() {
    console.log("in render cmt");
    this.setState({ commentBox: true });
  }
  render() {
    let commentBox;
    if (this.state.commentBox) {
      commentBox = <CommentBox />;
    }
    if (
      this.props.ticket.status === "active" &&
      this.props.userId === this.props.ticket.mentee
    ) {
      //ticket published by another user but has not been pick up yet
      //Accept button will be active but Cancel button will not and mentee is anonymous
      buttons = (
        <span>
          <Button
            onClick={() =>
              this.props.acceptTicket(this.props.messageId, this.props.userId)
            }
            type="button"
            className="btn btn-success"
          >
            Accept
          </Button>
          {/* <Button onClick={() => this.props.chat()} className="btn btn-success">
            Chat
          </Button> */}
          <Button disabled={true} type="button" className="btn btn-secondary">
            Cancel
          </Button>
        </span>
      );
    } else if (
      this.props.ticket.status === "active" &&
      this.props.userId !== this.props.ticket.mentee
    ) {
      //ticket published by another user but has not been pick up yet
      //Accept button will be active but Cancel button will not and mentee is anonymous
      buttons = (
        <span>
          <Button
            onClick={() =>
              this.props.acceptTicket(this.props.messageId, this.props.userId)
            }
            type="button"
            className="accept"
          >
            Accept
          </Button>
          <Button
            type="button"
            className="commentBtn"
            onClick={() => this.renderComments()}
          >
            Comment
          </Button>
          {/* <Button onClick={() => this.props.chat()} className="btn btn-success">
          Chat
        </Button> */}
          {/* <Button disabled={true} type="button" className="btn btn-secondary">
          Cancel
        </Button> */}
        </span>
      );
    } else if (
      this.props.userId !== this.props.ticket.mentorId &&
      this.props.ticket.status === "pending"
    ) {
      //this is when the ticket has been picked up by another mentor already
      //Both button will not be active and mentee is anonymous
      buttons = (
        <span>
          <Button disabled={true} type="button" className="pending">
            Pending
          </Button>
          {/* <Button disabled={true} type="button" className="btn btn-secondary">
            Cancel
          </Button> */}
        </span>
      );
    } else if (
      this.props.userId === this.props.ticket.mentorId &&
      this.props.ticket.status === "pending"
    ) {
      //user is the mentor
      //When ticket is 'pending' set button to decline(from mentor)
      buttons = (
        <span>
          <Button disabled={true} type="button" className="pending">
            Pending
          </Button>
          <Button
            onClick={() => this.props.cancelAccept(this.props.messageId)}
            type="button"
            className="decline"
          >
            Decline
          </Button>
        </span>
      );
    }

    return (
      <div className="ticketbox">
        <p className="request">
          Request:<span className="req"> {this.props.messageInput}</span>
        </p>
        <p className="expected">
          Expected Snaps:{" "}
          <span className="req">{this.props.messageRating}</span>
        </p>
        {buttons}
        <div className="cmtbx">{commentBox}</div>
        {/* <CommentBox /> */}
      </div>
    );
  }
}
export default BystanderTicketBox;
