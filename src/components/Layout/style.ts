import styled from '@emotion/styled';

export const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 370px 502px auto;
  grid-template-rows: 64px auto;
  grid-template-areas:
    'a b b'
    'a c d'
    'a c d';
  overflow-y: hidden;

  .combineSection {
    grid-column: 2/ -1;
    grid-row: 2/ -1;
  }

  /* 1920 미만 */
  @media (max-width: 1919px) {
    grid-template-columns: 250px 502px auto;
  }
`;

export const SummarySection = styled.div`
  grid-area: c;
  width: 100%;
  height: calc(100vh - 64px);
  background-color: #fdfdfd;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #bfbfbf;
      border-radius: 4px;
    }
  }
`;

export const MainSection = styled.main`
  grid-area: d;
  width: 100%;
  .praDetail {
    position: relative;
    padding: 40px 70px 40px 30px;
    overflow-y: auto;
    height: calc(100vh - 100px);
    &::-webkit-scrollbar {
      width: 6px;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: #bfbfbf;
        border-radius: 4px;
      }
    }
  }
`;

export const TabMenus = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #bdbdbd;
  margin-right: 40px;
  a {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 36px;
    font-size: 12px;
    color: #7d7d7d;
    &:hover {
      font-weight: 700;
      color: #1a237e;
    }
    &.active {
      font-weight: 700;
      color: #1a237e;
      &:after {
        position: absolute;
        content: '';
        width: inherit;
        display: block;
        border-bottom: 2px solid #1a237e;
        bottom: -1px;
        left: 0;
      }
    }
  }
`;
