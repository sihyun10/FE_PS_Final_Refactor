/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-this-in-sfc */
import { useEffect, useState } from 'react';
import { MapContainer } from './style';
import centerMarker from '@/assets/centerMarker.png';

declare global {
  interface Window {
    kakao: any;
  }
}

interface positionProps {
  newLat: number;
  newLng: number;
}

const Map = ({ newLat, newLng }: positionProps) => {
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const mapCenter = new window.kakao.maps.LatLng(newLat, newLng);

  useEffect(() => {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div

    // 지도 옵션 설정
    const mapOption = {
      center: mapCenter, // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    // 지도를 생성
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    setKakaoMap(map); // 지도 객체를 state 저장
  }, []);

  useEffect(() => {
    if (kakaoMap !== null) {
      kakaoMap.relayout(); // 지도 객체를 다시 레이아웃
      kakaoMap.setCenter(mapCenter); // 지도 중심 변경
      kakaoMap.setLevel(3); // 지도 확대 레벨 3으로 조정

      // 맵 위에 로드뷰 도로 오버레이
      kakaoMap.addOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);

      // 마커 이미지로 사용할 이미지 세팅
      const markerImage = new window.kakao.maps.MarkerImage(
        centerMarker,
        new window.kakao.maps.Size(90, 87), // 중앙 마커만 살짝 크게 조정
      );

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: mapCenter,
        image: markerImage, // 이미지 파일을 마커로 적용
      });
      // 마커를 지도 위에 표시
      marker.setMap(kakaoMap);

      const rvContainer = document.getElementById('roadview'); // 로드뷰를 표시할 div 입니다

      // 로드뷰 생성
      const roadview = new window.kakao.maps.Roadview(rvContainer);

      // 좌표로부터 로드뷰 파노라마 ID를 가져올 로드뷰 클라이언트 객체를 생성
      const roadviewClient = new window.kakao.maps.RoadviewClient();

      // 전달받은 좌표에 가까운 로드뷰의 파노라마 ID를 추출하여 로드뷰 설정하는 함수
      const toggleRoadview = (position: any) => {
        roadviewClient.getNearestPanoId(position, 300, (panoId: any) => {
          roadview.setPanoId(panoId, position); // 근접한 로드뷰 실행
        });
      };
      toggleRoadview(kakaoMap.getCenter());

      // 로드뷰 핀  이미지를 생성
      const roadviewPinImg = new window.kakao.maps.MarkerImage(
        'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png',
        new window.kakao.maps.Size(26, 46),
        {
          // 스프라이트 이미지를 사용
          // 스프라이트 이미지 전체의 크기를 지정하고
          spriteSize: new window.kakao.maps.Size(1666, 168),
          // 사용하고 싶은 영역의 좌상단 좌표를 입력합니다.
          // background-position으로 지정하는 값이며 부호는 반대입니다.
          spriteOrigin: new window.kakao.maps.Point(705, 114),
          offset: new window.kakao.maps.Point(13, 46),
        },
      );

      // 로드뷰 핀을 생성
      const roadviewPin = new window.kakao.maps.Marker({
        image: roadviewPinImg,
        position: mapCenter,
        draggable: true,
      });

      // 로드뷰 핀에 dragend 이벤트 할당
      window.kakao.maps.event.addListener(roadviewPin, 'dragend', () => {
        const position = roadviewPin.getPosition(); // 현재 마커가 놓인 자리의 좌표
        toggleRoadview(position); // 로드뷰를 토글
      });

      // 로드 시작할 때 작동하는 이벤트 할당
      window.kakao.maps.event.addListener(roadview, 'init', () => {
        // 로드뷰에 특정 장소를 표시할 마커를 생성하고 로드뷰 위에 표시
        const rvMarker = new window.kakao.maps.Marker({
          position: mapCenter,
          map: roadview,
          image: markerImage,
        });
        rvMarker.setRange(500);

        // 로드뷰의 기본 뷰포인트가 마커쪽을 향하도록 세팅
        const projection = roadview.getProjection();
        const viewpoint = projection.viewpointFromCoords(
          rvMarker.getPosition(),
          rvMarker.getAltitude(),
        );
        roadview.setViewpoint(viewpoint);
      });

      // 로드 중앙이 바뀔 때 작동하는 이벤트 할당
      window.kakao.maps.event.addListener(roadview, 'position_changed', () => {
        // 현재 로드뷰의 위치로 로드뷰 핀 옮기기
        const rvPosition = roadview.getPosition(); // 현재 로드뷰의 위치 값 받아오기
        kakaoMap.setCenter(rvPosition); // 지도의 중앙을 현재 로드뷰의 위치
        // 로드뷰 핀 위치를 현재 로드뷰 위치로 설정
        roadviewPin.setMap(kakaoMap);
        roadviewPin.setPosition(rvPosition);
      });
    }
  }, [mapCenter]);

  return (
    <div>
      <MapContainer id="container">
        <div id="map" />
        <div id="roadview" />
      </MapContainer>
    </div>
  );
};

export default Map;
