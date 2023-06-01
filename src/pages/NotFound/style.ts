import styled from '@emotion/styled';

export const NotFoundContainer = styled.div`
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
