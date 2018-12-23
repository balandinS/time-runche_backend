
import WatchModel from '../models/watch.model';

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
controller.saveWatch = async (req, res)=>{
    try {
        let watchToSave = {
            brand: req.brand, 
            year: req. year,
            condition: req.condition,
            accessories: req.accessories,
            model:{
                nameModel: req.modelName,
                condition: req.condition,
                scopeDelivery: null,
                price: req.price,
            
                description:null,
                gender: req.gender,
                movement:null,
                caseMaterail: req.case_material,
                braceletMaterail: req.bracelet_material,
                caseDiameter: {
                    mm: req.case_width,
                    mm1: req.case_height
                }
    
            }
        }
    }
    catch (err){
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