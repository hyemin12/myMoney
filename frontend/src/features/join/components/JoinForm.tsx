import React from 'react';
import styled from 'styled-components';

import { AlertText, Button } from '@/shared/components';

interface Props {
  children: React.ReactNode;
  isLastStep: boolean;
  onSubmit: () => void;
  isValid: boolean;
  errorMessage: string | null;
}

function JoinForm({
  children,
  isLastStep,
  onSubmit,
  isValid,
  errorMessage,
}: Props) {
  return (
    <Form onSubmit={onSubmit}>
      <InputWrapper>{children}</InputWrapper>

      <Button
        type="submit"
        scheme="primary"
        size="large"
        $fullWidth
        disabled={!isValid}
      >
        {isLastStep ? '회원가입' : '계속하기'}
      </Button>
      {errorMessage && <AlertText size="small">{errorMessage}</AlertText>}
    </Form>
  );
}
const Form = styled.form`
  margin-bottom: 35px;
`;

const InputWrapper = styled.div`
  margin-bottom: 55px;
  fieldset {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
export default JoinForm;
