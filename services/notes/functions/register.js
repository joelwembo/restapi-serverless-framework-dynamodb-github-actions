const AWS = require("aws-sdk");
const Cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { email, password } = body;

  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Password: password,
    Username: email,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };
  const confirmParams = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: email,
  };

  try {
    await Cognito.signUp(params).promise();
    await Cognito.adminConfirmSignUp(confirmParams).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User registered successfully" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error registering user" }),
    };
  }
};
