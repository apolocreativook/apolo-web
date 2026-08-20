exports.handler = async function(event) {
  console.log("WEBHOOK RECIBIDO");

  console.log("Method:", event.httpMethod);
  console.log("Body:", event.body);
  console.log("Query:", event.queryStringParameters);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      received: true
    })
  };
};
