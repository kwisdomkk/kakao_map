import db from "../config/db.js";

export const getCourseList = async (req, res) => {
  // request 데이터 x ,비즈니스 로직(service)->repository
  // 코스 리스트를 가져와서 전달(DB에서,저장소에서,파일에서,JSON파일)

  const QUERY = `SELECT c.* FROM course c`;
  const result = await db.execute(QUERY).then((result) => result[0]);
  // console.log(result);
  res.status(200).json({
    status: "success",
    message: "코스 데이터 리스트 전송 완료",
    data: result,
  });
};
