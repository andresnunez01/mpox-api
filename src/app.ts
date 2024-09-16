import express,{Request,Response} from 'express'

const app = express()

app.get("/",(req:Request,res:Response)=>{
    res.send("Hola a todos")
})

app.listen(3000,()=>{
    console.log("Server running on PORT 3000")
})