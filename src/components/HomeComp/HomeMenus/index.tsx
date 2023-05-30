import { Link } from 'react-router-dom';
import { HomeMenusContainer } from './style';

const HomeMenus = () => {
  return (
    <HomeMenusContainer>
      <Link to="pra" className="homeMain">
        심사 시작하기
      </Link>
    </HomeMenusContainer>
  );
};

export default HomeMenus;
