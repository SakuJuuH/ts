import { Request, Response, Router } from "express";
import { toAPIPatient } from "../mappers/patients";
import { toNewPatient } from "../mappers/patients";
import patientsService from "../services/patientsService";

const patientsRouter = Router();

patientsRouter.get("/", (_req: Request, res: Response) => {
    const patients = patientsService.getAllPatients();
    const publicPatients = patients.map(toAPIPatient);
    res.json(publicPatients);
});

patientsRouter.post("/", (req: Request, res: Response) => {
    try {
        const newPatient = toNewPatient(req.body);
        if (!newPatient) {
            return res.status(400).send({ error: "Invalid patient data" });
        }
        const addedPatient = patientsService.addPatient(newPatient);
        return res.json(toAPIPatient(addedPatient));
    } catch (error) {
        return res.status(400).send({ error: error instanceof Error ? error.message : "Unknown error" });
    }
});

export default patientsRouter;