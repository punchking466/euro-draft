# Euro Draft

팀 자동 생성(드래프트)과 팀원 관리를 위한 Next.js 앱입니다.

## 주요 기능

- 팀원 등록/수정/관리
- 랜덤 팀 생성 및 팀 구성
- 드래그 앤 드롭으로 팀원 이동
- 팀 구성 히스토리 조회
- 카카오 공유 (Kakao JavaScript SDK)

## 기술 스택

- Next.js 15 (App Router) / React 19 / TypeScript
- Tailwind CSS v4 / Radix UI
- MongoDB (Mongoose)
- dnd-kit / Zustand / Zod

## 시작하기

1) 패키지 설치

```bash
yarn install
```

2) 환경 변수 설정

`.env` 파일을 만들고 아래 값을 설정합니다.

```bash
MONGODB_URI=your_mongodb_uri
NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY=your_kakao_js_key
```

3) 개발 서버 실행

```bash
yarn dev
```

## 주요 경로

- `/register`: 팀원 등록/관리
- `/team/squad`: 팀 구성(드래프트)
- `/team/drafts`: 팀 히스토리

## 스크립트

- `yarn dev`: 개발 서버 실행
- `yarn build`: 프로덕션 빌드
- `yarn start`: 프로덕션 서버 실행
- `yarn lint`: ESLint 실행

## 디렉터리 구조 (요약)

- `src/app`: 라우팅 및 페이지
- `src/features`: 도메인별 기능 모듈
- `src/components`: 공용 UI 컴포넌트
- `src/lib`: DB/SDK/유틸

