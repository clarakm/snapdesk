/**
 * ************************************
 *
 * @module  ticketActions.js
 * @author team snapdesk
 * @date 02/22/2020
 * @description Action Creators for ticketReducer
 *
 * ************************************
 */

// import actionType constants
import axios from "axios";
import * as types from "../constants/actionTypes";

export const postTicket = () => (dispatch, getState) =>
  axios
    .post("/api/tickets", {
      mentee_id: getState().user.userId,
      message: getState().tickets.messageInput,
      status: "active",
      snaps_given: getState().tickets.messageRating
    })
    .then(({ data }) => {
      if (!data.isLoggedIn) {
        dispatch({
          type: types.USER_LOGOUT,
          payload: data
        });
      } else {
        dispatch({
          type: types.POST_TICKET,
          payload: data
        });
      }
    });

export const getTickets = () => dispatch =>
  axios.get("/api/tickets").then(({ data }) => {
    if (!data.isLoggedIn) {
      dispatch({
        type: types.USER_LOGOUT,
        payload: data
      });
    } else {
      dispatch({
        type: types.GET_TICKETS,
        payload: data.activeTickets || []
      });
    }
  });

export const updateMessage = event => ({
  type: types.UPDATE_MESSAGE,
  payload: event.target.value
});

export const updateRating = event => ({
  type: types.UPDATE_RATING,
  payload: event.target.value
});

export const deleteTicket = id => (dispatch, getState) =>
  axios
    .put("/api/tickets/delete", {
      ticketId: id,
      status: "deleted"
    })
    .then(({ data }) => {
      if (!data.isLoggedIn) {
        dispatch({
          type: types.USER_LOGOUT,
          payload: data
        });
      } else {
        dispatch({
          type: types.DELETE_TICKET,
          payload: id
        });
      }
    });

export const resolveTicket = id => (dispatch, getState) =>
  axios
    .put("/api/tickets/delete", {
      ticketId: id,
      status: "resolved"
    })
    .then(({ data }) => {
      if (!data.isLoggedIn) {
        dispatch({
          type: types.USER_LOGOUT,
          payload: data
        });
      } else {
        dispatch({
          type: types.RESOLVE_TICKET,
          payload: id
        });
      }
    });

export const acceptTicket = (messageId, userId) => dispatch => {
  axios
    .put("/api/tickets/accept", {
      ticketId: messageId,
      mentorId: userId,
      status: "pending"
    })
    .then(({ data }) => {
      if (data) {
      }
    });
  return dispatch({
    type: types.ACCEPT_TICKET,
    payload: [messageId, userId]
  });
};

export const cancelAccept = messageId => dispatch => {
  axios
    .put("/api/tickets/decline", {
      ticketId: messageId,
      status: "active"
    })
    .then(({ data }) => {
      if (data) {
      }
    });
  return dispatch({
    type: types.CANCEL_ACCEPT,
    payload: messageId
  });
};

// export const acceptTicket = event => (dispatch, getState) => {
//   event.preventDefault();
//   dispatch({
//     type: types.ACCEPT_TICKET,
//     payload: ticket,
//   })
// }
