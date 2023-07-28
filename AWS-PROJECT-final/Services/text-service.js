import twilio from 'twilio';
const dotenv = require('dotenv');
dotenv.config();
const sendTextNotification = async (message, fromNumber, toNumber) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;


  //aws service to store paramters

  const client = twilio(accountSid, authToken);
  try {
    await client.messages.create({
      body: message,
      from: fromNumber,
      to: toNumber
    });

    return { success: true, message: 'Message sent successfully' };
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error(JSON.stringify(error));
  }
};
export default sendTextNotification;


