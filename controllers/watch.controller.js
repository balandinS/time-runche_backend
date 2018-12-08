
import WatchModel from '../models/watch.model';

const controller = {};

controller.getAll = async (req, res) => {
    try {
        const watch = await WatchModel.getAll();
        //in case of rendering page with arguments
         
    }
    catch(err) {
        res.send('Got error in getAll');
    }
}

controller.getBrand = async (req, res) => {
    try {
        
        const watch = await WatchModel.getBrand(req.query.brand);

        //in case of rendering page with arguments
        //res.render('/watches/:brand', {data: data});
    }
    catch(err) {
        res.send('Got error in getAll');
    }
}
export default controller;