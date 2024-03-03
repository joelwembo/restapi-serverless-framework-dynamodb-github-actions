const { ValidationError } = require("joi");
const AuthorizationError = require("../errors/authorizationError");

exports.errorHandler = () => ({
  onError: (handler, next) => {
    console.error(handler.error);
    if (handler.error instanceof ValidationError) {
      handler.response = {
        statusCode: 400,
        body: JSON.stringify({ error: handler.error.details }),
      };
    } else if (handler.error instanceof AuthorizationError) {
      handler.response = {
        statusCode: 401,
        body: JSON.stringify({ error: "Unauthorized" }),
      };
    } else {
      handler.response = {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal server error" }),
      };
    }

    next();
  },
});
