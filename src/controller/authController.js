import bcrypt from "bcrypt";
import db from "../config/db.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const joinUser = async (req, res) => {
  const { userId, userPassword, userName } = req.body;
  // userId 중복 확인 (db에서 찾아서) //CRUD R
  const QUERY1 = `SELECT user_no FROM users WHERE user_id=?`;
  const existUser = await db.execute(QUERY1, [userId]).then((result) => result[0][0]);

  if (existUser) {
    return res.status(400).json({ status: "fail", message: "중복된 아이디 입니다." });
  }
  // 비밀번호 암호화
  const encryptPassword = await bcrypt.hash(userPassword, 8);
  // DB에 데이터를 넣음 =>users 테이블
  // 저장
  const QUERY2 = `INSERT INTO users (user_id,user_password,user_name) VALUES (?,?,?)`;
  await db.execute(QUERY2, [userId, encryptPassword, userName]);

  res.status(201).json({ status: "success", message: "회원가입 완료" });
};

export const loginUser = async (req, res) => {
  const { userId, userPassword } = req.body;
  // id에 맞는 사용자 찾기 => 없으면 에러
  const QUERY = `SELECT * FROM users WHERE user_id=?`;
  const user = await db.execute(QUERY, [userId]).then((result) => result[0][0]);

  if (!user) {
    return res.status(400).json({ status: "fail", message: "아이디와 비밀번호를 확인해주세요." });
  }

  // 비밀번호 맞는지 찾기
  const isPasswordCorret = await bcrypt.compare(userPassword, user.user_password);
  if (!isPasswordCorret) {
    return res.status(400).json({ status: "fail", message: "아이디와 비밀번호를 확인해주세요." });
  }
  // 회원 인증키 발급키 (session, jwt)
  // user.user_no
  console.log("성공");
  // 1번 데이터, 2번 시크릿, 3번 옵션(만료일)
  const accessToken = jwt.sign({ no: user.user_no }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
  console.log(accessToken);
  res.status(200).json({ status: "success", message: "로그인 성공", data: { accessToken } });
};
