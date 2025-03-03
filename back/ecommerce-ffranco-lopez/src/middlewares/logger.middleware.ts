import { NextFunction, Request, Response } from "express";

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
    const now = new Date().toISOString(); // Obtenemos la fecha y hora actual en formato ISO
    console.log( `[${now}] Estás ejecutando un método: ${req.method}, en la ruta: ${req.url}` ),
        
    next();
}