import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { CommonButton } from '@/components/common';

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <img src={logo} alt="logo" />
      <HomeTitleContainer>
        <Title className="mainTitle">
          담보 부동산 심사를
          <p className="secondaryTheme">한 곳에서 간편하게</p>
        </Title>
        <Title className="subTitle">
          담보물 탐색, 등기부등본 검토, 심사 중인 서류 내역 관리까지
          <br />
          등기부등본 업로드 한번으로 간편한 대출 심사 프로세스를 경험해보세요.
        </Title>
      </HomeTitleContainer>
      <CommonButton size={24} weight={700} width={306} height={80} onClick={() => navigate('pra')}>
        심사 시작하기
      </CommonButton>
    </HomeLayout>
  );
};

export default Home;

const HomeLayout = styled.div`
  background: linear-gradient(180deg, #e8eaf6 0%, rgba(255, 255, 255, 0) 100%);
  background-size: auto 555px;
  background-repeat: no-repeat;
  min-height: calc(100vh - 250px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;
  img {
    width: 80px;
    height: 50px;
    margin-bottom: 40px;
  }
`;

const HomeTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 85px;
`;

const Title = styled.span`
  text-align: center;
  &.mainTitle {
    margin-bottom: 40px;
    font-weight: 700;
    font-size: 80px;
    color: #333333;
    line-height: 100px;
    .secondaryTheme {
      color: #ccac55;
    }
  }
  &.subTitle {
    font-weight: 400;
    font-size: 18px;
    color: #5c5c5c;
    line-height: 25px;
  }
`;
