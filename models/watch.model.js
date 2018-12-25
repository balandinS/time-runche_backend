import mongoose from 'mongoose';

const WatchSchema = mongoose.Schema({
   // _id: mongoose.Schema.Types.ObjectId,
    brand: { type: String, required: true },

    model: {
        nameModel: { type: String, required: true },
        referenceNumber: { type: Number},// required: true },
        condition: { type: String, required: true },
        scopeOfDelivery: { type: String},// required: true },
        price: { type: Number, required: true },
        allowPrice: { type: Boolean},// required: true },
        description: { type: String}, //required: true },
        gender: { type: String, required: true },
        movement: { type: String}, //required: true },
        caseMaterial: { type: String, required: true },
        braceletMaterial: { type: String, required: true },
        caseSize: {
            mm: { type: Number, required: true },
            mm1: { type: Number, required: true },
        },
        watchImage: { type: String, required: true }
    }
});

let WatchModel = mongoose.model('Watch', WatchSchema);
//getallWatches
WatchModel.getAll = () => {
    return WatchModel.find({});
}
//find watch with brand in data base
WatchModel.getBrand = (param) => {
    return WatchModel.find({ brand: param });
}
WatchModel.getAccessories = () => {
    console.log("HERE")
    return WatchModel.find({ accessory: true })
}
WatchModel.watchSecondhand = () => {
    return WatchModel.find({ secondhand: true })
}

WatchModel.addWatch = (watchToAdd) => {
    //console.log('adding a new watch brand ' + watchToAdd.brand)
    return watchToAdd.save();
}


export default WatchModel;