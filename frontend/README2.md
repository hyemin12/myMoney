### FSD 구조

```
└─ frontend
   ├─ .eslintrc.cjs
   ├─ .prettierrc
   ├─ README.md
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  └─ favicon.ico
   ├─ src
   │  ├─ app
   │  │  ├─ store
   │  │  │  ├─ auth.store.ts
   │  │  │  └─ user.registration.store.ts
   │  │  └─ main.tsx
   │  ├─ features
   │  │  ├─ admin
   │  │  │  ├─ AdminContent.tsx
   │  │  │  ├─ AdminHeader.tsx
   │  │  │  ├─ AdminLayout.tsx
   │  │  │  ├─ AdminNavItem.tsx
   │  │  │  ├─ AdminReportTableBody.tsx
   │  │  │  ├─ AdminSidebar.tsx
   │  │  │  ├─ AdminTable.tsx
   │  │  │  ├─ AdminUnverifiedReviewsTableBody.tsx
   │  │  │  └─ index.ts
   │  │  ├─ comment
   │  │  │  ├─ CommentAdd.tsx
   │  │  │  ├─ CommentItem.tsx
   │  │  │  ├─ CommentList.tsx
   │  │  │  └─ index.ts
   │  │  ├─ error
   │  │  │  ├─ ErrorTemplate.style.ts
   │  │  │  ├─ ErrorTemplate.tsx
   │  │  │  ├─ ForbiddenError.tsx
   │  │  │  ├─ InternalError.tsx
   │  │  │  └─ NotFoundError.tsx
   │  │  ├─ home
   │  │  │  ├─ BestReviewItem.tsx
   │  │  │  └─ BestReviews.tsx
   │  │  ├─ login
   │  │  │  ├─ Checkbox.tsx
   │  │  │  ├─ LoginForm.style.ts
   │  │  │  └─ LoginForm.tsx
   │  │  ├─ review
   │  │  │  ├─ ReviewForm
   │  │  │  │  ├─ CategorySelector.tsx
   │  │  │  │  ├─ CreateContent.tsx
   │  │  │  │  ├─ PhotoUpload.tsx
   │  │  │  │  ├─ ReceiptUpload.tsx
   │  │  │  │  └─ ReviewForm.tsx
   │  │  │  ├─ ReviewImageSlider
   │  │  │  │  ├─ ReviewImage.tsx
   │  │  │  │  ├─ ReviewImageSliderArrow.tsx
   │  │  │  │  └─ ReviewImages.tsx
   │  │  │  ├─ ReviewList
   │  │  │  │  └─ ReviewList.tsx
   │  │  │  └─ index.ts
   │  │  └─ user
   │  │     ├─ JoinForm.tsx
   │  │     ├─ JoinTemplate.tsx
   │  │     ├─ ProgressBar.tsx
   │  │     └─ index.ts
   │  ├─ shared
   │  │  ├─ components
   │  │  │  ├─ AlertText.tsx
   │  │  │  ├─ Button.tsx
   │  │  │  ├─ Dropdown.tsx
   │  │  │  ├─ Icon.tsx
   │  │  │  ├─ Loading.tsx
   │  │  │  ├─ Modal.tsx
   │  │  │  └─ index.ts
   │  │  ├─ hooks
   │  │  │  ├─ useAuth.ts
   │  │  │  ├─ useModal.ts
   │  │  │  └─ index.ts
   │  │  └─ utils
   │  │     ├─ format.ts
   │  │     └─ routingUtils.ts
   │  ├─ assets
   │  │  ├─ icons
   │  │  │  ├─ Archive.tsx
   │  │  │  ├─ index.ts
   │  │  │  └─ ... (기타 아이콘 파일)
   │  │  └─ images
   │  │     ├─ badge-img.png
   │  │     ├─ logo16x16.png
   │  │     └─ logo32x32.png
   │  ├─ layout
   │  │  ├─ Header.tsx
   │  │  └─ Navigation.tsx
   │  ├─ constance
   │  │  ├─ modalString.ts
   │  │  ├─ querystring.ts
   │  │  └─ validate.ts
   │  ├─ styles
   │  │  ├─ global.ts
   │  │  └─ theme.ts
   └─ .env

```

### FSD 구조 설명

- app: 애플리케이션 초기화 및 주요 설정

- features:각 기능 별로 구성된 폴더들로, 관련된 컴포넌트와 API로 구성

- shared: 여러 기능에서 사용되는 공통 컴포넌트, 훅, 유틸리티 함수들로 구성

- assets: 아이콘 및 이미지로 구성

- layout: 레이아웃 관련 컴포넌트로 구성

- constance: 상수로 구성

- styles: 전역 스타일과 테마 설정

- pages: 페이지 관련 파일

#### #entities

비즈니스 로직과 데이터 구조 관련 코드

#### #features

개별 기능 단위로 모듈화된 코드  
api, components, index.ts로 구성

- api: API 호출 관련 코드
- components: 해당 기능 컴포넌트
- index.ts: 모듈화를 위한 파일

#### #shared

애플리케이션 전반에 걸쳐 재사용되는 코드 (UI 컴포넌트, 유틸리티 등)

- components: 버튼, 모달 등 공통 UI
- constants: 상수
- context: 컨텍스트 코드
- hooks: 커스텀 훅
- styles: 스타일관련 코드

#### #widgets

공통 UI 위젯

#### #app

#### #utils

유틸리티 함수와 헬퍼 함수
