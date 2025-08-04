const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
const app = express()


app.use(express.json())
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: ["https://bulkmail-3v2w.onrender.com", "http://localhost:5173"]
}));
mongoose.connect("mongodb+srv://rajeshmusic3:Rajesh12345@cluster0.wnbkkbp.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Database Connected...");

}).catch(() => {
    console.log("Connection Failed...!");
})

const credential = mongoose.model("credential", {}, "bulkmail")




app.post("/sendmail", (req, res) => {

    const msg = req.body.msg
    const email = req.body.email

    credential.find().then((data) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:data[0].toJSON().user,
            pass: data[0].toJSON().pass,
        }
    })

    
    new Promise(async (resolve, reject) => {

        try {
            for (var i = 0; i < email.length; i++) {

                await transporter.sendMail({
                    from: "Rajeshbscit092@gmail.com",
                    to: email[i],
                    subject: "BulkMail",
                    text: msg,
                }
                )
                console.log("Email sent to :"+email[i]);
                
            }
            resolve("success")

        }
        catch {
            reject("failed")
        }
    }).then(() => {
        res.send(true)
    }).catch(() => {
        console.log("Error while sending email");
        res.send(false)
    })


}).catch((error)=>{
    console.log(error);
    
})



})



app.listen(PORT, () => {
    console.log("Server Started....");

})