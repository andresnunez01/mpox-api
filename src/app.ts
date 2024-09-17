import express,{Request,Response} from 'express'
import { envs } from './config/envs'
import { MongoDatabase } from './data/init';
import { MpoxModel } from './data/models/mpox.model';
import { AppRoutes } from './presentation/routes';

console.log(envs.PORT)

const app = express();


app.use(express.json());
app.use(AppRoutes.routes);

(async () => 
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL, 
        dbName: envs.MONGO_DB
    }))
();

// app.get("/",async(req:Request,res:Response)=>{
//     try {
//         const mpoxCases = await MpoxModel.find();
//         res.json(mpoxCases);
//     } catch (error) {
        
//     }
// });





// app.post("/", async (req:Request,res:Response)=>{
// try {
// console.log("first")
//     const { lat, lng, genre, age } = req.body;
//     console.log(req.body)
//     const newMpox = await MpoxModel.create({
//         lat,
//         lng,
//         genre,
//         age
//     });
//     return res.send(newMpox)
// } catch (error) {
    
// }
// })



app.listen(envs.PORT,()=>{
    console.log("Server running on PORT 3000")
})