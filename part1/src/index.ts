
import express from 'express';
import { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();
const port = 4000;

app.get('/hello', (_: Request, res: Response) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!height || !weight) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    const bmi = calculateBmi(height, weight);

    return res.send({
        weight,
        height,
        bmi,
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
