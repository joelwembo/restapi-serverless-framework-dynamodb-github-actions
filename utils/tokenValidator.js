const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const AuthorizationError = require("../errors/authorizationError");

const cognitoIssuer = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;

const client = jwksClient({
  jwksUri: `${cognitoIssuer}/.well-known/jwks.json`,
});

async function validateToken(token, kid) {
  const key = await client.getSigningKey(kid);
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      key.getPublicKey(),
      { issuer: cognitoIssuer },
      (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      }
    );
  });
}

exports.authorize = () => ({
  before: async (handler, next) => {
    const { event } = handler;
    const authHeader =
      event.headers.Authorization || event.headers.authorization;

    if (!authHeader) {
      throw new AuthorizationError("No authorization header provided.");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new AuthorizationError("Invalid authorization header format.");
    }

    const token = authHeader.substring(7);

    const decodedToken = jwt.decode(token, { complete: true, json: true });

    const userData = await validateToken(token, decodedToken.header.kid);
    event.user = userData;
    next();
  },
});
