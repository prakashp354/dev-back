const cron = require("node-cron");
const {subDays, startOfDay, endOfDay} = require("date-fns");
const sendEmail = require("../utils/sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");

cron.schedule("26 18 * * *",async()=>{
    try {
         
        const yesterday = subDays(new Date(),1);

        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday)

        const pendingRequests = await ConnectionRequestModel.find({
            status:"interested",
            createdAt:{
                $gte:yesterdayStart,
                $lt:yesterdayEnd,
            }
        }).populate("fromUserId toUserId");

        const listOfEmails = [...new Set(pendingRequests.map(req=>req.toUserId.emailId))];

        for(const email of listOfEmails){   
           try {
            const res = await sendEmail.run(email,"no-reply@devs-tinder.shop",
          "New Friend Request Pending 🚀",
          "You have new friend requests waiting. Log in to DevTinder to check them.");
            console.log(res)
           } catch (err) {
            console.error("Error :"+err.message)
           }
            
        }
             
    } catch (err) {
        console.error(err)
    }
})