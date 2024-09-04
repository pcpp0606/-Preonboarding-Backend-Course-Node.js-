// swagger.config.js
import swaggerJSDoc from 'swagger-jsdoc';
// env환경변수 라이브러리
import 'dotenv/config';

const url = process.env.SERVER_URL;

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Node.js API Documentation',
        version: '1.0.0',
        description: 'API documentation for your project',
    },
    servers: [
        {
            url: url, // 서버 주소
        },
    ],
};

const options = {
    swaggerDefinition,
    // Swagger에서 사용할 경로를 설정합니다. 예: routes 폴더 내의 모든 js 파일
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
