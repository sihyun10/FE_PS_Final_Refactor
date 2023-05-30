import { Column } from 'react-table';
import { useState, useEffect } from 'react';
import Table, { TableProps } from '../common/Table';

interface positionProps {
  newLat: number;
  newLng: number;
}

const EstateAgentLists = ({ newLat, newLng }: positionProps) => {
  const [agentLists, setAgentLists] = useState<any>();

  useEffect(() => {
    // 장소 검색 객체를 생성
    const ps = new window.kakao.maps.services.Places();
    const centerLocation = new window.kakao.maps.LatLng(newLat, newLng); // 검색하는 중심 위치 설정

    // 카테고리로 부동산 리스트 검색
    ps.categorySearch('AG2', searchAG2, {
      location: centerLocation,
      radius: 1000, // 검색 반경
      sort: window.kakao.maps.services.SortBy.DISTANCE, // 검색되는 리스트 정렬 기준을 거리 기준으로
    });

    // 부동산 리스트 검색 시 호출되는 콜백함수
    function searchAG2(data: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        setAgentLists(data); // 상태로 저장
      } else {
        setAgentLists(null); // 검색 결과 없으면 상태값 비우기
      }
    }
  }, [newLat]);

  const COLUMNS: Column<{
    place_name: string;
    distance: string;
    address_name: string;
    phone: string;
  }>[] = [
    {
      Header: '공인중개사명',
      accessor: 'place_name',
    },
    {
      Header: '거리',
      accessor: (data) => `${data.distance}m`,
    },
    {
      Header: '주소',
      accessor: 'address_name',
    },
    {
      Header: '전화번호',
      accessor: 'phone',
    },
  ];

  const tableProps: TableProps = {
    tableData: agentLists,
    tableColumns: COLUMNS,
    maxHeight: '230px',
    disableScroll: false,
    width: ['240px', '200px', '320px', '180px'],
  };

  return <div>{agentLists ? <Table {...tableProps} /> : null}</div>;
};

export default EstateAgentLists;
