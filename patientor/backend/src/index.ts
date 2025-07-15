import express from "express";
import { Request, Response } from "express";
import diagnosisRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req: Request, res: Response) => {
    res.send("pong");
});

app.use("/api/diagnoses", diagnosisRouter);

app.use("/api/patients", patientsRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});