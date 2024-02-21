import UserRepository from "../repositories/user.repository";

export class UserService {
  userRepository = new UserRepository();

  findAllPosts = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const user = await this.userRepository.findAllPosts();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    user.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return user.map((Users) => {
      return {
        userId: user.postId,
        email: user.email,
        name: user.name,
        title: user.title,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    });
  };

  findPostById = async (userId) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const user = await this.userRepository.findPostById(userId);

    return {
      userId: user.userId,
      email: user.email,
      name: user.name
    };
  };

  //회원가입
  createPost = async (email, password, checkPassword, name) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createdPost = await this.postsRepository.createPost(email, password, checkPassword, name);

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      postId: createdPost.userId,
      email: createdPost.userId,
      name: createdPost.name,
      title: createdPost.title,
      content: createdPost.content,
      createdAt: createdPost.createdAt,
      updatedAt: createdPost.updatedAt
    };
  };
}

// 내 정보 조회 api
router.get("/me", authMiddleware, (req, res) => {
  const user = req.body;
  return res.json({
    email: user.email,
    name: user.name,
    message: "회원 조회가 확인되었습니다."
  });
});
