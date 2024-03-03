const AWS = require("aws-sdk");
const Cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { email, password } = body;

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    const response = await Cognito.initiateAuth(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(response.AuthenticationResult),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error logging in" }),
    };
  }
};
