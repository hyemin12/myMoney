## auth

## `api/auth.api.ts`

인증과 관련된 모든 API 호출을 처리합니다. 로그인, 회원가입, 사용자 정보 조회 등을 포함합니다.

## `components/`

인증 기능에서 사용되는 모든 컴포넌트를 포함합니다.

- **AuthOptionLink.tsx**: 로그인 및 회원가입 옵션을 제공하는 컴포넌트입니다.
- **Checkbox.tsx**: 체크박스 컴포넌트입니다.
- **JoinForm.tsx**: 회원가입 폼을 구성하는 컴포넌트입니다.
- **JoinTemplate.tsx**: 회원가입 페이지의 템플릿 컴포넌트입니다.
- **LoginForm.style.ts**: 로그인 폼의 스타일을 정의하는 파일입니다.
- **LoginForm.tsx**: 로그인 폼 컴포넌트입니다.
- **ProgressBar.tsx**: 진행 상태를 표시하는 프로그레스 바 컴포넌트입니다.

## `hooks/useAuth.ts`

사용자의 인증 (회원가입, 로그인, 로그아웃)과 유저 정보를 조회하는 로직 및 상태 관리를 캡슐화한 커스텀 훅입니다.

## `model/auth.model.ts`

인증 기능에서 사용하는 데이터의 형태를 정의하는 TypeScript 인터페이스 및 타입입니다.

## `index.ts`

인증 기능의 진입점입니다. 외부에서 접근해야 하는 주요 컴포넌트, 훅, 유틸리티를 모두 내보냅니다.

## 사용 방법

이 기능의 컴포넌트나 훅을 사용하려면 다음과 같이 임포트할 수 있습니다:

```typescript
import { LoginForm, JoinForm, useAuth } from 'features/auth';
```
