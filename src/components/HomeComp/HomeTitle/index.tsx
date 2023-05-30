import { HomeTitleContainer, Title } from './style';

const HomeTitle = () => {
  return (
    <HomeTitleContainer>
      <Title
        className="mainTitle"
        weight={700}
        size="80px"
        lineHeight="100px"
        align="center"
        color="#333333"
      >
        담보 부동산 심사를
        <p className="secondaryTheme">한 곳에서 간편하게</p>
      </Title>
      <Title
        className="subTitle"
        weight={400}
        size="18px"
        lineHeight="25px"
        align="center"
        color="#5C5C5C"
      >
        담보물 탐색, 등기부등본 검토, 심사 중인 서류 내역 관리까지
        <br />
        등기부등본 업로드 한번으로 간편한 대출 심사 프로세스를 경험해보세요.
      </Title>
    </HomeTitleContainer>
  );
};

export default HomeTitle;
