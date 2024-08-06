# Review

## `components/`

리뷰 기능에서 사용되는 모든 공용 컴포넌트를 포함합니다.

- **ReviewImage.tsx**: 리뷰 이미지 컴포넌트입니다.
- **ReviewImageSliderArrow.tsx**: 리뷰 이미지 슬라이더의 화살표 컴포넌트입니다.
- **ReviewImages.tsx**: 리뷰 이미지 슬라이더 컴포넌트입니다.
- **StarRating.tsx**: 별점 컴포넌트입니다.

## `model/review.model.ts`

리뷰 기능에서 사용하는 데이터의 형태를 정의하는 TypeScript 인터페이스 및 타입입니다.

## `review-detail/`

리뷰 상세보기 기능과 관련된 컴포넌트, API, 훅 등을 포함합니다.

### `review-detail/api`

- **reviewDetail.api.ts**: 리뷰 상세보기와 관련된 API 호출을 처리합니다.

### `review-detail/components`

- **ReviewContent.style.ts**: 리뷰 콘텐츠 스타일을 정의하는 파일입니다.
- **ReviewContent.tsx**: 리뷰 상세보기 콘텐츠 컴포넌트입니다.

### `review-detail/hooks`

- **useReviewDetail.ts**: 리뷰 상세보기 기능과 관련된 로직 및 상태 관리를 캡슐화한 커스텀 훅입니다.

## `review-editing/`

리뷰 작성 및 수정 기능과 관련된 컴포넌트, API, 훅 등을 포함합니다.

### `review-editing/api`

- **reviewEditing.api.ts**: 리뷰 작성 및 수정과 관련된 API 호출을 처리합니다.

### `review-editing/components`

- **CreateContent.tsx**: 리뷰 작성 폼 컴포넌트입니다.
- **PhotoUpload.tsx**: 사진 업로드 컴포넌트입니다.
- **ReceiptUpload.tsx**: 영수증 업로드 컴포넌트입니다.
- **ReviewForm.tsx**: 리뷰 작성 및 수정 폼 컴포넌트입니다.
- **CategorySelector.tsx**: 리뷰 작성 시 카테고리를 선택하는 컴포넌트입니다.

### `review-editing/hooks`

- **useReviewEditing.ts**: 리뷰 작성 및 수정 기능과 관련된 로직 및 상태 관리를 캡슐화한 커스텀 훅입니다.

## `utils/convertToBase64.ts`

이미지 파일을 Base64로 변환하는 유틸리티 함수입니다.

## `index.ts`

리뷰 기능의 진입점입니다. 외부에서 접근해야 하는 주요 컴포넌트, 훅, 유틸리티를 모두 내보냅니다.

## 사용 방법

이 기능의 컴포넌트나 훅을 사용하려면 다음과 같이 임포트할 수 있습니다:

```typescript
import { ReviewImage, ReviewForm, useReviewEditing } from 'features/review';
```
