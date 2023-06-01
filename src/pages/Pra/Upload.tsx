import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import UploadPDF from '../../components/Pdf/UploadPDF';
import nextIcon from '../../assets/Pdf/nextIcon.svg';
// PRA는 Property Report Analysis의 약자로, 부동산 등기부등본 분석 및 평가를 의미하는 용어입니다.
const Upload = () => {
  return (
    <Container>
      <PageHeader>
        <Title>심사하기</Title>
        <Subtitle>심사를 진행하실 등기부등본 파일을 업로드 해주세요.</Subtitle>
      </PageHeader>

      {/* 업로드기능 */}
      <UploadPDF />
      <HelpLinks>
        <HelpTitle>등기부등본이 없으신가요?</HelpTitle>
        <a href="https://www.iros.go.kr/pos1/jsp/help2/jsp/001001001002.jsp">
          <HelpBox>
            <HelpSub>
              등기부등본 발급 바로가기 <NextIcon alt="nextIcon" src={nextIcon} />
            </HelpSub>
            <div>등기부등본을 발급받을 수 있는 사이트로 이동</div>
          </HelpBox>
        </a>
      </HelpLinks>
    </Container>
  );
};

export default Upload;

const NextIcon = styled.img`
  width: auto;
  height: auto;
`;

const HelpSub = styled.span`
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`;

const HelpBox = styled.div`
  border: 1px solid #d2d2dc;
  width: 100%;
  height: 90px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding-left: 30px;
  border-radius: 5px;
`;

const HelpTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const HelpLinks = styled.span`
  display: flex;
  flex-direction: column;
  margin-top: 65px;
  margin-bottom: 65px;

  width: 684px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  align-items: center;
  margin-top: 56px;
  margin-right: 250px;
`;

const PageHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const Title = styled.span`
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  color: #000000;
`;

const Subtitle = styled.p`
  color: #8f8f8f;
  font-size: 22px;
  margin-top: 32px;
`;
