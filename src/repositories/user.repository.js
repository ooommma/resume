import { Prisma } from "@prisma/client";
import { prisma } from "../";

// src/repositories/user.repository.js

export class UserRepository {
  // 유저 조회
  findAllPosts = async () => {
    // ORM인 Prisma에서 Posts 모델의 findMany 메서드를 사용해 데이터를 요청합니다.
    const user = await prisma.posts.findMany();

    return user;
  };

  // 상세 조회
  findPostById = async (userId) => {
    // ORM인 Prisma에서 Posts 모델의 findUnique 메서드를 사용해 데이터를 요청합니다.
    const user = await prisma.posts.findUnique({
      where: { userId: +userId }
    });

    return user;
  };

  // 회원가입
  createPost = async (email, password, checkPassword, name) => {
    // ORM인 Prisma에서 Posts 모델의 create 메서드를 사용해 데이터를 요청합니다.
    const createdPost = await prisma.posts.create({
      data: {
        email,
        password,
        checkPassword,
        name
      }
    });

    return createdPost;
  };
}
