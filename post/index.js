let AWS = require('aws-sdk');

// Set the region 
AWS.config.update({region: 'sa-east-1'});

// Create the DynamoDB service object
var dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

exports.handler = async function(event, context, callback) {
  
  let requestJSON = JSON.parse(event.body);

  const params = {
    TableName: "tablename",
    Item: {
      id: requestJSON.id,
      email: requestJSON.email,
      name: requestJSON.name,
      phone: requestJSON.phone,
      level: requestJSON.level
    },
  };
  try {
    await dynamo.put(params).promise();
    return event.body;
  } catch(err) {
    console.error(err);
  }
};