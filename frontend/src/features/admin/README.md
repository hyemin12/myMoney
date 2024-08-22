## admin

## `api/admin.api.ts`

관리자 기능과 관련된 모든 API 호출을 처리합니다. 예를 들어 모든 사용자 데이터 가져오기, 신고 관리, 인증되지 않은 리뷰 처리 등을 포함합니다.

## `components/`

관리자 기능에서 사용되는 모든 컴포넌트를 포함합니다.

- **AdminContent.tsx**: 관리자 페이지의 메인 콘텐츠 영역입니다.
- **AdminHeader.tsx**: 관리자 페이지에서 사용되는 헤더입니다.
- **AdminLayout.tsx**: 관리자 페이지의 레이아웃을 구성하는 컴포넌트입니다.
- **AdminNavItem.tsx**: 관리자 사이드바에서 사용되는 개별 네비게이션 항목입니다.
- **AdminReportTableBody.tsx**: 신고관리 페이지에서 사용되는 테이블의 본문입니다.
- **AdminSidebar.tsx**: 관리자 섹션의 사이드바 네비게이션 컴포넌트입니다.
- **AdminTable.tsx**: 다양한 관리자 데이터를 표시하기 위한 일반 테이블 컴포넌트입니다.
- **AdminUnverifiedReviewsTableBody.tsx**: 미인증 후기 관리 페이지에서 사용되는 테이블의 본문입니다.
- **AdminUserManagementTableBody.tsx**: 모든 사용자 관리(조회) 페이지에서 사용하는 테이블 본문입니다.

## `hooks/useAdmin.ts`

관리자 기능과 관련된 로직 및 상태 관리를 캡슐화한 커스텀 훅입니다.

## `model/admin.model.ts`

관리자 기능에서 사용하는 데이터의 형태를 정의하는 TypeScript 인터페이스 및 타입입니다.

## `utils/calcTableIndex.ts`

페이지가 나뉘어진 테이블에서 행의 인덱스를 계산하는 데 도움이 되는 유틸리티 함수입니다.

## `index.ts`

관리자 기능의 진입점입니다. 일반적으로 외부에서 접근해야 하는 주요 컴포넌트, 훅, 유틸리티를 모두 내보냅니다.

## 사용 방법

이 기능의 컴포넌트나 훅을 사용하려면 다음과 같이 임포트할 수 있습니다:

```typescript
import { AdminHeader, AdminTable, useAdmin } from 'features/admin';
```
