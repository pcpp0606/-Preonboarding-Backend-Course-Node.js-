import express from 'express';
// env환경변수 라이브러리
import 'dotenv/config';
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { apiRouter } from "./routes/index.js";
import swaggerUi from 'swagger-ui-express';  // Swagger UI import
import { swaggerSpec } from './swagger.config.js'; // Swagger 설정 파일 import

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 기본 경로 처리
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.use(errorHandler);

app.use('/api', apiRouter);
// Swagger UI 라우트 설정
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 서버 실행
app.listen(port, () => {
    console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
    console.log(`Swagger docs available at http://localhost:${port}/api`);
});