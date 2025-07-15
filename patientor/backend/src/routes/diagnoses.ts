import { Request, Response, Router } from "express";
import diagnosisService from "../services/diagnosisService";
import { Diagnosis } from "../types";

const diagnosisRouter = Router();

diagnosisRouter.get("/", (_req: Request, res: Response) => {
    const diagnoses: Diagnosis[] = diagnosisService.getAllDiagnoses();
    res.json(diagnoses);
});

export default diagnosisRouter;