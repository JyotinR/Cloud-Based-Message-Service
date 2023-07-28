const AWS = require('aws-sdk');
const sqs = new AWS.SQS();
const dotenv = require('dotenv');
dotenv.config();
export const startSQSListener = async () => {
    try {
// Need to get from the config file.
          const sqsQueueUrl = process.env.SQS_QUEUE_URL;
      const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessagesNee: 10,
        WaitTimeSeconds: 20
      };
  
      while (true) {
        const data = await sqs.receiveMessage(params).promise();
  
        if (data.Messages) {
          for (const message of data.Messages) {
            const body = JSON.parse(message.Body);
            console.log('Received SQS message:', body);
  
            // Add your SQS message handling logic here
            // Process the message, perform operations, or trigger actions based on the message content
  
            // Delete the processed message from the SQS queue
            const deleteParams = {
              QueueUrl: queueUrl,
              ReceiptHandle: message.ReceiptHandle
            };
            await sqs.deleteMessage(deleteParams).promise();
            console.log('Deleted SQS message:', body);
          }
        }
      }
    } catch (error) {
      console.error('Error receiving SQS messages:', error);
    }
}