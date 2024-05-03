import db from "../config/db.js";

export const getCourseList = async (req, res) => {
  // request 데이터 x ,비즈니스 로직(service)->repository
  // 코스 리스트를 가져와서 전달(DB에서,저장소에서,파일에서,JSON파일)
  console.log(req.user);
  const no = req.user ? req.user.user_no : null;
  const QUERY = `SELECT c.*,uc.user_courses_no FROM course c LEFT JOIN users_course uc
  ON c.course_no=uc.course_no AND uc.user_no=?`;
  const result = await db.execute(QUERY, [no]).then((result) => result[0]);
  console.log(result);
  res.status(200).json({
    status: "success",
    message: "코스 데이터 리스트 전송 완료",
    data: result,
  });
};

export const qrCheck = async (req, res) => {
  const user = req.user;
  const { qrCode } = req.body;
  //qr 번호 찾기
  const QUERY1 = `SELECT course_no FROM course WHERE course_qr=?`;
  const qrCourseNo = await db.execute(QUERY1, [qrCode]).then((result) => result[0][0]);

  if (!qrCourseNo) {
    return res.status(404).json({ status: "fail", message: "잘못된 QR코드입니다." });
  }

  // 방문 여부
  const QUERY2 = `SELECT * FROM users_course WHERE user_no =? AND course_no=?`;
  const ucId = await db.execute(QUERY2, [user.user_no, qrCourseNo.course_no]).then((result) => result[0][0]);

  if (ucId) {
    return res.status(400).json({ status: "fail", message: "이미 방문한 코스입니다." });
  }

  // QR COURSE ID, USER ID=>UC(INSERT)
  const QUERY3 = `INSERT INTO users_course(user_no,course_no) VALUES(?,?)`;
  await db.execute(QUERY3, [user.user_no, qrCourseNo.course_no]);

  return res.status(201).json({ status: "success", message: "방문 완료" });
};
