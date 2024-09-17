import { Request,Response } from "express"
import { MpoxModel } from "../../data/models/mpox.model";
import { EmailService } from "../../domain/service/email.service";
export class MpoxController{
    
    public getMpoxCases = async (req:Request,res:Response)=>{
        try {
            const mpoxCases = await MpoxModel.find();
            res.json(mpoxCases);
        } catch (error) {
            
        }
    }

    public createMpoxCase = async (req:Request,res:Response)=>{

        try {
                const { lat, lng, genre, age, creationDate } = req.body;
                console.log(req.body)
                const newMpoxCase = await MpoxModel.create({
                    
                    lat,
                    lng,
                    genre,
                    age,
                    creationDate


                });
                
                return res.json(newMpoxCase)
            } catch (error) {
                
            }
    }

    public getMpoxCaseById = async (req:Request,res:Response)=>{
        const { id } = req.params;
        try {
            const mpoxCase = await MpoxModel.findById(id);
            res.json(mpoxCase);
        } catch (error) {
            console.error(error)
        }
    }

    public updateMpoxCase = async (req:Request,res:Response)=>{
        const { id } = req.params;
        const { lat, lng, genre, age, creationDate } = req.body;
        try {
            const mpoxCase = await MpoxModel.findByIdAndUpdate(id,{ 
                lat,
                lng,
                genre,
                age,
                creationDate
            });
            res.json(mpoxCase);
        } catch (error) {
            console.error(error)
        }
    }

    public deleteMpoxCase = async (req:Request,res:Response)=>{
        const { id } = req.params;
        try {
            await MpoxModel.findByIdAndDelete(id);
            res.json({message: "Registro borrado"});
        } catch (error) {
            console.error(error)
        }
    }
}
