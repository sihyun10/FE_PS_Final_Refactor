import styled from '@emotion/styled';
import { EulTable11, EulTable12, EulTable13, EulTable2 } from '@/components/Table/EulTable';

const PdfEul = () => {
  return (
    <EulPageContainer>
      <Container>
        <div>
          <p className="tableTitle">1-1. 근저당 정보</p>
          <EulTable11 />
        </div>
        <div>
          <p className="tableTitle">1-2. 전세권 정보</p>
          <EulTable12 />
        </div>
      </Container>
      <SectionContainer>
        <p className="tableTitle">1-3. 근저당 상세 내용</p>
        <EulTable13 />
      </SectionContainer>
      <div>
        <p className="tableTitle">2. 소유권 이외의 권리에 관한 사항</p>
        <EulTable2 />
      </div>
    </EulPageContainer>
  );
};

export default PdfEul;

const Container = styled.div`
  margin-top: 0;
  width: 940px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const SectionContainer = styled.div`
  margin-bottom: 24px;
`;

const EulPageContainer = styled.div`
  width: 100%;
  .tableTitle {
    margin-bottom: 24px;
    font-size: 14px;
    font-weight: bold;
  }
`;
