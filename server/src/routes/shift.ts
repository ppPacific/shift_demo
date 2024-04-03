import {Router,Request, Response} from "express";
import data from '../../data/shifts.json';
import {ShiftErrors} from "../errors";
const router = Router();

router.get('/hello',(req:Request, res:Response) => {

    try {
        res.json({message:'CONNECTED!'})

    } catch (err) {
        res.status(404).json({message:'NOT FOUND'})
    }
} )

router.get('/shifts',(req:Request, res:Response) =>{
    try {
        res.json(data.shifts);

    } catch (err) {
        res.status(404).json({type: ShiftErrors.NO_SHIFT_FOUND})
    }
})


export {router as ShiftRouter};
