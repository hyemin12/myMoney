# Comment

## `api/comment.api.ts`

댓글과 관련된 모든 API 호출을 처리합니다. 댓글 추가, 삭제, 목록 가져오기 등을 포함합니다.

## `components/`

댓글 기능에서 사용되는 모든 컴포넌트를 포함합니다.

- **CommentAdd.tsx**: 댓글 추가를 위한 폼 컴포넌트입니다.
- **CommentItem.tsx**: 개별 댓글 항목 컴포넌트입니다.
- **CommentList.tsx**: 댓글 목록을 표시하는 컴포넌트입니다.

## `hooks/useComment.ts`

댓글 기능과 관련된 로직 및 상태 관리를 캡슐화한 커스텀 훅입니다.

## `model/comment.model.ts`

댓글 기능에서 사용하는 데이터의 형태를 정의하는 TypeScript 인터페이스 및 타입입니다.

## `index.ts`

댓글 기능의 진입점입니다. 외부에서 접근해야 하는 주요 컴포넌트, 훅, 유틸리티를 모두 내보냅니다.

## 사용 방법

이 기능의 컴포넌트나 훅을 사용하려면 다음과 같이 임포트할 수 있습니다:

```typescript
import { CommentAdd, CommentList, useComment } from 'features/comment';
```
