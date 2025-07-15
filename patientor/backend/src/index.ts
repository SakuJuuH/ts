import express from "express";
import { Request, Response } from "express";
import { APIPatient, Diagnosis } from "./types";
import patientsService from "./services/patientsService";
import diagnosisService from "./services/diagnosisService";
import { v1 as uuid } from "uuid";
const cors = require("cors");
const app = express();
const id = uuid();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req: Request, res: Response) => {
    res.send("pong");
});

app.get("/api/diagnoses", (_req: Request, res: Response) => {
    const diagnoses: Diagnosis[] = diagnosisService.getAllDiagnoses();
    res.json(diagnoses);
});

app.get("/api/patients", (_req: Request, res: Response) => {
    const patients = patientsService.getAllPatients();
    const publicPatients: APIPatient[] = patients.map((patient) => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation
    }));
    res.json(publicPatients);
});

app.post("/api/patients", (_req: Request, res: Response) => {
    res.status(501).send({ error: "Not implemented" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});