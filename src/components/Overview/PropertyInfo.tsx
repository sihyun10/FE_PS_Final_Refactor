import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useDataStore } from '../../store/DataStore';
import { getResData } from '@/utils/getResData';

const PropertyInfo = () => {
  const { id } = useParams();
  const { responseItems } = useDataStore();
  const [summary, setSummary] = useState<any>(null);

  const [price, setPrice] = useState<any>(null);
  const [priceDate, setPriceDate] = useState<any>(null);

  useEffect(() => {
    if (!id) {
      console.log('URL에 아이디가 제공되지 않았습니다.');
      return;
    }

    const parsedId: number = +id;
    const selectedItem: any = responseItems.find((item) => item.id === parsedId);
    if (selectedItem) {
      setSummary(selectedItem);
    } else {
      console.log(`아이디 ${id}에 해당하는 아이템을 찾을 수 없습니다.`);
    }
  }, [id]);

  const mortgage = Object.values(getResData('rights_other_than_ownership'));
  const ownershipList = Object.values(getResData('ownership_list'));
  const matximumDeb = Object.values(getResData('originalMoney'));
  const dateKeys = Object.keys(getResData('customData.filterDATA')).map(Number);
  const maxDateKey = Math.max(...dateKeys);
  const maxDate = getResData('customData.filterDATA')[maxDateKey];

  useEffect(() => {
    if (maxDate.length > 0) {
      setPriceDate(maxDateKey.toString());
      setPrice(maxDate[maxDate.length - 1]);
    }
  }, [maxDate]);

  return (
    <PraPropertyInfoWrap>
      <FlexColomnWrap>
        <HrLine />
        <FlexColomnDiv>
          <FileNameDate>{summary?.data?.summary?.viewedAt || '-'}</FileNameDate>
          <FileNameSpan>{summary?.filename || '-'}</FileNameSpan>
        </FlexColomnDiv>
        <HrLine />
        <FlexColomnDiv>
          <TitleSpan>물건</TitleSpan>
          <ContentSpan>{summary?.data?.summary?.address || '-'}</ContentSpan>
        </FlexColomnDiv>
        <FlexColomnDiv>
          <TitleSpan>등기번호</TitleSpan>
          <ContentSpan>{summary?.data?.summary?.registryNumber || '-'}</ContentSpan>
        </FlexColomnDiv>
        <FlexDiv>
          <ContentWrap>
            <FlexColomnDiv>
              <TitleSpan>유형</TitleSpan>
              <ContentSpan>{summary?.data ? '아파트' : '-'}</ContentSpan>
            </FlexColomnDiv>
          </ContentWrap>
          <ContentWrap>
            <FlexColomnDiv>
              <TitleSpan>면적</TitleSpan>
              <ContentSpan>
                {summary?.data?.summary?.area}㎡ / {summary?.data?.summary?.pyeong || '-'} 평
              </ContentSpan>
            </FlexColomnDiv>
          </ContentWrap>
        </FlexDiv>
        {ownershipList.length > 0 ? (
          ownershipList.map((item: any, index: any) => (
            // eslint-disable-next-line react/no-array-index-key
            <FlexDiv key={index}>
              <ContentWrap>
                <FlexColomnDiv>
                  <TitleSpan>소유자</TitleSpan>
                  <ContentSpan>{item.name}</ContentSpan>
                </FlexColomnDiv>
              </ContentWrap>
              <ContentWrap>
                <FlexColomnDiv>
                  <TitleSpan>지분율</TitleSpan>
                  <ContentSpan>{item.percent}</ContentSpan>
                </FlexColomnDiv>
              </ContentWrap>
            </FlexDiv>
          ))
        ) : (
          <FlexDiv>
            <ContentWrap>
              <FlexColomnDiv>
                <TitleSpan>소유자</TitleSpan>
                <ContentSpan>-</ContentSpan>
              </FlexColomnDiv>
            </ContentWrap>
            <ContentWrap>
              <FlexColomnDiv>
                <TitleSpan>지분율</TitleSpan>
                <ContentSpan>-</ContentSpan>
              </FlexColomnDiv>
            </ContentWrap>
          </FlexDiv>
        )}

        <FlexDiv>
          <ContentWrap>
            <FlexColomnDiv>
              <TitleSpan>소유권 이전</TitleSpan>
              <ContentSpan>{summary?.data?.summary?.ownerTransfer || '-'}</ContentSpan>
            </FlexColomnDiv>
          </ContentWrap>
          <ContentWrap>
            <FlexColomnDiv>
              <TitleSpan>대지권</TitleSpan>
              <ContentSpan>{summary?.data?.summary?.landRights || '-'}</ContentSpan>
            </FlexColomnDiv>
          </ContentWrap>
        </FlexDiv>
        <HrLine />

        <FlexColomnDiv>
          <TitleSpan>
            실거래가 (
            {priceDate && (
              <>
                {`${priceDate.slice(0, 4)}년 `}
                {`${parseInt(priceDate.slice(4), 10)}월 `}
                거래
              </>
            )}
            )
          </TitleSpan>
          <ContentSpan>
            {price
              ? ` ${price.거래금액 ? price.거래금액.trim() : '-'}만원  ( ${price.층 || '-'}층, ${
                  price.전용면적 || '-'
                }㎡ )`
              : '-'}
          </ContentSpan>
        </FlexColomnDiv>
        <FlexDiv>
          <ContentWrap>
            <FlexColomnDiv>
              <TitleSpan>세대수</TitleSpan>
              <ContentSpan>
                {summary?.data?.summary?.units} / {summary?.data?.summary?.dong || '-'}
              </ContentSpan>
            </FlexColomnDiv>
          </ContentWrap>
          <ContentWrap>
            <FlexColomnDiv>
              <TitleSpan>층수</TitleSpan>
              <ContentSpan>
                {summary?.data?.summary?.floors} / {summary?.data?.summary?.total_floors || '-'}
              </ContentSpan>
            </FlexColomnDiv>
          </ContentWrap>
        </FlexDiv>
        <HrLine />
        <FlexColomnDiv>
          <TitleSpan>대환 / 말소대상</TitleSpan>
          <TitleSpan style={{ marginBottom: '10px' }}>[채권 최고액(원금) / 비례율(110%)]</TitleSpan>

          {mortgage.length > 0 &&
            mortgage.map((item: any, index) => {
              if (item.purpose === '임차권설정' || item.purpose === '근저당권설정') {
                return (
                  <FlexDiv
                    style={{ alignItems: 'end', marginBottom: '8px', paddingRight: '10%' }}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                  >
                    <FlexColomnDiv>
                      <FlexDiv style={{ justifyContent: 'flex-start', gap: '5px' }}>
                        {item.purpose === '임차권설정' ? (
                          <FileNameSpan style={{ fontSize: '13px', color: '#CCAC55' }}>
                            임차권
                          </FileNameSpan>
                        ) : (
                          <FileNameSpan style={{ fontSize: '13px' }}>근저당</FileNameSpan>
                        )}
                        <ContentSpan>{item.info.split(' ')[4]}</ContentSpan>
                      </FlexDiv>

                      {item.purpose === '임차권설정' ? (
                        <ContentSpan>
                          {Math.floor(
                            (item.info?.split(' ')[2]?.replace(/[^0-9]/g, '') ?? 0) / 10000,
                          )}
                          만원
                        </ContentSpan>
                      ) : (
                        <FlexDiv style={{ width: '250px', justifyContent: 'space-between' }}>
                          <ContentSpan>
                            {Math.floor(
                              (item.info?.split(' ')[2]?.replace(/[^0-9]/g, '') ?? 0) / 10000,
                            )}
                            만원 (
                            {Math.floor(
                              (item.info?.split(' ')[2]?.replace(/[^0-9]/g, '') ?? 0) / 1.1 / 10000,
                            )}
                            만원 )
                          </ContentSpan>
                          <ContentPercent>110%</ContentPercent>
                        </FlexDiv>
                      )}
                    </FlexColomnDiv>
                  </FlexDiv>
                );
              } else {
                return null;
              }
            })}
        </FlexColomnDiv>
        <HrLine />

        <FlexColomnDiv>
          <FlexColomnDiv>
            <TitleSpan>메모</TitleSpan>
            <ContentSpan>
              <textarea
                required
                style={{
                  width: '100%',
                  height: '100px',
                  fontSize: '13px',
                  resize: 'none',
                  border: 'none',
                  backgroundColor: '#F5F5F5',
                  padding: '15px',
                }}
                placeholder="메모사항을 입력하세요"
              />
            </ContentSpan>
          </FlexColomnDiv>
        </FlexColomnDiv>
      </FlexColomnWrap>
    </PraPropertyInfoWrap>
  );
};

export default PropertyInfo;

const ContentPercent = styled.div`
  color: #458af2;
  font-weight: bold;
  font-size: 12px;
`;
const HrLine = styled.div`
  border: 0.5px solid #dfdcdc7b;
`;
const FileNameSpan = styled.span`
  color: #1a237e;
  font-weight: bold;

  font-size: 12px;
`;

const FileNameDate = styled.span`
  color: #1a237e;
  font-weight: bold;
  font-size: 14px;
`;
const ContentWrap = styled.span`
  width: 100%;
`;
const ContentSpan = styled.span`
  font-size: 12px;
  font-weight: bold;
`;
const TitleSpan = styled.span`
  color: #8f8f8f;
  font-size: 12px;
  font-weight: 400;
`;
const FlexColomnWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FlexColomnDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PraPropertyInfoWrap = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0px 30px 30px 30px;
`;
