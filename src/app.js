import express from 'express';
// env환경변수 라이브러리
import 'dotenv/config';
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { apiRouter } from "./routes/index.js";

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log(`Server is listening on ${port}`);
});

// 기본 경로 처리
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.use(errorHandler);

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});