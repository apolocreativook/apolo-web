exports.handler = async function(event) {
  try {

    // Mercado Pago puede enviar diferentes tipos de notificaciones.
    const body = event.body ? JSON.parse(event.body) : {};

    console.log("Webhook Mercado Pago recibido:", body);

    // Respondemos rápidamente para confirmar que recibimos la notificación.
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        received: true
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
