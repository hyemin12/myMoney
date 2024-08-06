# Error

## `components/`

오류 페이지와 관련된 모든 컴포넌트를 포함합니다.

- **ErrorTemplate.style.ts**: 오류 템플릿의 스타일을 정의하는 파일입니다.
- **ErrorTemplate.tsx**: 오류 페이지의 템플릿 컴포넌트입니다.
- **ForbiddenError.tsx**: 접근 금지 오류 페이지 컴포넌트입니다. (로그인에 실패하거나 토큰이 만료되었을 때 보여주는 페이지)
- **InternalError.tsx**: 내부 서버 오류 페이지 컴포넌트입니다.
- **NotFoundError.tsx**: 페이지를 찾을 수 없음 오류 페이지 컴포넌트입니다.

## `index.ts`

오류 페이지 기능의 진입점입니다. 외부에서 접근해야 하는 주요 컴포넌트, 유틸리티를 모두 내보냅니다.

## 사용 방법

이 기능의 컴포넌트를 사용하려면 다음과 같이 임포트할 수 있습니다:

```typescript
import { ErrorTemplate, ForbiddenError, NotFoundError } from 'features/error';
```
