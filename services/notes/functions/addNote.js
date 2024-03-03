"use strict";

const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const middy = require("middy");
const { bodyValidator } = require("../../../utils/validator");
const Joi = require("joi");
const { errorHandler } = require("../../../utils/errorHandler");
const { authorize } = require("../../../utils/tokenValidator");

const noteSchema = Joi.object({
  noteText: Joi.string().required(),
});

module.exports.handler = middy(async (event) => {
  const { username: userEmail } = event.user;
  const body = JSON.parse(event.body);
  const { noteText } = body;

  const item = {
    noteText,
    userEmail,
    noteDate: new Date().getTime(),
  };

  const params = {
    TableName: "NoteTable",
    Item: item,
  };

  await documentClient.put(params).promise();
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Note added successfully",
    }),
  };
})
  .use(authorize())
  .use(bodyValidator(noteSchema))
  .use(errorHandler());
