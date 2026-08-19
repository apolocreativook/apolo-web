exports.handler = async function(event) {
  try {
    const data = JSON.parse(event.body);

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.MP_ACCESS_TOKEN
      },
      body: JSON.stringify({
        items: [
          {
            title: data.title || "Entrada",
            quantity: 1,
            currency_id: "ARS",
            unit_price: Number(data.amount)
          }
        ],
        back_urls: {
          success: "https://tu-sitio.netlify.app/",
          failure: "https://tu-sitio.netlify.app/",
          pending: "https://tu-sitio.netlify.app/"
        },
        auto_return: "approved"
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify(result)
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        init_point: result.init_point
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};