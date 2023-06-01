import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

interface positionProps {
  newLat: number;
  newLng: number;
}

const FacilityLists = ({ newLat, newLng }: positionProps) => {
  const [subway, setSubway] = useState<any>();
  const [park, setPark] = useState<any>();
  const [cinema, setCinema] = useState<any>();
  const [store, setStore] = useState<any>();
  const [mart, setMart] = useState<any>();
  const [elSchool, setElSchool] = useState<any>();
  const [mdSchool, setMdSchool] = useState<any>();
  const [hgSchool, setHgSchool] = useState<any>();
  const [college, setCollege] = useState<any>();

  useEffect(() => {
    // 장소 검색 객체를 생성
    const ps = new window.kakao.maps.services.Places();
    const centerLocation = new window.kakao.maps.LatLng(newLat, newLng); // 검색하는 중심 위치 설정

    // 지하철역 검색
    ps.categorySearch('SW8', placesSearchSW, {
      location: centerLocation,
      radius: 1000, // 검색 반경
      sort: window.kakao.maps.services.SortBy.DISTANCE, // 검색되는 리스트 정렬 기준을 거리 기준으로
    });
    function placesSearchSW(data: any, status: any) {
      const SwLists = []; // 검색될 리스트
      if (status === window.kakao.maps.services.Status.OK) {
        // 2개 까지만 검색해서
        for (let i = 0; i < 2; i += 1) {
          if (data[i] === undefined) break; // 데이터가 없으면 스톱.;
          SwLists.push(data[i]); // 리스트에 push해서
        }
        setSubway(SwLists); // 상태로 저장
      } else {
        setSubway(null); // 검색 결과 없으면 상태값 비우기
      }
    }

    // 공원 검색
    ps.keywordSearch('근린공원', placesSearchPK, {
      location: centerLocation,
      radius: 1000, // 검색 반경
      sort: window.kakao.maps.services.SortBy.DISTANCE, // 검색되는 리스트 정렬 기준을 거리 기준으로
    });
    function placesSearchPK(data: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        setPark(data[0]);
      } else {
        setPark(null);
      }
    }

    // 영화관 검색
    ps.keywordSearch('영화관', placesSearchCM, {
      location: centerLocation,
      radius: 1000, // 검색 반경
      sort: window.kakao.maps.services.SortBy.DISTANCE, // 검색되는 리스트 정렬 기준을 거리 기준으로
    });
    function placesSearchCM(data: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        setCinema(data[0]);
      } else {
        setCinema(null);
      }
    }

    // 백화점 검색
    ps.keywordSearch('백화점', placesSearchST, {
      location: centerLocation,
      radius: 1000, // 검색 반경
      sort: window.kakao.maps.services.SortBy.DISTANCE, // 검색되는 리스트 정렬 기준을 거리 기준으로
    });
    function placesSearchST(data: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        setStore(data[0]);
      } else {
        setStore(null);
      }
    }

    // 대형마트 검색
    ps.categorySearch('MT1', placesSearchMT, {
      location: centerLocation,
      radius: 1000, // 검색 반경
      sort: window.kakao.maps.services.SortBy.DISTANCE, // 검색되는 리스트 정렬 기준을 거리 기준으로
    });
    function placesSearchMT(data: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        setMart(data[0]);
      } else {
        setMart(null);
      }
    }

    // 학교 리스트 검색
    ps.categorySearch('SC4', placesSearchSC, {
      location: centerLocation,
      radius: 1000, // 검색 반경
      sort: window.kakao.maps.services.SortBy.DISTANCE, // 검색되는 리스트 정렬 기준을 거리 기준으로
    });
    function placesSearchSC(data: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const elSchoolList = data.find((list: any) => list.category_name.includes('초등학교'));
        const mdSchoolList = data.find((list: any) => list.category_name.includes('중학교'));
        const hgSchoolList = data.find((list: any) => list.category_name.includes('고등학교'));
        const collegeList = data.find((list: any) => list.category_name.includes('대학교'));
        setElSchool(elSchoolList);
        setMdSchool(mdSchoolList);
        setHgSchool(hgSchoolList);
        setCollege(collegeList);
      } else {
        setElSchool(null);
        setMdSchool(null);
        setHgSchool(null);
        setCollege(null);
      }
    }
  }, [newLat]);

  return (
    <FacilityListsWrapper>
      <FacilityListsTable>
        <thead>
          <tr>
            <th>종류</th>
            <th>이름</th>
            <th>거리</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>지하철</td>
            <td>{subway?.length > 0 ? subway[0].place_name : '-'}</td>
            <td>{subway?.length > 0 ? `${subway[0].distance}m` : '-'}</td>
          </tr>
          <tr>
            <td>지하철</td>
            <td>{subway?.length > 1 ? subway[1].place_name : '-'}</td>
            <td>{subway?.length > 1 ? `${subway[1].distance}m` : '-'}</td>
          </tr>
          <tr>
            <td>공원</td>
            <td>{park ? park.place_name : '-'}</td>
            <td>{park ? `${park.distance}m` : '-'}</td>
          </tr>
          <tr>
            <td>영화관</td>
            <td>{cinema ? cinema.place_name : '-'}</td>
            <td>{cinema ? `${cinema.distance}m` : '-'}</td>
          </tr>
          <tr>
            <td>백화점</td>
            <td>{store ? store.place_name : '-'}</td>
            <td>{store ? `${store.distance}m` : '-'}</td>
          </tr>
        </tbody>
      </FacilityListsTable>{' '}
      <FacilityListsTable>
        <thead>
          <tr>
            <th>종류</th>
            <th>이름</th>
            <th>거리</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>대형마트</td>
            <td>{mart ? mart.place_name : '-'}</td>
            <td>{mart ? `${mart.distance}m` : '-'}</td>
          </tr>
          <tr>
            <td>초등학교</td>
            <td>{elSchool ? elSchool.place_name : '-'}</td>
            <td>{elSchool ? `${elSchool.distance}m` : '-'}</td>
          </tr>
          <tr>
            <td>중학교</td>
            <td>{mdSchool ? mdSchool.place_name : '-'}</td>
            <td>{mdSchool ? `${mdSchool.distance}m` : '-'}</td>
          </tr>
          <tr>
            <td>고등학교</td>
            <td>{hgSchool ? hgSchool.place_name : '-'}</td>
            <td>{hgSchool ? `${hgSchool.distance}m` : '-'}</td>
          </tr>
          <tr>
            <td>대학교</td>
            <td>{college ? college.place_name : '-'}</td>
            <td>{college ? `${college.distance}m` : '-'}</td>
          </tr>
        </tbody>
      </FacilityListsTable>
    </FacilityListsWrapper>
  );
};

export default FacilityLists;

const FacilityListsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FacilityListsTable = styled.table`
  width: 464px;
  border-top: 1px solid #bdbdbd;
  border-bottom: 1px solid #bdbdbd;
  font-size: 12px;
  th,
  td {
    text-align: center;
    padding: 10px 0;
  }
  td:first-of-type,
  td:last-of-type {
    width: 102px;
  }
  thead {
    background-color: #eee;
    border-bottom: 1px solid #bdbdbd;
  }
  tbody {
    tr:nth-of-type(even) {
      background-color: #f3f4fa;
    }
  }
`;
