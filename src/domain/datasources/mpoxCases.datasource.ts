import { MpoxModel } from "../../data/models/mpox.model";
import { MMpox, MMpoxDocument } from "../entities/mpoxCases.entity";


export class MpoxDataSource {
    public updateMpoxCase = async (id:string, mpoxCase: Partial<MMpoxDocument>)=>{
        console.log("llego aquí")
        await MpoxModel.findByIdAndUpdate(id,{
            creationDate: mpoxCase.creationDate,
            lng: mpoxCase.lng,
            lat: mpoxCase.lat,
            genre: mpoxCase.genre,
            age: mpoxCase.age,
            isSent: mpoxCase.isSent
        })
    }
}