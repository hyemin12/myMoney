import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  totalPages: number;
}

function Pagination({ totalPages }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const handlePageClick = (page: number) => {
    setSearchParams({ page: page.toString() });
  };
  console.log(currentPage);

  return (
    <PaginationStyle>
      {Array(totalPages)
        .fill(0)
        .map((_: number, idx: number) => (
          <PaginationButton
            key={idx}
            onClick={() => handlePageClick(idx + 1)}
            className={currentPage === idx + 1 ? 'active' : ''}
          >
            {idx + 1}
          </PaginationButton>
        ))}
    </PaginationStyle>
  );
}
const PaginationStyle = styled.div`
  display: flex;
  justify-content: center;
  padding: 2em 0;
  gap: 4px;
`;

const PaginationButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: transparent;
  border-radius: 50%;
  border: 1px solid #eee;
  font-size: 0.8rem;
  cursor: pointer;
  &.active {
    background-color: ${({ theme }) => theme.color.primary};
    color: #fff;
    border: none;
  }
`;
export default Pagination;
