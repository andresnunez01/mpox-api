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
                const emailService = new EmailService();
                await emailService.sendEmail({
                    to: "andres.nunez01@outlook.com",
                    subject: creationDate,
                    htmlBody: `<h1>${"Genero del infectado: " + genre + "\nEdad del infectado:" + age + "\nUbicación del caso: \n\tlng: " + lng + "\n\tlat: " + lat}</h1>`
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


    public getMpoxCasesFromLast7Days = async (req: Request, res: Response) => {
        try {
            // Obtener la fecha actual
            const currentDate = new Date();
            // Obtener la fecha de hace 7 días
            const last7DaysDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

            // Buscar casos dentro de los últimos 7 días
            const mpoxCases = await MpoxModel.find({
                creationDate: {
                    $gte: last7DaysDate,  // Mayor o igual que la fecha de hace 7 días
                    $lte: currentDate     // Menor o igual que la fecha actual
                }
            });

            res.json(mpoxCases);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener los casos de los últimos 7 días" });
        }
    };

}
