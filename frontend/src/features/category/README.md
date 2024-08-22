# Category

## `api/category.api.ts`

카테고리와 관련된 모든 API 호출을 처리합니다. 카테고리 목록 가져오기 등을 포함합니다.

## `components/`

카테고리 기능에서 사용되는 모든 컴포넌트를 포함합니다.

- **Category.tsx**: 카테고리를 표시하는 컴포넌트입니다.
- **CategoryButton.tsx**: 카테고리 항목(버튼) 컴포넌트입니다.

## `hooks/useCategory.ts`

카테고리 기능과 관련된 로직 및 상태 관리를 캡슐화한 커스텀 훅입니다.

## `model/category.model.ts`

카테고리 기능에서 사용하는 데이터의 형태를 정의하는 TypeScript 인터페이스 및 타입입니다.

## `index.ts`

카테고리 기능의 진입점입니다. 외부에서 접근해야 하는 주요 컴포넌트, 훅을 모두 내보냅니다.

## 사용 방법

이 기능의 컴포넌트나 훅을 사용하려면 다음과 같이 임포트할 수 있습니다:

```typescript
import { Category, CategoryButton, useCategory } from 'features/category';
```
