import "dotenv/config";
import express from "express";
import { coursePage, introducePage, mainPage } from "./controller/webController.js";
import db from "./config/db.js";
import { getCourseList } from "./controller/courseController.js";

const app = express();
const PORT = 8000;

// 템플릿 엔진 사용 셋팅
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/client/html");
// 정적 파일 내보내기 (미들웨어)
app.use("/css", express.static("src/client/css"));
app.use("/js", express.static("src/client/js"));
app.use("/file", express.static("src/client/file"));

// JSON 형식 변환 미들웨어
app.use(express.json());

const middleware = (req, res, next) => {
  // blacklist
  const ok = req.query.ok;
  console.log(ok);
  if (ok === "true") {
    next();
  } else {
    res.send("잘못된 주소입니다.");
  }
};

// web 라우터
app.get("/", mainPage);
app.get("/introduce", introducePage);
app.get("/course", coursePage);
// api 라우터
app.get("/api/course", getCourseList);

// app.post("/test", async (req, res) => {
//   const data = req.body;
//   const QUERY = `
//   INSERT INTO course
//   (course_name,course_latitude,course_longitude,course_qr)
//   VALUES (?,?,?,?)`;
//   await db.execute(QUERY, [data.name, data.latitude, data.longitude, data.qr]);
//   console.log(data);
//   // db 쿼리
//   res.send("하잉");
// });

//localhost:8000/test?name=jihye
app.get("/test", middleware, (req, res) => {
  const data = req.query;
  console.log(data);
  res.send("abc");
});

// app.use((req, res, next) => {
//   console.log("통과합니다");
//   next();
// });

app.get("/", middleware, (req, res) => {
  res.render("main");
});

// 서버 오픈
app.listen(PORT, () => {
  console.info(`서버가 열림 http://localhost:${PORT}`);
});
