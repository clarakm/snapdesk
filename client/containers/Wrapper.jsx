/**
 * ************************************
 *
 * @module  Wrapper
 * @author team snapdesk
 * @date 02/22/2020
 * @description component that renders Navbars, FeedContainer and TicketCreator
 *
 * ************************************
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as ticketActions from "../actions/ticketActions";
import * as userActions from "../actions/userActions";
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import FeedContainer from "./FeedContainer";
import { bindActionCreators } from "redux";

const mapStateToProps = state => ({
  totalSnaps: state.tickets.totalSnaps,
  leaderBoard: state.tickets.leaderBoard,
  ticketsCount: state.tickets.ticketsCount,
  userAvatar: state.user.userAvatar,
  userName: state.user.userName,
  resolvedTickets: state.tickets.resolvedTickets
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(userActions, dispatch);

class Wrapper extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserData();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="row align-items-start">
          <div className="col-2">
<<<<<<< HEAD
            <LeftNav url={this.props.userAvatar} userName={this.props.userName} logOut={this.props.logOut}/>
=======
            <LeftNav
              url={this.props.userAvatar}
              userName={this.props.userName}
            />
>>>>>>> 7b2138d842f2a77ec17e251cf5c30f7adf44948e
          </div>
          <div className="col-8">
            <FeedContainer />
          </div>
          <div className="col-2">
            <RightNav
              ticketsCount={this.props.ticketsCount}
              resolvedTickets={this.props.resolvedTickets}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
