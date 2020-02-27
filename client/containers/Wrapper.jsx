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
import FeedContainer from "./FeedContainer";
import { bindActionCreators } from "redux";

import RightNav from "../components/RightNav";

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
        <div className="row">
          <div className="colOne">
            <LeftNav
              url={this.props.userAvatar}
              userName={this.props.userName}
              logOut={this.props.logOut}
            />
          </div>
          <div className="colTwo">
            <FeedContainer />
          </div>
          <div className="colThree">
            <RightNav
              ticketsCount={this.props.ticketsCount}
              resolvedTickets={this.props.resolvedTickets}
              userName={this.props.userName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
