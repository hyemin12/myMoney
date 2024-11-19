# Review Editing

리뷰 작성 및 수정과 관련된 컴포넌트, API, 훅 등을 포함합니다.

### `/api`

- **reviewEditing.api.ts**: 리뷰 작성 및 수정과 관련된 API 호출을 처리합니다.

### `/components`

- **CreateContent.tsx**: 리뷰 작성 폼 컴포넌트입니다.
- **PhotoUpload.tsx**: 사진 업로드 컴포넌트입니다.
- **ReceiptUpload.tsx**: 영수증 업로드 컴포넌트입니다.
- **ReviewForm.tsx**: 리뷰 작성 및 수정 폼 컴포넌트입니다.
- **CategorySelector.tsx**: 리뷰 작성 시 카테고리를 선택하는 컴포넌트입니다.

### `/hooks`

- **useReviewEditing.ts**: 리뷰 작성 및 수정 기능과 관련된 로직 및 상태 관리를 캡슐화한 커스텀 훅입니다.

## `utils/convertToBase64.ts`

이미지 파일을 Base64로 변환하는 유틸리티 함수입니다.

## 사용 방법

이 기능의 컴포넌트나 훅을 사용하려면 다음과 같이 임포트할 수 있습니다:

```typescript
import { useReviewEditing, CategorySelector } from 'features/review-editing';
```
