import { useNavigate } from 'react-router-dom';
import { HomeLayout, HomeTitleContainer, Title } from './style';
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
      <CommonButton
        size={24}
        weight={700}
        width={306}
        height={80}
        onClick={() => navigate('upload')}
      >
        심사 시작하기
      </CommonButton>
    </HomeLayout>
  );
};

export default Home;
