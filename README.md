## 📌 프로젝트 구조

### Server

- `bin`: 서버 실행 파일
- `controllers`: 프로젝트의 요청 로직을 처리하는 함수
- `database`: MongoDB에 연결을 설정하는 파일
- `models`: 컨트롤러와 데이터베이스 사이에서 데이터의 유효성을 검사하는 함수 (스키마 정의)
- `public`: 정적인 CSS, JavaScript, 이미지 파일
- `routes`: HTTP 메서드를 사용한 앱 경로 지정 핸들러 파일
- `utils`: 프로젝트에서 재사용할 수 있는 함수
- `app.js`: 해당 프로젝트 루트 파일

```
🗂️testy95-server
 ┣ 📂bin
 ┃ ┗ www
 ┣ 📂controller
 ┃ ┣ blocks.js
 ┃ ┗ render.js
 ┣ 📂database
 ┃ ┗ connection.js
 ┣ 📂models
 ┃ ┣ InputBlocks.js
 ┃ ┗ MethodBlocks.js
 ┣ 📂routes
 ┃ ┗ index.js
 ┣ 📂utils
 ┃ ┣ assembleTestCodes.js
 ┃ ┣ convertBlocks.js
 ┃ ┗ convertLanguages.js
 ┣ app.js
 ┣ package.json
 ┣ package-lock.json
 ┗ README.md
```
