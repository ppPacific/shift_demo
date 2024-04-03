import express from "express";
import cors from "cors";
import {ShiftRouter} from "./routes/shift";

const port = 3001;//process.env.PORT ||

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use(ShiftRouter);

//better put in env file
//mongoose.connect("mongodb+srv://eatdungmon:ecommpw@ecomm.cxodl2x.mongodb.net/ecomm?retryWrites=true&w=majority&appName=ecomm")

app.listen(port, ()=> console.log(`server started on ${port}`))
