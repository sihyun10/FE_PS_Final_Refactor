import styled from '@emotion/styled';
import PdfSummaryTable1 from '@/components/Table/PdfSummary/PdfSummaryTable1';
import PdfSummaryTable3 from '@/components/Table/PdfSummary/PdfSummaryTable3';

const PdfSummary = () => {
  return (
    <PdfSummaryContainer>
      <p>1. 소유지분현황 (갑구)</p>
      <PdfSummaryTable1 />
      <p>2. 소유지분을 제외한 소유권에 관한 사항 (갑구)</p>
      <span>- 소유지분 관한 내용이 없습니다.</span>
      <p>3. (근)저당권 및 전세권 등 (을구)</p>
      <PdfSummaryTable3 />
    </PdfSummaryContainer>
  );
};

export default PdfSummary;

const PdfSummaryContainer = styled.div`
  width: 100%;
  p {
    font-weight: bold;
    font-size: 14px;
    margin: 24px 0;
    span {
      font-size: 12px;
    }
    &:first-of-type {
      margin-top: 0;
    }
  }
  span {
    font-weight: 400;
    font-size: 12px;
  }
`;
