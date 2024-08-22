# Reviews

## `api/reviews.api.ts`

리뷰 목록과 관련된 모든 API 호출을 처리합니다. 리뷰 목록 가져오기, 페이지네이션 등을 포함합니다.

## `components/`

리뷰 목록 기능에서 사용되는 모든 컴포넌트를 포함합니다.

- **ReviewItem.style.ts**: 리뷰 항목 스타일을 정의하는 파일입니다.
- **ReviewItem.tsx**: 리뷰 항목 컴포넌트입니다.
- **ReviewList.tsx**: 리뷰 목록을 표시하는 컴포넌트입니다.

## `hooks/`

리뷰 목록 기능과 관련된 로직 및 상태 관리를 캡슐화한 커스텀 훅들을 포함합니다.

- **useInfiniteReviewListWithoutParams.ts**: 검색 매개변수(searchParams)를 사용하지 않는 페이지에서 무한 스크롤을 구현하기 위한 훅입니다.
- **useInfiniteReviewListWithParams.ts**: 검색 매개변수(searchParams)를 사용하는 페이지에서 무한 스크롤을 구현하기 위한 훅입니다.

## `model/reviews.model.ts`

리뷰 목록 기능에서 사용하는 데이터의 형태를 정의하는 TypeScript 인터페이스 및 타입입니다.

## `utils/formatReviews.ts`

리뷰 데이터를 포맷팅하는 유틸리티 함수입니다.

## `index.ts`

리뷰 목록 기능의 진입점입니다. 외부에서 접근해야 하는 주요 컴포넌트, 훅, 유틸리티를 모두 내보냅니다.

## 사용 방법

이 기능의 컴포넌트나 훅을 사용하려면 다음과 같이 임포트할 수 있습니다:

```typescript
import {
  ReviewList,
  useInfiniteReviewListWithoutParams,
} from 'features/reviews';
```
