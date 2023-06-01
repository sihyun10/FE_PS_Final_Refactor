import styled from '@emotion/styled';
import PraPrice from '../Pra/PraPrice';
import MarketPriceTable2 from '@/components/Table/MarketPrice/MarketPriceTable2';

const MarketPrice = () => {
  return (
    <div>
      <PraPrice />
      <PraPriceContent>
        <div>
          <p className="tableTitle">2. 실거래가</p>
          <MarketPriceTable2 />
        </div>
      </PraPriceContent>
    </div>
  );
};

export default MarketPrice;

const PraPriceContent = styled.div`
  width: 100%;
  .tableTitle {
    font-size: 14px;
    font-weight: bold;
  }
  div {
    height: 510px;
    margin-top: 25px;
  }
`;
