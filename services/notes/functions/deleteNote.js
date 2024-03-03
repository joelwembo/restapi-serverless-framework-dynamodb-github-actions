"use strict";

const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const middy = require("middy");
const { errorHandler } = require("../../../utils/errorHandler");
const { authorize } = require("../../../utils/tokenValidator");

module.exports.handler = middy(async (event) => {
  const { username: userEmail } = event.user;

  const { noteDate } = event.pathParameters;

  const params = {
    TableName: "NoteTable",
    Key: {
      userEmail,
      noteDate: +noteDate,
    },
  };
  try {
    await documentClient.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Note deleted successfully",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Cannot delete note",
        error: err,
      }),
    };
  }
})
  .use(authorize())
  .use(errorHandler());
