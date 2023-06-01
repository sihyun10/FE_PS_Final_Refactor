import styled from '@emotion/styled';

export const MapContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 328px;
  #map {
    width: 50%;
    height: 100%;
  }
  #roadview {
    width: 50%;
  }

  #btnRoadview {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 138px;
    height: 45px;
    font-weight: 600;
    font-size: 16px;
    color: #9f9f9f;
    border: 1px solid #dbdbdb;
    background-color: #fff;
    border-radius: 5px;
    z-index: 2;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
    cursor: pointer;
    :hover {
      background-color: #eee;
    }
  }

  .placeinfo_wrap {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: -130px;
    bottom: 65px;
    border-radius: 4px;
    .place_title {
      width: 260px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      font-weight: 700;
      font-size: 15px;
      height: 40px;
      background-color: #458af2;
      padding: 10px;
      cursor: pointer;
      border: 1px solid #ddd;
      border-radius: 4px 4px 0px 0px;
    }
    .place_body {
      width: 260px;
      background-color: #fff;
      padding: 10px;
      border: 1px solid #ddd;
      border-width: 0 1px 1px 1px;
      border-radius: 0px 0px 4px 4px;
      .road_address {
        font-size: 13px;
      }
      .address {
        font-size: 12px;
        color: #8f8f8f;
        margin-bottom: 14px;
        margin-top: 7px;
      }
      .phone {
        font-size: 12px;
        color: #4caf50;
      }
    }
    .tooltip {
      width: 40px;
      height: 10px;
      border-top: 10px solid #ddd;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-bottom: 0px solid transparent;
    }
    .tooltip:after {
      content: '';
      position: absolute;
      border-top: 10px solid #fff;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-bottom: 0px solid transparent;
      bottom: 1px;
      left: 110px;
    }
  }
`;
