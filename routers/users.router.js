// src/routes/users.router.js

import express from "express";
import UsersController from "../src/controllers/user.controller.js";
import { prisma } from "../models/index.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth.middleware.js";
import bcrypt from "bcrypt";

const router = express.Router();

// 사용자 회원가입
// 로그인
// 내 정보 조회

// UserController의 인스턴스를 생성합니다.
const usersController = new UsersController();

/** 유저 조회 API **/
router.get("/", usersController.getPosts);

/** 유저 상세 조회 API **/
router.get("/:userId", usersController.getPostById);

/** 회원가입 API **/
router.post("/", usersController.createPost);

export default router;
