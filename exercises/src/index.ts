
import express from 'express';
import { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
const app = express();
const port = 4000;

app.use(express.json()); // Middleware to parse JSON bodies

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

app.post('/exercises', (req: Request, res: Response) => {

    console.log(req.body);

    const daily_exercises: number[] = req.body.daily_exercises;
    const target: number = req.body.target;

    if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    const result = calculateExercise(daily_exercises, target);
    return res.send(result);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
