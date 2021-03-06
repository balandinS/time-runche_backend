import express from "express";
import watchController from "../controllers/watch.controller"
import multer from 'multer'
import jwt from 'jsonwebtoken';
import controller from "../controllers/watch.controller";


const nodemailer = require('nodemailer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../images/')
    },
    filename: function (req, file, cb) {
        cb(null, //new Date().toISOString()
            file.originalname);
    }
})
const upload = multer({ storage: storage })



router.get('/addwatch', controller.extractToken, (req, res) => {
    console.log('the res status is ' + res.statusCode)

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            //console.log('Unauthorized')
            res.render('../views/login');
        }
        else {
            //console.log(authData)
            res.render('../views/addwatch');
        }
    })

})




router.get('/login', (req, res) => {
    res.render('../views/login.html')
})

router.post('/login', (req, res) => {
    watchController.login(req, res, (res) => {
        if (res.statusCode === 300) {
            res.render('../views/login.html')
        }
        else if (res.statusCode === 200) {
            res.render('../views/addwatch.html');
        }
    });
})


router.post('/addwatch', upload.single('imgUpload'), (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    watchController.saveWatch(req, res, req.file);
    res.render('../views/addwatch.html')
})

//pointer to async function. In case of rendering,
//you have to add a path to the controller function (getAll)
router.get('/watches', (req, res) => {
    watchController.getAll()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => console.log('500: error server :(( '))
});

router.get('/watches/:brand', (req, res) => {
    //console.log(req.params.brand)
    watchController.getBrand(req, res)
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => res.send(err))
})

router.get('/watches/special/accessories', (req, res) => {
    watchController.getAccessories()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => res.send(err))
})
router.get('/watches/special/secondhand', (req, res) => {
    watchController.getAccessories()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => res.send(err))
})

router.post('/send', (req, res) => {
    console.log(req.body)
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'seregey.balandin@gmail.com', // generated ethereal user
            pass: '054211hjk' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"sergey balandin" <seregey.balandin@gmail.com>', // sender address
        to: 'time.runche1234@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

router.get('/search', (req, res)=>{
    res.render('../views/search.html');
})

export default router;