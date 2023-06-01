import { useNavigate } from 'react-router-dom';
import { NotFoundContainer } from './style';
import notFoundIcon from '@/assets/NotFount_icon.png';
import logo from '@/assets/logo.png';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <NotFoundContainer>
      <img className="logo" src={logo} alt="logo" />
      <img className="alertIcon" src={notFoundIcon} alt="alert_icon" />
      <p className="mainTitle">
        요청하신 페이지를
        <br />
        찾을 수 없습니다.
      </p>
      <p className="subTitle">
        페이지의 주소가 잘못 입력되었거나, 변경 혹은 삭제되어
        <br />
        요청하신 페이지를 찾을 수 없습니다.
      </p>
      <div className="btnWrapper">
        <button className="tobackBtn" type="button" onClick={() => navigate(-1)}>
          이전 페이지로<span className="material-symbols-outlined arrow">chevron_right</span>
        </button>
        <button className="tohomeBtn" type="button" onClick={() => navigate('/')}>
          홈으로 돌아가기<span className="material-symbols-outlined arrow">chevron_right</span>
        </button>
      </div>
    </NotFoundContainer>
  );
};

export default NotFound;
