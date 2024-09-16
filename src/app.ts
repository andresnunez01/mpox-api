import express,{Request,Response} from 'express'
import { envs } from './config/envs'
import { MongoDatabase } from './data/init';
import { MpoxModel } from './data/models/mpox.model';

console.log(envs.PORT)

const app = express();


app.use(express.json());


(async () => 
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL, 
        dbName: envs.MONGO_DB
    }))
();

app.get("/",(req:Request,res:Response)=>{
    res.send("Hola a todos")
})





app.post("/", async (req:Request,res:Response)=>{
try {
console.log("first")
    const { lat, lng, genre, age } = req.body;
    console.log(req.body)
    const newMpox = await MpoxModel.create({
        lat,
        lng,
        genre,
        age
    });
    return res.send(newMpox)
} catch (error) {
    
}
})





app.listen(envs.PORT,()=>{
    console.log("Server running on PORT 3000")
})