// src/routes/users.router.js

import express from "express";
import { prisma } from "../models/index.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth.middleware.js";
import bcrypt from "bcrypt";

const router = express.Router();

/** 사용자 회원가입 API **/
router.post("/sign-up", async (req, res, next) => {
  const { email, password, checkPassword, name } = req.body;
  const isExistUser = await prisma.users.findFirst({
    where: {
      email
    }
  });
  if (password.length < 6) {
    return res.status(409).json({ message: "비밀번호 6자리 이상치세용ㅇ" });
  }
  if (password != checkPassword) {
    return res.status(409).json({ message: "비밀번호 틀렸어용ㅇ" });
  }
  if (isExistUser) {
    return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
  }

  // Users 테이블에 사용자를 추가합니다.
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: { email, password: hashedPassword, checkPassword: hashedPassword, name }
  });

  return res.status(201).json({ message: "회원가입이 완료되었습니다." });
});

// process.env.pood
//로그인 api
router.post("/sign-in", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.users.findFirst({ where: { email } });

  if (!user) return res.status(401).json({ message: "존재하지 않는 이메일입니다." });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });

  const Atoken = jwt.sign({ userId: user.userId }, process.env.JWT_KEY, { expiresIn: "12h" });
  // jwt 마라탕, 만두피, 유저id ,시크릿 키, 유효시간 지정

  const RRtoken = jwt.sign({ userId: user.userId }, process.env.RRR_KEY, { expiresIn: "7d" });
  //리프레쉬ㅣ토큰 생성

  res.cookie("authorization", `Bearer ${Atoken}`);
  //엑세스 토큰 생성 반환
  res.cookie("refreshToken", `Bearer ${RRtoken}`);
  //리프레쉬 토큰 생성 반환
  return res.status(200).json({ message: "로그인에 성공하였습니다." });
});


// 내 정보 조회 api
router.get('/me', authMiddleware, (req, res) => {
  const user = req.body;
  return res.json({
      email: user.email,
      name: user.name,
      message: '회원 조회가 확인되었습니다.'
  })
})

export default router;
