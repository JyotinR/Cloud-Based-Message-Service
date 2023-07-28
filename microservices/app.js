import express from "express";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import {startSQSListener} from "./SQS/sqshandler";


dotenv.config();

  //aws configuration                                                                                                          
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  


const app = express();
app.use(express.json());

app.post("/publish", (req, res) => {
  try {
    const sns = new AWS.SNS();
   
   
    const { message, fromNumber, toNumber } = req.body;
    const topicArn = process.env.SNS_TOPIC_ARN;

    console.log("topic", topicArn);

    let messageBody = {
      message,
      fromNumber,
      toNumber,
    };
    messageBody = JSON.stringify(messageBody);

    sns.publish(
      {
        Message: messageBody,
        TopicArn: topicArn,
      },
      (err, data) => {
        if (err) {
          console.error("Error publishing message:", err);
          res.status(500).json({ error: "Failed to publish message" });
        } else {
          console.log("Message published successfully:", data.MessageId);

      }
  })
  } catch (error) {
    console.log(error);
  }
});


app.listen(2000, () => {
  console.log("Server running on port 2000");
  startSQSListener()
});
