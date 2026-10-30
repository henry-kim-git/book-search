# Book Search

카카오 도서 검색 API를 활용한 도서 검색 서비스입니다.

## 프로젝트 개요

- 도서를 검색어(제목/출판사/저자)로 검색하고 목록으로 확인할 수 있는 웹 애플리케이션
- 최근 검색어를 쿠키에 저장해 재검색 시 활용
- React 19 + TypeScript + Vite 기반 SPA
- 작업 기간: 이틀에 걸쳐 약 6시간 소요 (첫 완성 시점 코드는 [`v1.0` 태그](../../tree/v1.0)에서 볼 수 있습니다)

## 실행 방법

### 요구 사항

- Node.js 18 이상
- npm

### 설치 및 실행

```bash
npm install
```

프로젝트 루트에 `.env` 파일을 생성하고 카카오 REST API 키를 등록합니다.

```
VITE_KAKAO_REST_API_KEY=발급받은_REST_API_키
```

```bash
# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 린트
npm run lint
```

## 폴더 구조 및 주요 코드 설명

```
src/
├── components/            # 여러 페이지에서 공용으로 쓰는 UI 컴포넌트
│   ├── BasicIcon/         # SVG 아이콘 컴포넌트 (line/filled)
│   ├── BookList/          # 도서 목록/아이템 컴포넌트
│   ├── Header.tsx         # 상단 네비게이션
│   └── Typography.tsx     # 타이포그래피 프리셋 컴포넌트
├── hooks/                 # 여러 곳에서 재사용하는 공용 훅
├── layouts/
│   └── RootLayout/        # 공통 레이아웃(헤더 + 컨텐츠 영역)
├── pages/
│   ├── LandingPage/       # 도서 검색 페이지
│   │   ├── components/    # 이 페이지에서만 쓰는 컴포넌트 (검색창, 상세검색, 결과 리스트 등)
│   │   ├── hooks/         # 도서 검색 API 호출 훅
│   │   └── store/         # 검색 상태(zustand store)
│   └── FavoritesPage/     # 찜한 책 페이지
├── routes/                # react-router 라우트 정의
├── styles/                # 전역 스타일, 컬러 토큰
└── utils/                 # 쿠키 등 범용 유틸 함수
```

- `pages/LandingPage/store/useBookSearch.ts`: 검색어, 페이지, 검색 결과 등 검색과 관련된 상태를 zustand로 관리하는 스토어입니다.
- `pages/LandingPage/hooks/useSearchBook.ts`: 카카오 도서 검색 API 호출, 페이지네이션, 최근 검색어 쿠키 저장/삭제 로직을 담당합니다. 컴포넌트는 이 훅을 통해서만 검색 상태와 API를 다룹니다.
- `utils/cookie.ts`: 쿠키 read/write를 감싼 유틸로 최근 검색어 저장에 사용됩니다.
- `components/Typography.tsx`, `styles/colorToken.css`: 타이포/컬러 스타일을 한 곳에서 정의해 재사용합니다.

## 라이브러리 선택 이유

- **Tailwind CSS**: 실무에서 자주 사용해 손에 익숙하고, 짧은 기간 안에 프로젝트를 완성하려면 미리 만들어진 유틸리티 클래스를 쓰는 편이 빠르다고 판단해 선택했습니다.
- **Zustand**: 검색 상태를 여러 컴포넌트가 전역에서 바라볼 필요가 있어 도입했습니다. 부분 구독(selector)으로 상태 변경이 필요한 컴포넌트만 리렌더링되도록 할 수 있다는 점이 선택 이유입니다.

## 설계하면서 신경 쓴 부분

- **스타일은 한 곳에서**: 컬러, 타이포, 공통 컴포넌트의 스타일과 로직을 한 곳에서 관리
- **역할 단위로 나눈 함수**: 검색 요청, 페이지 계산, 검색어 저장을 각각 다른 함수로 분리
- **상태와 API는 하나의 진입점으로**: 컴포넌트는 `useSearchBook`만 거치도록 해서 같은 로직을 여러 곳에서 다루지 않게 설계
- **필요한 상태만**: 꼭 필요한 상태만 두고 props drilling 없이 데이터 흐름을 단순하게 유지

## 알고 있는 한계

- 클라이언트에서 API 키를 직접 사용하는 구조입니다. 실제 서비스라면 키를 숨기기 위해 서버나 프록시를 거쳐 요청해야 합니다.

## 진행하지 못한 기능

기획 단계에서 계획했지만 시간 관계상 구현하지 못한 기능입니다.

- 책 목록 상세보기 펼치기 기능
- 찜하기 추가/삭제 기능
- 찜하기 조회 기능
