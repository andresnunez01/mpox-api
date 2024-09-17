import cron from 'node-cron';
import { MpoxModel } from '../../data/models/mpox.model';
import { EmailService } from '../service/email.service';
import { MpoxDataSource } from '../datasources/mpoxCases.datasource';
import { generateMpoxEmailTemplate } from '../templates/email.template';


export const emailJob = () => {
    const emailService= new EmailService();
    const mpoxDataSourceDataSource = new MpoxDataSource();
    cron.schedule('*/10 * * * * *',async()=>{
        console.log("cada 10 segundos")
        try{
            const mpoxCases = await MpoxModel.find({isSent : false});
            if(!mpoxCases.length){
                console.log("No hay infectados pendientes de enviar");
                return
            }

            console.log(`Procesando ${mpoxCases.length} incidentes.`);
            await Promise.all(

                mpoxCases.map(async (mpoxCase)=>{
                    const htmlBody = generateMpoxEmailTemplate(
                        mpoxCase.creationDate,
                        mpoxCase.lat,
                        mpoxCase.lng,
                        mpoxCase.age,
                        mpoxCase.genre
                        
                    );
                    
                    await emailService.sendEmail({
                        to: "andres.nunez01@outlook.com",
                        subject: `Fecha de registro del infectado: ${mpoxCase.creationDate}`,
                        htmlBody:htmlBody
                    });
                    console.log(`Email enviado para el incidente con ID: ${mpoxCase._id}`);
                    await mpoxDataSourceDataSource.updateMpoxCase(mpoxCase._id.toString(),{...mpoxCase, isSent:true});
                    //await IncidentModel.findByIdAndUpdate(incident._id,{...incident, isEmailSent:true});
                    console.log(`Incidente actualizado para el ID: ${mpoxCase._id}`);
                })
            );

        }catch(error){
            console.log("Error durante el trabajo de envio de correos")
        }

    });
}