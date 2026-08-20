const crypto = require("crypto");

exports.handler = async function(event) {
  try {

    // Mercado Pago envía las notificaciones mediante POST.
    const body = event.body ? JSON.parse(event.body) : {};

    console.log("Webhook Mercado Pago recibido:", body);

    // Identificador del pago enviado por Mercado Pago.
    const paymentId =
      event.queryStringParameters?.["data.id"] ||
      body.data?.id ||
      body.id ||
      null;

    console.log("Payment ID:", paymentId);

    // Por ahora confirmamos recepción.
    // La verificación completa del pago se hará en el siguiente paso.

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        received: true,
        paymentId: paymentId
      })
    };

  } catch (error) {

    console.error("Error procesando webhook:", error);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        received: true
      })
    };
  }
};
