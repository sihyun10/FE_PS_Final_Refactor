import styled from '@emotion/styled';

export const PreparingPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  width: 100%;
  height: 100%;
  p {
    text-align: center;
  }
  .mainTitle {
    font-weight: 700;
    font-size: 64px;
    line-height: 88px;
    color: #333;
    margin-bottom: 18px;
  }
  .subTitle {
    font-weight: 400;
    font-size: 20px;
    line-height: 38px;
    color: #616161;
  }
`;

export const SubscribeFormContainer = styled.div`
  margin-top: 35px;
  padding: 30px 58px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: #fdfdfd;
  p {
    font-weight: 300;
    font-size: 14px;
    color: #333;
    margin-bottom: 20px;
  }
  input {
    width: 260px;
    height: 40px;
    padding: 0 15px;
    background-color: #d9d9d9;
    border: 0;
    font-size: 16px;
    color: #616161;
    border-radius: 4px;
    outline: none;
  }
  button {
    width: 112px;
    height: 40px;
    margin-left: 12px;
    font-weight: 700;
    font-size: 16px;
    color: #fff;
    background-color: #1a237e;
    border: 0;
    border-radius: 4px;
  }
`;
