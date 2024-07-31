import styled from 'styled-components';

import { BigSearchIcon } from '@/assets/icons';

interface NoRecentSearchResultProps {
  text: string;
}

function NoRecentSearchResult({ text }: NoRecentSearchResultProps) {
  return (
    <NoRecentSearchResultStyle>
      <BigSearchIcon />
      <p>{text}</p>
    </NoRecentSearchResultStyle>
  );
}

const NoRecentSearchResultStyle = styled.div`
  padding-top: 25vh;
  text-align: center;
`;

export default NoRecentSearchResult;
