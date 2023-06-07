import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Map from '@/components/Map';
import FacilityTable from '@/components/Table/Location/FacilityLists';
import EstateAgentTable from '@/components/Table/Location/EstateAgentLists';
import { getResData } from '@/utils/getResData';

const Location = () => {
  const [newLat, setLat] = useState<number>(0);
  const [newLng, setLng] = useState<number>(0);
  const address = getResData('summary.newAddress');
  const link = `https://new.land.naver.com/complexes?ms=${newLat},${newLng},19`;

  // 주소 받으면 좌표로 변환해서 전역 상태로 저장
  useEffect(() => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setLat(result[0].y);
        setLng(result[0].x);
      }
    });
  }, [address]);

  return (
    <LocationContainer>
      <p>1. 지도/로드뷰</p>
      <Map newLat={newLat} newLng={newLng} />
      <p>
        2. 주변 시설<span>(담보물건 1km 이내에서 가장 가까운 장소를 표시합니다.)</span>
      </p>
      <FacilityTable newLat={newLat} newLng={newLng} />
      <p>3. 주변 부동산 정보</p>
      <EstateAgentTable newLat={newLat} newLng={newLng} />
      <a href={link} target="_blank" rel="noreferrer">
        네이버 부동산에서 더보기<span className="material-symbols-outlined">arrow_forward_ios</span>
      </a>
    </LocationContainer>
  );
};

export default Location;

const LocationContainer = styled.div`
  width: 100%;
  p {
    font-weight: bold;
    font-size: 14px;
    margin: 24px 0;
    span {
      font-size: 12px;
    }
    &:first-of-type {
      margin-top: 0;
    }
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    margin-top: 24px;
    font-weight: 700;
    font-size: 12px;
    color: #53a74a;
    border: 1px solid #4caf50;
    border-radius: 4px;
    span {
      margin-left: 10px;
      font-weight: 700;
      font-size: 12px;
    }
  }
`;
