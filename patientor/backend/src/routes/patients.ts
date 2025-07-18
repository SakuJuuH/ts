import { Request, Response, Router } from "express";
import { toNewPatient } from "../mappers/patients";
import patientsService from "../services/patientsService";
import { NewPatient } from "../types";

const patientsRouter = Router();

patientsRouter.get("/", (_req: Request, res: Response) => {
    const patients = patientsService.getAllPatients();
    res.json(patients);
});

patientsRouter.post("/", (req: Request<unknown, unknown, NewPatient>, res: Response) => {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    return res.json(addedPatient);
});

patientsRouter.get("/:id", (req: Request, res: Response) => {
    const patient = patientsService.getPatientById(req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).send("Patient not found");
    }
});

export default patientsRouter;