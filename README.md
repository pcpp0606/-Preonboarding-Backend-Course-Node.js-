# -Preonboarding-Backend-Course-Node.js-
[한 달 인턴]Preonboarding Backend Course(Node.js)

.env 생성
.env_sample 생성
.gitignore 생성
 - gitignore.io에서 [VisualStudioCode, Windows, Node, dotenv] 키워드로 생성 후 복사, 붙여넣기
 .prettierrc 생성

npm init -y 입력
package.json 가장 하단에 
"type": "moudle",
"scripts": {
"start": "node index.js",
"dev": "nodemon src/index.js"
}
추가

npm add express dotenv // 배포에서도 사용

npm add -D prettier nodemon // 개발할때만 사용

npm add prisma

.env에 DB 내용 추가
DATABASE_URL=mysql://{ID}:{PW}@{주소}:{포트번호}/{DB테이블}

npm add bcrypt
npm add jsonwebtoken
npm add joi

npm add --save swagger-jsdoc swagger-ui-express

http://localhost:3000/api로 접속할 것.