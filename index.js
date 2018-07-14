const sendEmail = require('./send-mail')

exports.handler = async (event, context, callback) => {
  const response = {
    "statusCode": 200,
    "headers": {
      "Access-Control-Allow-Origin": "*"
    },
    "isBase64Encoded": false
  };
  try {
    const requestBody = JSON.parse(event.body);
    if (requestBody && (requestBody.mail || requestBody.phone)) {
      await sendEmail(requestBody);
      response.body = JSON.stringify({ status: 'success' });
      callback(null, response);
    } else {
      response.statusCode = 500;
      response.body = 'Invalid payload: ' + JSON.stringify(event);
      callback(null, response);
    }
  } catch (e) {
    response.statusCode = 500;
    response.body = e.toString();
    return callback(null, response)
  }
};
