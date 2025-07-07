# Wee-Up

Wee-Up은 팀 및 개인 업무 관리를 위한 애플리케이션입니다. 일일/주간 보고서 작성 및 관리, 프로젝트 관리, 팀 주간 보고서 작성 등의 기능을 제공합니다.

## 주요 기능

- **대시보드**: 개인 및 팀 대시보드를 통한 업무 현황 시각화
- **일일 보고서**: 일일 업무 보고서 작성 및 관리
- **주간 보고서**: 주간 업무 보고서 작성 및 관리
- **팀 주간 보고서**: 팀 주간 보고서 작성 및 관리
- **프로젝트 관리**: 프로젝트 생성, 조회, 관리
- **팀 관리**: 팀 구성원 관리 및 팀 업무 현황 조회
- **GitHub 연동**: GitHub 활동 정보 연동

## 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어서 확인하세요.

## 스크립트

- `pnpm dev` - 개발 서버 실행
- `pnpm build` - 프로덕션 빌드
- `pnpm start` - 프로덕션 서버 실행
- `pnpm lint` - ESLint 실행
- `pnpm format` - Prettier 포맷팅

## 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **UI 라이브러리**: React 19
- **스타일링**: Tailwind CSS, ShadCN
- **상태 관리**: Zustand
- **API 통신**: 커스텀 Fetch 래퍼
- **코드 품질**: ESLint, Prettier
- **배포**: Docker

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── (app)/              # 인증이 필요한 페이지
│   │   ├── (leader)/       # 리더 권한 페이지
│   │   └── (member)/       # 멤버 권한 페이지
│   ├── login/              # 로그인 페이지
│   └── redirect/           # 리다이렉트 페이지
├── components/             # 공통 컴포넌트
│   ├── navigation/         # 네비게이션 관련 컴포넌트
│   ├── reports/            # 보고서 관련 컴포넌트
│   ├── sidebar/            # 사이드바 컴포넌트
│   ├── theme/              # 테마 관련 컴포넌트
│   ├── typography/         # 타이포그래피 컴포넌트
│   └── ui/                 # UI 컴포넌트
├── config/                 # 설정 파일
├── const/                  # 상수 정의
├── hooks/                  # 커스텀 훅
├── lib/                    # 유틸리티 라이브러리
│   └── api/                # API 클라이언트
│       └── server/         # 서버 사이드 API
├── store/                  # Zustand 스토어
├── types/                  # 타입 정의
└── utils/                  # 유틸리티 함수
```

## API 클라이언트 구조

API 클라이언트는 다음과 같은 구조로 구성되어 있습니다:

- **customFetch**: 기본 URL 처리, 헤더 설정, 토큰 갱신 로직을 포함한 fetch 래퍼
- **api 객체**: GET, POST, PUT, DELETE 메서드를 제공하는 HTTP 클라이언트
- **HttpInterface 클래스**: 특정 API 엔드포인트에 대한 명명된 메서드를 제공
- **서버 사이드 API 클라이언트**: 서버 컴포넌트에서 사용하는 API 클라이언트

## 환경 설정

`.env.development.local` `.env.production` 파일에 다음 환경 변수를 설정하세요:

```
NEXT_PUBLIC_API_URL=백엔드 API URL
NEXT_PUBLIC_SERVER_CLIENT_SIDE_URL=백엔드 API URL
```

## Docker 배포

```bash
# Docker 이미지 빌드
./docker-build.sh

# Docker 컨테이너 실행
docker run -p 3000:3000 wee-up-frontend
```
