import Express from "express";
import { UserService } from "../services/user.service";

// 사용자 회원가입
// 로그인
// 내 정보 조회

// Post의 컨트롤러(Controller)역할을 하는 클래스
export class UserController {
  userService = new UserService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getPosts = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 findAllPosts 로직을 실행합니다.
      const users = await this.userService.findAllPosts();

      return res.status(200).json({ data: users });
    } catch (err) {
      next(err);
    }
  };

  getPostById = async (req, res, next) => {
    try {
      const { userId } = req.params;

      // 서비스 계층에 구현된 findPostById 로직을 실행합니다.
      const user = await this.userService.findPostById(userId);

      return res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  };
}
