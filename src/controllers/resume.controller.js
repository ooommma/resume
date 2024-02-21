import { ResumeService } from "../services/resume.service.js";

// Post의 컨트롤러(Controller)역할을 하는 클래스
export class ResumeController {
  resumeService = new ResumeService(); // resume 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  // 이력서 조회
  getPosts = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 findAllPosts 로직을 실행합니다.
      const resume = await this.resumeService.findAllPosts();

      return res.status(200).json({ data: resume });
    } catch (err) {
      next(err);
    }
  };

  //이력서 상세 조회
  getPostById = async (req, res, next) => {
    try {
      const { resumeId } = req.params;

      // 서비스 계층에 구현된 findPostById 로직을 실행합니다.
      const resume = await this.resumeService.findPostById(resumeId);

      return res.status(200).json({ data: resume });
    } catch (err) {
      next(err);
    }
  };

  //이력서 생성
  createPost = async (req, res, next) => {
    try {
      const { title, content, status = "APPLY" } = req.body;

      // 서비스 계층에 구현된 createPost 로직을 실행합니다.
      const createdResume = await this.resumeService.createPost(title, content, (status = "APPLY"));

      return res.status(201).json({ data: createdResume });
    } catch (err) {
      next(err);
    }
  };

  //이력서 수정/업데이트
  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { password, title, content } = req.body;

      // 서비스 계층에 구현된 updatePost 로직을 실행합니다.
      const updatedPost = await this.postsService.updatePost(postId, password, title, content);

      return res.status(200).json({ data: updatedPost });
    } catch (err) {
      next(err);
    }
  };

  // 이력서 삭제
  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { password } = req.body;

      // 서비스 계층에 구현된 deletePost 로직을 실행합니다.
      const deletedPost = await this.postsService.deletePost(postId, password);

      return res.status(200).json({ data: deletedPost });
    } catch (err) {
      next(err);
    }
  };
}
