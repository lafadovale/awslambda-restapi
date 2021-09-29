const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  try {
    switch (event.routeKey) {
      case "GET /leads/{id}":
        body = await dynamo
          .get({
            TableName: "tableName",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /leads":
        body = await dynamo.scan({ TableName: "hcfinal" }).promise();
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }
  return {
    statusCode,
    body,
    headers
  };
};