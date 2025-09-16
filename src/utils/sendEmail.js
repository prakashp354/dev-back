const{ SendEmailCommand } =require( "@aws-sdk/client-ses");
const{ sesClient } =require("./sesClient.js");

const createSendEmailCommand = (toAddress, fromAddress,subject ,body) => {
  return new SendEmailCommand({
    Destination: {
      
      CcAddresses: [
        
      ],
      ToAddresses: [
        toAddress,
        
      ],
    },
    Message: {
      
      Body: {
       
        Html: {
          Charset: "UTF-8",
          Data: `<h1>${body}</h1>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "This is the text format email",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Hello User",
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      
    ],
  });
};

const run = async (subject ,body) => {
  const sendEmailCommand = createSendEmailCommand(
    "chandubajjuri2525@gmail.com",
    "no-reply@devs-tinder.shop" ,
    subject ,body
   
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

module.exports = {run};

