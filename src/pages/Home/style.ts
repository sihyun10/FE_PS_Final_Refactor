import styled from '@emotion/styled';

export const HomeLayout = styled.div`
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

export const HomeTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 85px;
`;

export const Title = styled.span`
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
