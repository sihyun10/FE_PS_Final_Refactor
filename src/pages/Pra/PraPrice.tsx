import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chart from '@/components/Chart/';
import { useDataStore } from '@/store/DataStore';

const PraPrice = () => {
  const { id } = useParams();
  const { responseItems } = useDataStore();
  const [praPriceData, setPraPriceData] = useState<any>(null);

  let minPrice = '';
  let maxPrice = '';
  let allMinPrice = '';
  let allMaxPrice = '';

  useEffect(() => {
    if (!id) {
      console.log('URL에 아이디가 제공되지 않았습니다.');
      return;
    }

    const parsedId: number = +id;
    const selectedItem: any = responseItems.find((item) => item.id === parsedId);

    if (selectedItem) {
      setPraPriceData(selectedItem.data.customData.filterDATA);
    } else {
      console.log(`아이디 ${id}에 해당하는 아이템을 찾을 수 없습니다.`);
    }
  }, [id]);

  const result = praPriceData
    ? Object.entries(praPriceData)
        .flatMap(([date, records]) => {
          return (records as any[]).map((record) => ({
            계약일: date + String(record.일).padStart(2, '0'),
            아파트명: `${record.아파트}  ${Math.floor(record.전용면적 / 3.3)}평`,
            거래: '매매',
            거래금액: record.거래금액.trim(),
            전용면적: `${record.전용면적}.㎡`,
            층: record.층,
          }));
        })
        .sort((a, b) => b.계약일.localeCompare(a.계약일))
    : [];

  const getPrice = (price: string) => parseInt(price.replace(/,/g, ''), 10);

  const findMinPrice = (data: any[]) =>
    data.reduce((min, record) => {
      const price = getPrice(record.거래금액);
      return price < min ? price : min;
    }, Infinity);

  const findMaxPrice = (data: any[]) =>
    data.reduce((max, record) => {
      const price = getPrice(record.거래금액);
      return price > max ? price : max;
    }, -Infinity);

  const formatPrice = (price: number) => {
    if (price === Infinity) return '데이터 없음';
    const billions = Math.floor(price / 10000);
    const millions = price % 10000;
    return millions !== 0 ? `${billions}억 ${millions}만원` : `${billions}억`;
  };

  if (result && result.length > 0) {
    const latestFourRecords = result.slice(0, 4);
    minPrice = formatPrice(findMinPrice(latestFourRecords));
    maxPrice = formatPrice(findMaxPrice(latestFourRecords));
    allMinPrice = formatPrice(findMinPrice(result));
    allMaxPrice = formatPrice(findMaxPrice(result));
  }

  return (
    <PraPriceWrap>
      <PraPriceContent>
        <PraPriceTitle>1. 시세 및 실거래가 정보 (출처 _국토교통부)</PraPriceTitle>
        <PraPriceFlexDiv style={{ gap: '20px', marginTop: '25px' }}>
          <PraPriceChart>
            <Chart result={result} />
          </PraPriceChart>
          <PraPriceFlexColumnDiv style={{ width: '400px', gap: '20px', alignItems: 'center' }}>
            <PraPriceNow>
              <PraPriceTitle>최근 실거래가</PraPriceTitle>
              <PraPriceFlexDiv style={{ justifyContent: 'center' }}>
                <PraPriceNewHighLow>
                  <PraValue>{minPrice}</PraValue>
                  <PraPriceTitle>하한가</PraPriceTitle>
                </PraPriceNewHighLow>
                <PraHR />
                <PraPriceNewHighLow>
                  <PraValue>{maxPrice}</PraValue>
                  <PraPriceTitle>상한가</PraPriceTitle>
                </PraPriceNewHighLow>
              </PraPriceFlexDiv>
              <PraAnnotation>최근 4개 거래건</PraAnnotation>
            </PraPriceNow>
            <PraPriceFlexDiv
              style={{
                width: '100%',
                height: '100%',
                gap: '20px',
              }}
            >
              <PraPriceHighLow>
                <PraPriceTitle>최고 실거래가</PraPriceTitle>
                <PraValue style={{ color: '#7D6117' }}>{allMaxPrice}</PraValue>
                <PraAnnotation>전체 데이터 기준</PraAnnotation>
              </PraPriceHighLow>

              <PraPriceHighLow>
                <PraPriceTitle>최저 실거래가</PraPriceTitle>
                <PraValue style={{ color: '#7D6117' }}>{allMinPrice}</PraValue>
                <PraAnnotation>전체 데이터 기준</PraAnnotation>
              </PraPriceHighLow>
            </PraPriceFlexDiv>
          </PraPriceFlexColumnDiv>
        </PraPriceFlexDiv>
      </PraPriceContent>
    </PraPriceWrap>
  );
};

export default PraPrice;

const PraPriceNewHighLow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 172px;
  height: 35ps;
  text-align: center;
  gap: 12px;
`;

const PraValue = styled.div`
  font-weight: bold;
  color: #1a237e;
  font-size: 18px;
`;

const PraAnnotation = styled.div`
  text-align: end;
  color: #bdbdbd;
  font-size: 9px;
  font-weight: 100;
`;
const PraHR = styled.div`
  border-left: 1px solid #bdbdbd;
  height: 30px;
`;

const PraPriceChart = styled.div`
  max-width: 100%;
  height: 100%;
  padding: 24px;
  border: 1px solid #cccccc;
  border-radius: 5px;
`;

const PraPriceNow = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  font-weight: bold;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: #f3f5fb;
  border: 1px solid #c8cbe2;
`;
const PraPriceHighLow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
  width: 100%;
  height: 100%;
  border: 1px solid #d0c7ab;
  color: #7d6117;
  font-weight: bold;
  background-color: #f3f2eb;
  border-radius: 5px;
`;

const PraPriceFlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  max-width: 100%;
`;
const PraPriceFlexDiv = styled.div`
  width: 100%;
  display: flex;
`;

const PraPriceTitle = styled.span`
  color: black;
  font-size: 14px;
  font-weight: bold;
`;

const PraPriceContent = styled.div`
  padding-bottom: 30px;
`;

const PraPriceWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
