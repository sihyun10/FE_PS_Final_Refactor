import styled from '@emotion/styled';

export const SidebarContainer = styled.aside`
  grid-area: a;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  z-index: 9;
  overflow-x: hidden;
  overflow-y: auto;
  .logo {
    width: 80px;
    height: 50px;
    margin-top: 40px;
  }
`;

export const SidebarMenus = styled.div`
  margin-top: 48px;
  width: inherit;
  .mainmenu {
    display: flex;
    align-items: center;
    height: 76px;
    padding: 0 40px;
    font-weight: 500;
    font-size: 16px;
    color: #616161;
    &:hover {
      font-weight: 700;
      background-color: #f6f5ef;
      color: #1a237e;
    }
    &.active {
      font-weight: 700;
      background-color: #f6f5ef;
      color: #1a237e;
      border-right: 4px solid #ccac55;
    }
  }
`;

export const Submenus = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #8f8f8f;
  padding: 0 40px;
  .submenu {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    padding: 15px 0;
    .submenuIcon {
      margin-right: 8px;
    }
    &.active {
      font-weight: 700;
      color: #1a237e;
    }
  }
  &.hide {
    display: none;
  }

  /* 1920 미만 */
  @media (max-width: 1919px) {
    padding: 0 10px;
  }
`;

export const RecentHistoryContainer = styled.div`
  margin-top: 40px;
  width: 100%;
  padding: 0 26px;
  p {
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;
    color: #1a237e;
    &:last-of-type {
      font-weight: 500;
      font-size: 11px;
      color: #8f8f8f;
    }
  }
  .recentHistoryItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 10px 0;
    padding: 16px 13px 19px 20px;
    background-color: #fdfdfd;
    border: 1px solid #e8eaf6;
    border-radius: 4px;
    span {
      font-weight: 400;
      font-size: 12px;
      line-height: 140%;
      color: #8f8f8f;
      word-break: break-all;
      margin-right: 8px;
    }
    button {
      border: 0;
      background: transparent;
      color: #616161;
      &:hover {
        font-weight: 700;
        color: #000;
        background: #ddd;
        border-radius: 100%;
      }
    }
  }
`;

export const MenuBadge = styled.span`
  padding: 7px;
  font-weight: 700;
  font-size: 11px;
  border-radius: 8px;
  &.dark {
    margin-left: 80px;
    color: #fff;
    background-color: #1a237e;
  }
  &.light {
    margin-left: 5px;
    color: #1a237e;
    background-color: #f3f4fa;
  }

  /* 1920 미만 */
  @media (max-width: 1919px) {
    &.dark {
      margin-left: 10px;
    }
  }
`;
