## Creating RESTful API using Serverless Framework with TypeScript and Github Actions

![image](https://github.com/joelwembo/restapi-serverless-framework-dynamodb-github-actions/assets/19718580/8a644dcc-aa6d-440f-b602-a9abc1a8aa81)


The Serverless Framework is a free and open-source web framework written using Node.js. Serverless is the first framework developed for building applications on AWS Lambda, a serverless computing platform provided by Amazon as a part of Amazon Web Services

joel wembo serverless framework , github actions and api gateway
AWS API Gateway RESTful API using Serverless Framework
In this blog, we’ll guide you through the process of creating a simple REST API that get input from the clients , process it and produce output as json. We’ll leverage the power of AWS Lambda functions for real-time operations, DynamoDB for storing and retrieving results, and API Gateway for seamless communication. By the end of this journey, you’ll have the skills to build a responsive and scalable solution that showcases the true potential of serverless architecture.

## To create a REST API using the Serverless Framework with TypeScript, you can follow these steps:

Install Serverless Framework: First, make sure you have Node.js installed on your machine. Then, you can install the Serverless Framework globally using npm:
npm install -g serverless
2. Create a new Serverless project: Navigate to the directory where you want to create your project and run:

serverless create --template aws-nodejs-typescript --path restapi-serverless-framework-dynamodb-github-actions
3. Install Serverless TypeScript Plugin:

This plugin simplifies integration. Install it with

npm install serverless-plugin-typescript
4. Configure Serverless

In serverless.yml, configure your service and provider details as usual.
The plugin typically handles most aspects of TypeScript compilation during deployment, so extensive configuration isn’t required.
final project structure with GitHub actions and typescript setup


## serverless framework project setup with github actions
Define provider and custom apikeys

provider:
  name: aws
  runtime: nodejs18.x
  region: ap-southeast-1
  httpApi:
    cors: true
  profile: 'default'
  stage: dev

custom:
  postsTableName: posts-table-${self:provider.stage}
  apiKeys:
    - name: name1
      deleteAtRemoval: false
    - name: name2
      deleteAtRemoval: false
    - name: user1
      deleteAtRemoval: false
      # value: ""
    - name: user2
      deleteAtRemoval: false
      # value: ""
Define Api keys and offline plugins

npm install --save-dev serverless-add-api-key
npm install --save-dev serverless-dynamodb-local
npm install --save-dev serverless-plugin-typescript
npm install --save-dev serverless-iam-roles-per-function
npm install --save-dev serverless-offline
plugins:
  - serverless-plugin-typescript
  - serverless-iam-roles-per-function
  - serverless-dynamodb-local
  - serverless-offline
  - serverless-add-api-key
5. Define REST API Endpoints:

Create Lambda functions for your API endpoints using TypeScript syntax.
Leverage the serverless.yml file to define events that map incoming HTTP requests (GET, POST, etc.) to specific Lambda functions.
service: restapi-serverless-framework-dynamodb

frameworkVersion: "3"

provider:
  name: aws
  runtime: nodejs18.x
  region: ap-southeast-1
  httpApi:
    cors: true
  profile: 'default'
  stage: dev

custom:
  postsTableName: posts-table-${self:provider.stage}
  apiKeys:
    - name: dev1
      deleteAtRemoval: false
    - name: dev2
      deleteAtRemoval: false
  
  iamRoleStatements:
  - Effect: Allow
    Action:
    - dynamodb:Query
    - dynamodb:PutItem
    - dynamodb:GetItem
    - dynamodb:DeleteItem
    - dynamodb:Scan
    - dynamodb:UpdateItem
    - dynamodb:DescribeTable
    Resource:
      Fn::GetAtt:
      - NoteTable
      - Arn
  - Effect: Allow
    Action:
    - cognito-idp:AdminConfirmSignUp
    Resource:
    - !Sub arn:aws:cognito-idp:${AWS::Region}:${AWS::AccountId}:userpool/${CognitoUserPool}
  environment:
    DYNAMODB_TABLE_NAME: ${self:custom.postsTableName}
    COGNITO_CLIENT_ID:
      Ref: CognitoUserPoolClient
    COGNITO_USER_POOL_ID:
      Ref: CognitoUserPool

plugins:
  - serverless-plugin-typescript
  - serverless-iam-roles-per-function
  - serverless-dynamodb-local
  - serverless-offline
  - serverless-add-api-key

#resources
resources:
  Resources:
    NoteTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: NoteTable
        KeySchema:
        - AttributeName: userEmail
          KeyType: HASH
        - AttributeName: noteDate
          KeyType: RANGE
        AttributeDefinitions:
        - AttributeName: userEmail
          AttributeType: N
        - AttributeName: noteDate
          AttributeType: N
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
    CognitoUserPool:
      Type: AWS::Cognito::UserPool
      Properties:
        UserPoolName: noteAppUserPool
        Schema:
        - Name: email
          AttributeDataType: String
          Mutable: true
          Required: true
        Policies:
          PasswordPolicy:
            MinimumLength: 8
    CognitoUserPoolClient:
      Type: AWS::Cognito::UserPoolClient
      Properties:
        ClientName: noteAppUserPoolClient
        GenerateSecret: false
        UserPoolId:
          Ref: CognitoUserPool
        ExplicitAuthFlows:
        - USER_PASSWORD_AUTH

functions:
  addNote:
      handler: services/notes/functions/addNote.handler
      events:
      - http:
          method: post
          path: /note
          private: true
          cors:
            origin: '*'
            headers:
              - Content-Type
              - X-Api-Key
            allowCredentials: false
  deleteNote:
      handler: services/notes/functions/deleteNote.handler
      events:
      - http:
          path: /note/{noteDate}
          method: delete
          private: true
          cors:
            origin: '*'
            headers:
              - Content-Type
              - X-Api-Key
            allowCredentials: false
  getAllNotes:
      handler: services/notes/functions/getAllNotes.handler
      events:
      - http:
          path: /note
          method: get
          private: true
          cors:
            origin: '*'
            headers:
              - Content-Type
              - X-Api-Key
            allowCredentials: false
  registerUser:
      handler: services/notes/functions/register.handler
      events:
      - http:
          method: post
          path: /register
          private: true
          cors:
            origin: '*'
            headers:
              - Content-Type
              - X-Api-Key
            allowCredentials: false
  loginUser:
      handler: services/notes/functions/login.handler
      events:
      - http:
          method: post
          path: /login
          private: true
          cors:
            origin: '*'
            headers:
              - Content-Type
              - X-Api-Key
            allowCredentials: false

  hello:
    handler: services/index.handler
    events:
      - http:
          path: /hello
          method: post
          private: true
          cors:
            origin: '*'
            headers:
              - Content-Type
              - X-Api-Key
            allowCredentials: false
6. Develop Lambda Functions (TypeScript):

Create a directory for your handler functions (e.g., services/notes/functions , services/index ).
Implement the logic for your API endpoints using TypeScript.
Utilize libraries like aws-sdk (for AWS) or similar provider-specific libraries to interact with resources (databases, etc.) if needed.
7. Leverage TypeScript Benefits:

Define interfaces and types for request bodies, responses, and data models to ensure type safety and improve code readability.
Use TypeScript features like decorators and generics for cleaner and more maintainable code.
import { APIGatewayProxyHandler } from 'aws-lambda';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Congratulations ! Your function executed successfully!' }),
  };
};
Deploy your API: Once you’ve defined your API and written your TypeScript code, you can deploy it using the following command:

