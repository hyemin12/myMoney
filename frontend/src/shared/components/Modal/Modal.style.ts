import { TModalMode } from '@/store/modal.store';
import styled, { css } from 'styled-components';

export const ModalStyle = styled.div<{ $isOpen: boolean }>`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  animation: ${({ $isOpen }) => ($isOpen ? 'fade-in' : 'fade-out')} 0.3s
    ease-in-out forwards;

  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalBody = styled.div<{
  mode: TModalMode | null;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 380px;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

  ${({ mode }) =>
    mode === 'APPROVE_REVIEW' &&
    css`
      width: 800px;
      height: auto;
    `}

  background-color: #fff;
  max-width: 90%;
  max-height: 90%;
  min-height: 200px;
`;

export const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  height: 100%;
  min-height: 200px;

  h4 {
    margin-bottom: 24px;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    white-space: pre-wrap;
  }

  .button-group {
    margin-top: 20px;

    display: flex;
    gap: 10px;
    height: 100%;
    button {
      height: 100%;
    }
  }
`;

export const RadioButton = styled.div``;
