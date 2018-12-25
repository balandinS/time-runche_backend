import WatchModel from '../models/watch.model';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
const controller = {};

controller.getAll = async (req, res) => {
    try {
        const watches = await WatchModel.getAll();
        return watches
    }
    catch (err) {
        res.send(err);
    }
}

controller.getBrand = async (req, res) => {
    try {

        const param = req.params.brand
        console.log(param);
        const watch = await WatchModel.getBrand(param);
        return watch;
    }
    catch (err) {
        res.send('Got error in getAll');
    }
}

controller.login = (req, res)=>{

    const user = {
        username: 'admin', 
        password: '1234'
    }
    jwt.sign({user: user}, 'secretkey', (err, token)=>{
        if(err) console.log(err);
        else{
            res.json({
                token: token
            })
        }
    })
}

controller.extractToken =(req, res, next)=>{
    const bearerHeader = req.headers['authorization'];
    // console.log('the bearerheader is: '+ bearerHeader);
    if(typeof bearerHeader!= 'undefined'){
            const bearer = bearerHeader.split(' ');
            const bearerToken= bearer[1];
            req.token = bearerToken;
            console.log('request token is: '+ req.token)
            next(); 
    }
    else{
        
       res.status(300);
       next();
    }
}


controller.saveWatch = async (req, res, image) => {
    let watchToAdd = new WatchModel({
        brand: req.body.brand,
        year: req.body.year,
        model: {
            nameModel: req.body.modelName,
            condition: req.body.condition,
            condition: req.body.condition,
            accessories: req.body.accessories,
            scopeDelivery: null,
            price: req.body.price,
            description: null,
            gender: req.body.gender,
            movement: null,
            caseMaterial: req.body.case_material,
            braceletMaterial: req.body.bracelet_material,
            caseSize: {
                mm: req.body.case_width,
                mm1: req.body.case_height
            },
            watchImage: image.path
        },
    })
    try {
        //console.log('adding the watch \n' + watchToAdd)
        const savedWatch= await WatchModel.addWatch(watchToAdd);
    }
    catch (err) {
        console.log(err);
    }
}

controller.getAccessories = async (req, res) => {
    try {
        console.log('LOG')
        const watches = await WatchModel.getAccessories();
        //console.log(watches);
        return watches;
    }
    catch (error) { res.send('Got error in getAll'); }
}

controller.getSecondhand = async (req, res) => {
    try {
        const watches = await WatchModel.getSecondhand();
        return watches;
    }
    catch (error) { res.send('Got error in getAll'); }
}

export default controller;