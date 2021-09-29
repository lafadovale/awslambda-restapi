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
      .delete({
        TableName: "hcfinal",
        Key: {
          id: event.pathParameters.id
        }
      })
        .promise();
    body = `Deleted user ${event.pathParameters.id}`;
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