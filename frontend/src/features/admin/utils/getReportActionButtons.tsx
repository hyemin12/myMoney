import { Button } from '@/shared/components';
import { IFormatSuspendedUsers } from '../models/admin.model';

interface Props {
  result: IFormatSuspendedUsers['result'];
  reportId: number;
  approveReport: (reviewId: number) => void;
  cancelReport: (reviewId: number) => void;
}

function getReportActionButtons({
  result,
  cancelReport,
  approveReport,
  reportId,
}: Props) {
  if (result === '처리 완료')
    return (
      <Button disabled size="small" scheme="disabled">
        완료
      </Button>
    );
  return (
    <>
      <Button
        scheme="border"
        size="small"
        onClick={() => cancelReport(reportId)}
      >
        취소
      </Button>
      <Button
        scheme="primary"
        size="small"
        onClick={() => approveReport(reportId)}
      >
        승인
      </Button>
    </>
  );
}

export default getReportActionButtons;
