
import WatchModel from '../models/watch.model';

const controller = {};

controller.getAll = async (req, res) => {
    try {
        const watches = await WatchModel.getAll();
        return watches
    }
    catch(err) {
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
    catch(err) {
        res.send('Got error in getAll');
    }
}

controller.getAccessories = async (req, res) => {
    try{
        console.log('LOG')
         const watches = await WatchModel.getAccessories();
         //console.log(watches);
         return watches;
    }
   catch(error) { res.send('Got error in getAll');}
}

controller.getSecondhand = async (req, res) => {
    try{
         const watches = await WatchModel.getSecondhand();
         return watches;
    }
   catch(error) { res.send('Got error in getAll');}
}

export default controller;