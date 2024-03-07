const express = require("express");
const router = express.Router();
const path = require("path");
const getEmail = require("../controllers/getEmail")
const nodemailer = require("nodemailer")


router.get("/sendformemail", async (req, res)=>{
    /*
    Data-Type

    {
        recieverName,
        websiteURL,
        receiverEmail,
        data
    }
    
    */
    const body = req.body

    console.log(process.env.EMAIL_HOST)

    const content = getEmail(body.data, decodeURIComponent(body.websiteURL))

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
        },
    })
    try{

        const info = await transporter.sendMail({
            from: `"Rome Digital Delivery System" <${process.env.EMAIL_ADDRESS}>`, // sender address
            to: body.receiverEmail, // list of receivers
            subject: "New Submission From Website", // Subject line
            html: content, // html body
          });
        
        res.sendStatus(200)
    }catch(err){
        console.error(err)
        res.sendStatus(500)
    }
})


module.exports = router;