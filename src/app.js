import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.SERVER_PORT;

app.get('/', (req, res) => {
    res.json('hello');
})

app.listen(3000, () => {
    console.log(`Server is listening on ${port}`);
});