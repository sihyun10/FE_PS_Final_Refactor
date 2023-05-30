import styled from '@emotion/styled';

export const TitleWrapper = styled.div`
  grid-area: b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 40px;
  background-color: #f1efe8;
  p {
    height: 40px;
    font-weight: 700;
    font-size: 16px;
    line-height: 40px;
    color: #1a237e;
  }
  div {
    display: flex;
    button {
      display: block;
      width: 130px;
      height: 30px;
      background: blue;
      font-weight: 600;
      font-size: 12px;
      border-radius: 4px;
      background-color: #1a237e;
      color: #fff;
      border: 0;
    }
    button:last-of-type {
      background-color: #8f8f8f;
      color: #fff;
      margin-left: 10px;
    }
  }
`;
