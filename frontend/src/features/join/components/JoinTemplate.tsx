import React from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';
import JoinForm from './JoinForm';

const TOTAL_STEP = 3;

interface Props {
  current: number;
  children: React.ReactNode;
  title: string;
  onSubmit: () => void;
  isValid: boolean;
  errorMessage: string | null;
}

function JoinTemplate({
  current,
  children,
  title,
  isValid,
  onSubmit,
  errorMessage,
}: Props) {
  return (
    <>
      <ProgressBar total={TOTAL_STEP} current={current} />
      <Inner>
        <TitleWrapper>
          {title.split('\\n').map((text, idx) => (
            <Title key={idx}>{text}</Title>
          ))}
        </TitleWrapper>

        <JoinForm
          onSubmit={onSubmit}
          isLastStep={current === TOTAL_STEP}
          isValid={isValid}
          errorMessage={errorMessage}
        >
          {children}
        </JoinForm>
      </Inner>
    </>
  );
}
export const TitleWrapper = styled.div`
  padding-top: 100px;
  margin-bottom: 35px;
`;
export const Title = styled.h1`
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: ${({ theme }) => theme.heading['large'].fontSize};
  line-height: 1.2;
`;
export const Inner = styled.div`
  padding: ${({ theme }) => theme.padding.mainContent};
`;
export default JoinTemplate;
