import React from 'react';
import styled from '@emotion/styled';
import PraPropertyInfo from '../../components/Pdf/PropertyInfo';
import { PrimaryButton } from '@/components/common';

const PraDetail = () => {
  return (
    <PraContainer>
      <PraDetailWrap>
        <FlexDiv>
          <TitleHeader>담보물건 요약</TitleHeader>
          <PrimaryButton
            onClick={() => {
              alert('클릭하셧습니다');
            }}
            style={{ fontSize: '10px', border: 'none' }}
            width={100}
            height={24}
            color="#CCAC55"
          >
            매물 요약 저장하기
          </PrimaryButton>
        </FlexDiv>
        <PraPropertyInfo />
      </PraDetailWrap>
    </PraContainer>
  );
};

export default PraDetail;

const PraContainer = styled.div`
  padding: 32px;
  display: flex;
`;
const FlexDiv = styled.div`
  background-color: white;
  align-items: center;
  width: 100%;
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;
const TitleHeader = styled.span`
  display: flex;
  font-size: 14px;
  font-weight: bold;
  place-content: center;
  color: #ccac55;
`;

const PraDetailWrap = styled.div`
  border: 0.5px solid #c9c9c9;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
`;
