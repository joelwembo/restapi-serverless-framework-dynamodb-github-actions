"use strict";

const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const middy = require("middy");
const { errorHandler } = require("../../../utils/errorHandler");
const { authorize } = require("../../../utils/tokenValidator");

module.exports.handler = middy(async (event) => {
  const { username: userEmail } = event.user;
  const params = {
    TableName: "NoteTable",
    KeyConditionExpression: "userEmail = :userEmail",
    ExpressionAttributeValues: {
      ":userEmail": userEmail,
    },
  };
  try {
    const notes = await documentClient.query(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        notes,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Cannot fetch note",
        error: err,
      }),
    };
  }
})
  .use(authorize())
  .use(errorHandler());
