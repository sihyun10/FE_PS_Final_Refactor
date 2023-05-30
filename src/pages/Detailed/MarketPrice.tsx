import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import PraPrice from '../Pra/PraPrice';

const MarketPrice = () => {
  const { id } = useParams<{ id: string }>(); // 실제 id 값을 추출하여 할당
  return (
    <MarketPriceWrap>
      <PraPrice />
    </MarketPriceWrap>
  );
};

export default MarketPrice;
const MarketPriceWrap = styled.div`
  width: 940px;
`;
