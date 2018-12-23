import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from 'morgan'
import config from './core/config/config.dev'
import router from './routes/cars.route'
import connectToDb from './db/connect'
import path from 'path' 
const port = config.serverPort;
connectToDb();

const app = express();

//Parsing the body of the POST method. 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//using static pages
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use('/', router);
//'/views' is the folder for static .html pages
app.use(express.static(path.join(__dirname, './views')));

app.use(cors());
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap




app.listen(port, () => {
    console.log('server started - ', port);
});