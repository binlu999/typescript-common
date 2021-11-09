import express, {Request,Response,NextFunction} from 'express';
import { json } from 'body-parser';

import todosRoutes from './routes/todos'

const app = express();
app.use(json());

app.use('/todo',todosRoutes);

app.use((err:Error, req:Request,res:Response,next:NextFunction)=>{
    res.status(500).json({status:"ERROR", message:err.message,});
});


app.listen(3000);