serverless deploy

Converting Typescript codes to javascript

serverless framework complete deployment
This will deploy your Serverless application to your AWS account.

Test your API: After deploying, you can test your API using tools like curl, Postman, or through a web browser. For example:

curl https://wdjq5g9xo0.execute-api.ap-southeast-1.amazonaws.com/dev/hello
CI/CD Implementation Using Github Actions

Creating secrets for a repository

On GitHub.com, navigate to the main page of the repository.
Under your repository name, click Settings. …
In the “Security” section of the sidebar, select Secrets and variables, then click Actions.
Click the Secrets tab.
Click New repository secret.

joel wembo, github actions
Github Actions Creating secrets for a repository
Edit the CI-CD.yaml inside the folder .github/workflows

name: CI/CD serverless-typescript workflows

on:
  push:
    branches: 
        - main
        - master
        - develop
        - 'release/*'
    tags: 
        - prod-v*
  pull_request:
    branches: 
        - main
        - master
        - develop
        - 'release/*'

env:
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  AWS_DEFAULT_REGION: "ap-southeast-1"                

jobs:
  build:
    name: build
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/cache@v2
      with:
        path: '**/node_modules'
        key: ${{ runner.os }}-modules-${{ hashFiles('**/yarn.lock') }}
    - name: Use Node.js 18.x
      uses: actions/setup-node@v1
      with:
        node-version: 18.x
    - name: Install dependencies
      run: npm install

  uat:
    runs-on: ubuntu-latest
    needs: build
    steps:   
      - uses: actions/checkout@v3
      - uses: actions/cache@v2
        with:
          path: '**/node_modules'
          key: ${{ runner.os }}-modules-${{ hashFiles('**/yarn.lock') }}
      - name: Use Node.js 18.x
        uses: actions/setup-node@v3
        with:
          node-version: 18.x
      - name: Install serverless Globally
        run: npm install -g serverless     
      - name: End to End Tests
        run: serverless --version

  deploy:
    runs-on: ubuntu-latest
    needs: uat
    steps:
    - uses: actions/checkout@v3
    - uses: actions/cache@v2
      with:
          path: '**/node_modules'
          key: ${{ runner.os }}-modules-${{ hashFiles('**/yarn.lock') }}
    - name: Use Node.js 18.x
      uses: actions/setup-node@v3
      with:
          node-version: 18.x
    - name: Install dependencies
      run: npm install
    - name: Install serverless Globally
      run: npm install -g serverless     
   
    # - name: Check AWS Credentials list
    #   run: aws configure list     
    - name: Serverless AWS authentication
      run: serverless config credentials --provider aws --key ${{ secrets.AWS_ACCESS_KEY_ID }} --secret ${{ secrets.AWS_SECRET_ACCESS_KEY }}    
   
    - name: serverless deploy
      # uses: serverless/github-action@v2
      run: serverless deploy
      # with:
      #   args: deploy



