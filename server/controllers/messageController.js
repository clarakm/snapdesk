const db = require("../models/userModel");

const messageController = {};

messageController.getMessage = (req, res, next) => {
  //   console.log("i am a body", req.body);
  const { userId, userName, message } = req.body;
  const addMessage = {
    text: `
        INSERT INTO chats (user_id, user_name, message, timestamp)
        VALUES
        ($1, $2, $3, NOW())
        RETURNING *
        `,
    values: [userId, userName, message]
  };
  db.query(addMessage)
    .then(success => {
      //   console.log("saved in db", success);
      res.locals.message = success.rows[0];
      return next();
    })
    .catch(err =>
      next({
        log: `Error in middleware ticketsController.getMessage: ${err}`
      })
    );
};

module.exports = messageController;
