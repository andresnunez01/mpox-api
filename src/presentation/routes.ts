import { Router } from "express";
import { MpoxRoutes } from "./mpox/routes";


export class AppRoutes{
    static get routes() : Router{
        const router = Router();
        router.use("/api/mpox",MpoxRoutes.routes);
        return router;
    };
};