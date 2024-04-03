import express from "express";
import cors from "cors";
import {ShiftRouter} from "./routes/shift";

const port = 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use(ShiftRouter);


app.listen(port, ()=> console.log(`server started on ${port}`))
