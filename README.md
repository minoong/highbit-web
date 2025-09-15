# 하이비트 웹 (Highbit Web)

실시간 암호화폐 거래소 인터페이스 웹 애플리케이션입니다. 업비트 API를 활용하여 실시간 시세, 차트, 호가창, 거래내역 등을 제공합니다.

## 🌐 라이브 데모

**웹앱**: [https://highbit-web.vercel.app/exchange?code=KRW-BTC](https://highbit-web.vercel.app/exchange?code=KRW-BTC)

## 🚀 주요 기능

### 📊 거래 기능

- **실시간 시세**: WebSocket을 통한 실시간 가격 업데이트
- **호가창**: 실시간 매수/매도 호가 정보
- **차트**: 캔들 차트 및 기술적 분석 도구
- **거래내역**: 실시간 체결내역 조회
- **포트폴리오**: 보유 자산 관리

### 🔧 기술적 특징

- **환경별 최적화**: 로컬(WebSocket) / Vercel(폴링) 자동 선택
- **Rate Limiting**: API 요청 빈도 제어로 429 에러 방지
- **캐싱 전략**: 데이터 유형별 최적화된 캐시 설정
- **반응형 디자인**: 모바일/데스크톱 대응

## 🛠 기술 스택

### Frontend

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **UI Library**: Chakra UI + Tailwind CSS
- **State Management**: Redux Toolkit + React Query
- **Charts**: react-financial-charts + D3.js

### Backend & API

- **API Proxy**: Next.js API Routes
- **External API**: Upbit API
- **Authentication**: NextAuth.js + Firebase
- **Deployment**: Vercel

### Development Tools

- **Testing**: Vitest + Testing Library
- **Linting**: ESLint + Prettier
- **Storybook**: 컴포넌트 문서화

## 🏃‍♂️ 시작하기

### 환경 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# API 설정
API_URL=https://api.upbit.com

# Firebase 설정 (NextAuth용)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# NextAuth 설정
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

## 📝 사용 가능한 스크립트

```bash
# 개발
npm run dev              # 개발 서버 시작

# 빌드
npm run build           # 프로덕션 빌드
npm start              # 프로덕션 서버 시작

# 코드 품질
npm run lint           # ESLint 실행
npm run lint:fix       # ESLint 자동 수정
npm run prettier       # Prettier 포매팅

# 테스트
npm run test           # 테스트 실행
npm run coverage       # 테스트 커버리지

# Storybook
npm run storybook              # Storybook 개발 서버
npm run build-storybook        # Storybook 빌드
npm run deploy-storybook       # GitHub Pages에 배포
```

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js 13 App Router
│   ├── api/               # API Routes
│   │   └── upbit/         # Upbit API 프록시
│   ├── balances/          # 자산 관리 페이지
│   ├── exchange/          # 거래소 메인 페이지
│   └── layout.tsx         # 루트 레이아웃
├── components/            # 재사용 가능한 컴포넌트
│   ├── atoms/            # 원자 단위 컴포넌트
│   ├── ui/               # UI 관련 컴포넌트
│   └── ...
├── features/             # Redux 슬라이스 (도메인별)
│   ├── candles/          # 차트 데이터
│   ├── markets/          # 마켓 정보
│   └── tickers/          # 시세 정보
├── hooks/                # 커스텀 훅
│   ├── queries/          # React Query 훅
│   ├── useUpbitData.ts   # 환경별 데이터 소스 선택
│   └── ...
├── utils/                # 유틸리티 함수
│   ├── rateLimiter.ts    # API 요청 빈도 제어
│   └── ...
└── types/                # TypeScript 타입 정의
```

## 🌐 배포

### Vercel 배포

이 프로젝트는 Vercel에 최적화되어 있습니다:

1. **자동 배포**: GitHub 연동으로 자동 배포
2. **환경별 대응**: WebSocket → 폴링 자동 전환
3. **성능 최적화**: Edge Functions 활용

```bash
# Vercel CLI로 배포
npm i -g vercel
vercel --prod
```

### 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수를 설정하세요:

- `API_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- Firebase 관련 변수들

## 🔧 개발 가이드

### API 프록시 시스템

Vercel 환경에서 429 에러를 방지하기 위해 API 프록시를 구현했습니다:

```typescript
// 직접 호출 (로컬에서만 권장)
fetch('https://api.upbit.com/v1/ticker?markets=KRW-BTC')

// 프록시 사용 (권장)
fetch('/api/upbit/v1/ticker?markets=KRW-BTC')
```

### WebSocket vs 폴링

환경에 따라 자동으로 데이터 소스가 선택됩니다:

```typescript
import useUpbitData from '~/hooks/useUpbitData'

// 로컬: WebSocket, Vercel: 폴링
const { socketData, isConnected } = useUpbitData(markets, 'ticker')
```

## Ref

- **API 제공**: [Upbit](https://upbit.com)
- **차트 라이브러리**: [react-financial-charts](https://github.com/react-financial/react-financial-charts)