Github Actions Workflows successfully completed
serverless framework has successfully trigger the creation of new Cloudformation stack to provision all the needed resources



## CloudFormation Resources created
AWS Lambda URL deployed



## AWS Lambda URL

AWS lambda successfully deployed
API Testing Using Postman

In the request Authorization tab, select API Key from the Type list. Enter your key name and value, and select either Header or Query Params from the Add to dropdown list. You can store your values in variables for extra security.


You can also define global environments api keys values to be used across your collections as follows:



## Conclusions

We’ve successfully created a CI/CD pipeline using Github Actions to deploy a serverless framework soltions to aws. The pipeline will be triggered on every push to the main , master and feature branch. The pipeline will build a new CloudFormation Stacks, to update or to create new AWS Api Gateway Endpoints, lambda and DynamoDB tables

You can also find the codes on Github here.

Thank you for Reading !! 🙌🏻😁📃, see you in the next article.🤘

References

Serverless: Zero-Friction Serverless Apps On AWS Lambda & Beyond.
Easily build auto-scaling, low-overhead applications on AWS Lambda, API Gateway, DynamoDB, and other managed services…
www.serverless.com

What is Amazon API Gateway?
Overview of Amazon API Gateway and its features.
docs.aws.amazon.com

Serverless Framework: Plugins
The Serverless Framework Plugin Registry. Search thousands of Serverless Framework plugins.
www.serverless.com

Authorization types supported by Postman | Postman Learning Center
Authorization types supported by Postman: documentation for Postman, the collaboration platform for API development…
learning.postman.com
