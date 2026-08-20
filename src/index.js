export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    // Crear pago de Mercado Pago
    if (url.pathname === "/api/crear-pago" && request.method === "POST") {

      try {

        const data = await request.json();

        const response = await fetch(
          "https://api.mercadopago.com/checkout/preferences",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${env.MP_ACCESS_TOKEN}`
            },
            body: JSON.stringify({
              items: [
                {
                  title: data.title,
                  quantity: 1,
                  unit_price: Number(data.amount),
                  currency_id: "ARS"
                }
              ],
              external_reference: data.orderId
            })
          }
        );

        const result = await response.json();

        if (!response.ok) {
          return new Response(
            JSON.stringify({
              error: result.message || "Error al crear el pago"
            }),
            {
              status: 500,
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
        }

        return new Response(
          JSON.stringify({
            init_point: result.init_point
          }),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

      } catch (error) {

        return new Response(
          JSON.stringify({
            error: error.message
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

      }
    }

    // Todo lo demás: servir la página normalmente
    return env.ASSETS.fetch(request);
  }
};
