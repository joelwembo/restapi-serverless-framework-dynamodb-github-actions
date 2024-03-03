import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
  

export const lambdaHandler = async ( event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    const queries = JSON.stringify("data: Data loading data");
    return {
      statusCode: 200,
      body: `Queries: ${queries}`
    }
  }