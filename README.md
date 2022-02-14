# 🌳 Forestia-Back

**Next.js** 학습을 목적으로 제작하게 된 게시판 사이트 **Forestia**의 백엔드 단입니다. <br>
프로젝트에 대한 자세한 설명은 <a href="https://github.com/uncyclocity/Forestia">프론트엔드단 레포</a>를 참고해주시기 바랍니다.

<img src="./assets/logo.png" width="500px"></img>

## 💻 사용 기술

<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon S3-569A31?style=flat-square&logo=amazons3&logoColor=white"/> <img src="https://img.shields.io/badge/Oracle Cloud-F80000?style=flat-square&logo=oracle&logoColor=white"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/> <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white"/>

## 📜 간략한 설명

- 간단한 게시판 사이트의 백엔드 단입니다.
- Google OAuth 2.0을 통해 프론트에서 로그인 시, **JWT 액세스 토큰 및 리프레시 토큰**이 백엔드를 통해 발급됩니다.
- 게시글 및 댓글의 작성/수정/삭제 및 이미지 업로드/삭제, 그리고 회원 관련 기능이 구현되어 있습니다.
- **MongoDB Atlas**를 DB로 사용하였습니다.
- 게시글에 첨부되는 이미지의 저장소로 **Amazon S3**를 사용하였습니다.
- 강원도 춘천 리젼의 **Oracle Cloud**에 배포되어 있습니다.

## 🕓 향후 계획

- RESTful API 지향적으로 수정
- 그 외에도 꾸준히 개선 사항을 모색중입니다🤔
