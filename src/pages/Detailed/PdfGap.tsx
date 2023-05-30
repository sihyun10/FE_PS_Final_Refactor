import styled from '@emotion/styled';
import { Gaptable1, Gaptable2 } from '@/components/Table/GapTable';

const PdfGap = () => {
  return (
    <GapPageContainer>
      <div>
        <p className="tableTitle">1. 최근 변동 내역</p>
        <Gaptable1 />
      </div>
      <div>
        <p className="tableTitle">2. 최근 소유권 사항</p>
        <Gaptable2 />
      </div>
    </GapPageContainer>
  );
};

export default PdfGap;

const GapPageContainer = styled.div`
  width: 100%;
  .tableTitle {
    margin-bottom: 24px;
    font-size: 14px;
    font-weight: bold;
  }
  div {
    margin-top: 30px;
  }
  div:first-of-type {
    margin-top: 0;
  }
`;
