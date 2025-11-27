// Modern Node.js has fetch built-in, no need for node-fetch
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Parse the incoming order data
    const orderData = JSON.parse(event.body);
    
    console.log('Sending order to n8n:', orderData);
    
    // Send to n8n (server-to-server, no CORS issues)
    const response = await fetch('https://bored-oub.app.n8n.cloud/webhook/order-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    console.log('n8n response status:', response.status);

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          status: 'success', 
          message: 'Order sent to WhatsApp' 
        })
      };
    } else {
      const errorText = await response.text();
      console.error('n8n error:', errorText);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          status: 'error', 
          message: 'Failed to send order',
          error: errorText
        })
      };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        status: 'error', 
        message: error.message 
      })
    };
  }
};
