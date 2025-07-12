
import express from 'express';
import { Request, Response } from 'express';
const app = express();
const port = 4000;

app.get('/hello', (_: Request, res: Response) => {
    res.send('Hello Full Stack!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
