import express from "express";
import watchController from "../controllers/watch.controller"
import WatchModel from "../models/watch.model";
const router = express.Router()

router.get('/', (req, res)=>{
    console.log('index');
})

//pointer to async function. In case of rendering,
//you have to add a path to the controller function (getAll)
router.get('/watches', watchController.getAll);



export default router;