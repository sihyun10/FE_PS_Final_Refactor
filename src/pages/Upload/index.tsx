import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  PageHeader,
  Title,
  Subtitle,
  HelpLinks,
  HelpTitle,
  HelpBox,
  HelpSub,
  NextIcon,
} from './style';
import PdfUploadModule from '../../components/PdfUploadModule';
import nextIcon from '../../assets/nextIcon.svg';
// PRA는 Property Report Analysis의 약자로, 부동산 등기부등본 분석 및 평가를 의미하는 용어입니다.
const Upload = () => {
  return (
    <Container>
      <PageHeader>
        <Title>심사하기</Title>
        <Subtitle>심사를 진행하실 등기부등본 파일을 업로드 해주세요.</Subtitle>
      </PageHeader>

      {/* 업로드기능 */}
      <PdfUploadModule />
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
