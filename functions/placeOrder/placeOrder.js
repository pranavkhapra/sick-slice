const nodemailer = require("nodemailer");

//create a transport for the nodemailer
//and also you dont need to hard code it so basically you will use the env file

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});



// we create here handler in this file basically handler are node js ////amazon  serverless function under the hoods its the amazon lambda
exports.handler=async(event ,context)=>{
    
//test send an email basically i am sending the  temp email with the transporter and send the temporary for the checking that the services are running
const info =await transporter.sendMail({
    from:'Slick Slices <slick@example.com>',
    to:'orders@example.com',
    subject:'New Order!',
    html:`<p>Your New Pizza Order is here</p>`
})
return { 
    statusCode:200,
    body:JSON.stringify(info)
}

}