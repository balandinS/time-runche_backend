import WatchModel from '../models/watch.model';
import { fileURLToPath } from 'url';

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


controller.addCar = async (req, res) => {
    let carToAdd = Car({
        name: req.body.name
    });
    try {
        const savedCar = await Car.addCar(carToAdd);
        res.send('added: ' + savedCar);
    }
    catch (err) {
        res.send('Got error in getAll');
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