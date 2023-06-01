import styled from '@emotion/styled';

// EulTable11.tsx 파일의 스타일
export const Button = styled.button`
  color: #0101df;
`;

export const TableWrapper = styled.div`
  tbody tr {
    &:nth-of-type(1) {
      background-color: #ffe4e4; /* 연한 빨간색 배경 */
    }
    td:nth-child(2) {
      font-weight: bold;
      background-color: #e4f1ff; /* 연한 파란색 배경 */
    }
  }
  th {
    &:nth-of-type(1) {
      color: #ff0040; /* 담보총액/건수 텍스트 색상 */
      font-weight: bold;
    }
    &:nth-of-type(2) {
      color: #08088a; /* 원금 추론액 텍스트 색상 */
      font-weight: bold;
    }
  }
`;

// MarketPriceTable2.tsx 파일의 스타일
export const PraPriceContent = styled.div`
  width: 100%;
  .tableTitle {
    font-size: 14px;
    font-weight: bold;
  }
`;

export const PraPriceTable = styled.div`
  height: 510px;
  margin-top: 25px;
`;
