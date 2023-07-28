import { SQS } from 'aws-sdk';

import sendTextNotification from '../Services/text-service';
export async function handler(event) {
  const sqs = new SQS();
  if(Records.length==0)
  {
    return "Invalid";
  }

    for (const record of event.Records) {
        try {
      const { message,fromNumber,toNumber } = record;
    //   
    //   if(){}
    // New to Insert in db table00
    // Start processing to send text message. // status Processing , startTime : Now , from number , to NUmber , id 
    await sendTextNotification(JSON.parse(message,fromNumber,toNumber));
    console.log('Received SQS message:', body);
    // Update table   Delivered Time Now, Status "Delivered ", 



    //   const message = JSON.parse(body);
    console.log('Parsed message:', message);
    }catch(err){
        // Need to update table 
        // Status Failed, Status   Message :err 
        // Need to integrate logger
            console.log(err);
        }
    }



}