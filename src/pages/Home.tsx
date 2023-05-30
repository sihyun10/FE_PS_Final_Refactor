import styled from '@emotion/styled';
import logo from '@/assets/logo.png';
import { HomeMenus, HomeTitle } from '@/components/HomeComp';

const Home = () => {
  return (
    <HomeLayout>
      <img src={logo} alt="logo" />
      <HomeTitle />
      <HomeMenus />
    </HomeLayout>
  );
};

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

export default Home;
