import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Modal from '@/shared/components/Modal/Modal';
import useModalStore, { TModalMode } from '@/store/modal.store';
import { theme } from '@/styles/theme';

const openModal = (mode: TModalMode, contentProps?: any) => {
  const { openModal } = useModalStore.getState();
  openModal(mode, contentProps);
};

describe('modal 컴포넌트 테스트', () => {
  beforeEach(() => {
    useModalStore.setState({ $isOpen: false, mode: null, contentProps: {} });
  });

  test('로그인 모달 렌더 확인', () => {
    openModal('LOGIN', { shouldNavigateBack: false });

    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Modal />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(
      screen.getByText(
        (content) =>
          content.startsWith('로그인이 필요한 서비스입니다.') &&
          content.includes('로그인 하시겠습니까?'),
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('네')).toBeInTheDocument();
    expect(screen.getByText('취소')).toBeInTheDocument();
  });

  test('알림창 모달 렌더 확인', () => {
    openModal('ALERT', { message: '테스트용 알림창입니다.' });

    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Modal />
        </ThemeProvider>
        ,
      </MemoryRouter>,
    );

    expect(screen.getByText('테스트용 알림창입니다.')).toBeInTheDocument();
    expect(screen.getByText('확인')).toBeInTheDocument();
  });

  test('삭제 모달 렌더 확인', () => {
    openModal('DELETE', { onDelete: jest.fn(), type: 'review' });

    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Modal />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('후기를 삭제하시겠습니까?')).toBeInTheDocument();
    expect(screen.getByText('확인')).toBeInTheDocument();
    expect(screen.getByText('취소')).toBeInTheDocument();
  });

  // test('신고 모달 렌더 확인', () => {
  // const mockPostReport = jest.fn();

  // (useReport as jest.Mock).mockReturnValue({
  //   postReport: mockPostReport,
  // });

  //   openModal('REPORT', { reportedUserId: 1 });

  //   render(
  //     <MemoryRouter>
  //       <ThemeProvider theme={theme}>
  //         <Modal />
  //       </ThemeProvider>
  //     </MemoryRouter>,
  //   );

  //   expect(screen.getByText(/신고사유/i)).toBeInTheDocument();
  //   reportReasons.forEach((reason: string) => {
  //     expect(screen.getByLabelText(reason)).toBeInTheDocument();
  //   });
  //   expect(screen.getByText('취소')).toBeInTheDocument();
  //   expect(screen.getByText('신고')).toBeInTheDocument();
  // });

  test('후기 승인 모달 렌더 확인', () => {
    const mockApproveReview = jest.fn();

    openModal('APPROVE_REVIEW', {
      approveReview: mockApproveReview,
      receiptImg:
        'data:image/jpeg;base64,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',
    });

    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Modal />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByAltText('영수증 이미지')).toBeInTheDocument();
    expect(screen.getByText('취소')).toBeInTheDocument();
    expect(screen.getByText('승인')).toBeInTheDocument();

    fireEvent.click(screen.getByText('승인'));
    expect(mockApproveReview).toHaveBeenCalled();
  });
});
