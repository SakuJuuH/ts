import express from "express";
import { Request, Response } from "express";
import diagnosisService from "./services/diagnosisService";
import { Diagnosis } from "./types";
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req: Request, res: Response) => {
    console.log("ping");
    res.send("pong");
});

app.get("/api/diagnoses", (_req: Request, res: Response) => {
    const diagnoses: Diagnosis[] = diagnosisService.getAllDiagnoses();
    res.json(diagnoses); 
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});