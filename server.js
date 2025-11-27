const express = require('express');
const { Twilio } = require('twilio');

const app = express();
app.use(express.json());

// Twilio setup
const twilio = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/webhook/order-confirmation', (req, res) => {
  try {
    const orderData = req.body;
    const timestamp = new Date(orderData.timestamp);
    
    // Format optimized message
    const itemsList = orderData.items.map((item, index) => {
      return `${index + 1}. ${item.name} x${item.quantity} ${item.price}=${item.total}MRU`;
    }).join('\n');
    
    const whatsappMessage = `COMMANDE Mustafa\n${timestamp.toLocaleDateString('fr-FR')} ${timestamp.toLocaleTimeString('fr-FR')}\n\n${itemsList}\n\nTOTAL: ${orderData.totalAmount} MRU`;
    
    // Send WhatsApp
    twilio.messages.create({
      body: whatsappMessage,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+22227265400'
    }).then(() => {
      res.json({status: 'success', message: 'Order received and WhatsApp notification sent'});
    }).catch(error => {
      console.error('Twilio error:', error);
      res.status(500).json({status: 'error', message: 'Failed to send WhatsApp'});
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({status: 'error', message: 'Server error'});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
