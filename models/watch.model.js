import mongoose from 'mongoose';

const WatchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    brand: { type: String, required: true },

    model: {
        nameModel:{type: String, required: true} ,
        referenceNumber: {type: Number, required: true} ,
        condition: {type: String, required: true} ,
        scopeOfDelivery: {type: String, required: true} ,
        price: {type: Number, required: true} ,
        allowPrice: {type: Boolean, required: true} ,
        description: {type: String, required: true} ,
        gender: {type: String, required: true} ,
        movement: {type: String, required: true} ,
        caseMaterail: {type: String, required: true} ,
        braceletMaterail: {type: String, required: true} ,
        caseSize: {
            width: {type: Number, required: true} ,
            height: {type: Number, required: true} ,
        },
    }
});

let WatchModel = mongoose.model('Watch', WatchSchema);
//getallWatches
WatchModel.getAll = () => {
    return WatcheModel.find();
}
//find watch with brand in data base
WatchModel.getBrand = (param) => {
    return WatcheModel.find({ brand: param });
}

export default WatchModel;