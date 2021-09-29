const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  try {
    await dynamo
      .update({
        TableName: "hcfinal",
        Key: {
          id: event.pathParameters.id
        },
        UpdateExpression: "set category = :c",
        ExpressionAttributeValues:{
          ":c": "customer"
        }
      })
        .promise();
        body = `User ${event.pathParameters.id} updated to customer`;
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