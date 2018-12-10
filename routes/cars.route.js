import express from "express";
import watchController from "../controllers/watch.controller"
const nodemailer = require('nodemailer');
const router = express.Router()

router.get('/', (req, res)=>{
    console.log('index');
})

//pointer to async function. In case of rendering,
//you have to add a path to the controller function (getAll)
router.get('/watches', (req,res) => {
 watchController.getAll()
 .then(doc => { 
     res.status(200).json(doc)
    })
 .catch(err => console.log('500: error server :(( '))
});

router.get('/watches/:brand', (req,res) => {
    console.log(req.params.brand)
    watchController.getBrand(req, res)
    .then(doc => {
       res.status(200).json(doc)
       console.log(doc)
     })
    .catch(err => res.send(err))
})
router.get('/send', (req, res) => {
    const outputData = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        port: 25,
        auth: {
            user: 'time.runche1234@gmail.com',
            pass: 'test1test'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let HelperOptions = {
        from: 'seregey.balandin@gmail.com',
        to: 'time.runche1234@gmail.com',
        subject: 'Majeni Contact Request',
        text: 'Hello',
        html: outputData
    };



    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("The message was sent!");
        console.log(info);
    });

});


export default router;