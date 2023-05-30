import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import notFoundIcon from '@/assets/NotFount_icon.png';
import logo from '@/assets/logo.png';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <NFContainer>
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
    </NFContainer>
  );
};

export default NotFound;

const NFContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo {
    width: 80px;
    height: 50px;
    position: fixed;
    top: 50px;
    left: 50px;
  }
  .alertIcon {
    width: 82px;
    margin-bottom: 28px;
  }
  p {
    text-align: center;
  }
  .mainTitle {
    font-weight: 700;
    font-size: 64px;
    line-height: 80px;
    color: #333;
    margin-bottom: 30px;
  }
  .subTitle {
    font-weight: 400;
    font-size: 20px;
    line-height: 29px;
    color: #616161;
    margin-bottom: 64px;
  }
  .btnWrapper {
    display: flex;
  }
  button {
    width: 250px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 24px;
    color: #fff;
    border: 0;
    border-radius: 4px;
    &.tobackBtn {
      background-color: #bdbdbd;
      margin-right: 10px;
    }
    &.tohomeBtn {
      background-color: #1a237e;
    }
  }
`;
