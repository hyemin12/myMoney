# Report

사용자가 수행하는 신고 기능을 포함합니다. 관리자가 수행하는 신고 기능은 포함되어 있지 않습니다.

## `api/report.api.ts`

관련된 모든 API 호출을 처리합니다. 신고 추가 등을 포함합니다.

## `hooks/useReport.ts`

신고 기능과 관련된 로직 및 상태 관리를 캡슐화한 커스텀 훅입니다.

## `model/report.model.ts`

신고 기능에서 사용하는 데이터의 형태를 정의하는 TypeScript 인터페이스 및 타입입니다.

## `index.ts`

신고 기능의 진입점입니다. 외부에서 접근해야 하는 주요 컴포넌트, 훅, 유틸리티를 모두 내보냅니다.

## 사용 방법

이 기능의 훅을 사용하려면 다음과 같이 임포트할 수 있습니다:

```typescript
import { useReport } from 'features/report';
```
