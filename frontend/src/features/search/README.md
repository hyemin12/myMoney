### `features/search/README.md`

````markdown
# Search

## `components/`

검색 기능에서 사용되는 모든 컴포넌트를 포함합니다.

- **NoRecentSearchResult.tsx**: 최근 검색 결과가 없을 때 표시되는 컴포넌트입니다.
- **RecentKeyword.tsx**: 최근 검색 키워드를 표시하는 컴포넌트입니다.
- **SearchInputBox.tsx**: 검색 입력 상자 컴포넌트입니다.

## `index.ts`

검색 기능의 진입점입니다. 외부에서 접근해야 하는 주요 컴포넌트, 유틸리티를 모두 내보냅니다.

## 사용 방법

이 기능의 컴포넌트를 사용하려면 다음과 같이 임포트할 수 있습니다:

```typescript
import { SearchInputBox } from 'features/search';
```
````
