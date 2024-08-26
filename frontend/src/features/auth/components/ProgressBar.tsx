import styled from 'styled-components';

interface Props {
  total: number;
  current: number;
}

function ProgressBar({ total, current }: Props) {
  return (
    <Background role="progressbar">
      <CurrentBar total={total} current={current} />
    </Background>
  );
}

const Background = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.color.background};
  position: relative;
  top: 0;
  left: 0;
`;

const CurrentBar = styled.div<Props>`
  width: ${({ total, current }) => `calc((100% / ${total}) * ${current})`};
  height: 4px;
  background-color: ${({ theme }) => theme.color.secondary};
`;

export default ProgressBar;
