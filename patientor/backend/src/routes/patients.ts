import { Request, Response, Router } from "express";
import { toAPIPatient } from "../mappers/patients";
import { toNewPatient } from "../mappers/patients";
import patientsService from "../services/patientsService";
import { NewPatient } from "../types";

const patientsRouter = Router();

patientsRouter.get("/", (_req: Request, res: Response) => {
    const patients = patientsService.getAllPatients();
    const publicPatients = patients.map(toAPIPatient);
    res.json(publicPatients);
});

patientsRouter.post("/", (req: Request<unknown, unknown, NewPatient>, res: Response) => {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    return res.json(toAPIPatient(addedPatient));
});

export default patientsRouter;