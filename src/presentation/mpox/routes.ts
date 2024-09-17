import { Router,Request,Response } from "express";
import { MpoxController } from "./controller";

export class MpoxRoutes{
    static get routes() : Router{
        const router = Router();
        const mpoxController = new MpoxController()
        router.get("/",mpoxController.getMpoxCases)
        router.post("/",mpoxController.createMpoxCase)
        router.get("/:id",mpoxController.getMpoxCaseById)
        router.put("/:id",mpoxController.updateMpoxCase)
        router.delete("/:id",mpoxController.deleteMpoxCase)
        return router;
    }
}