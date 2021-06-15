const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(function(context, event, callback) {
  // Add the NodeJS Helper Library by calling context.getTwilioClient()
  const client = context.getTwilioClient();

  // Create a custom Twilio Response
  // Set the CORS headers to allow Flex to make an HTTP request to the Twilio Function
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Use FileSystem library to read the json.
  const fs = require('fs');
  let file = Runtime.getAssets()[event.languageRequested].path;
  let text = fs.readFileSync(file).toString('utf-8');

  // Update the rest of the response.
  response.appendHeader('Content-Type', 'application/json');
  response.setBody(JSON.parse(text));

  callback(null, response);
});

