import axios from 'axios';
import { KakaoSearchApi } from './KakaoSearchApi';

// 조회날자 기준 n년전
const getPastDates = (years: number) => {
  const pastDates = [];
  const currentDate = new Date();
  // pastDate를 years 변수로 받은 만큼 n년전 과거로 설정함.
  const pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() - years);

  // pastDate가 currentDate보다 과거인 날짜~현재까지 반복.
  while (pastDate <= currentDate) {
    const year = pastDate.getFullYear();
    const month = pastDate.getMonth() + 1;
    pastDates.push(year.toString() + month.toString().padStart(2, '0'));
    pastDate.setMonth(pastDate.getMonth() + 1);
  }

  return pastDates;
};

// 페이지마다 데이터 행의 최대갯수가 49인 관계로 1페이지를 초과하게되면 페이지를 넘어가서 조회를해야함
const fetchData = async (lawCityNumber: string, yyyymm: string, pageNo = 1): Promise<any[]> => {
  // const serviceKey =
  //   'J7KH6Ppo1yX4MSbd9yNXaeWvjo%2FcWuqKWSdnLBFFU1cnHfwPa1Ym4Ecc4ZtjUA0R0%2FNK%2FxdcZBZEbrKcwUQq0g%3D%3D';
  // let queryParams = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=${serviceKey}`;
  // queryParams += `&pageNo=${pageNo}`;
  // queryParams += `&numOfRows=49`;
  // queryParams += `&LAWD_CD=${lawCityNumber}`;
  // queryParams += `&DEAL_YMD=${yyyymm}`;

  const proxyReqDTO = {
    pageNo,
    numOfRows: 49,
    lawdCd: lawCityNumber, // 법정동코드
    dealYmd: yyyymm,
  };

  try {
    // 프록시 구현으로 해당 조회주소는 백앤드에서 관리
    const response = await axios.post('https://www.mollyteam.shop/api/proxy', proxyReqDTO);

    const responseData = response.data.response.body.items.item;
    const { totalCount } = response.data.response.body;
    // console.log(response);

    // totalCount가 총 페이지 갯수인거 같음. 총 데이터 행이 49개를 넘으면 다음 페이지로,
    if (totalCount > pageNo * 49) {
      // 다음 페이지를 추가로 fetch해서 nextPageItems으로.
      const nextPageItems = await fetchData(lawCityNumber, yyyymm, pageNo + 1);
      // 그리고 nextPageItems를 responseData에 합치기.
      return responseData.concat(nextPageItems);
    }
    return responseData;
  } catch (error) {
    console.error('백앤드 요청 실패:', error);
    throw error;
  }
};

// const ApartData = (adress: string) => {
//   // 카카오 법정동코드 추출
//   // console.log(adress);
//   return KakaoSearchApi(adress).then((documents) => {
//     if (documents !== null) {
//       // 현재날자를 기준으로 몇년전 날자를 조회할것인지 월단위로 배열에 넣어줌
//       const pastDates = getPastDates(1);

//       const Bcode = documents.address.b_code;
//       const lawCityNumber = Bcode.slice(0, 5);
//       // Bcode의 5부터 10 전까지 문자열을 파싱해서 숫자로 바꿈. 이때, 10진수로 바꿈.
//       // 원래는 10진수가 아닌가 보네?
//       const lawSectionNumber = parseInt(Bcode.slice(5, 10), 10);
//       const roadNumber = documents.road_address.main_building_no.padStart(5, '0');

//       const results: { [key: string]: any } = { filterDATA: {}, originalDATA: {} };

//       return Promise.all(
//         pastDates.map((yyyymm) => {
//           return fetchData(lawCityNumber, yyyymm)
//             .then((responseData) => {
//               const filteredData = responseData.filter(
//                 (item: any) =>
//                   item.도로명건물본번호코드 === roadNumber &&
//                   item.법정동읍면동코드 === lawSectionNumber,
//               );
//               if (filteredData.length > 0) {
//                 results.filterDATA[yyyymm] = filteredData;
//               }
//               return null; // 반환 값으로 null을 명시적으로 반환
//             })
//             .catch((error) => {
//               console.log(error);

//               return null; // 반환 값으로 null을 명시적으로 반환
//             });
//         }),
//       ).then(() => results);
//     }
//   });
// };

const ApartData = async (address: string) => {
  const documents = await KakaoSearchApi(address);

  if (documents !== null) {
    const pastDates = getPastDates(1);
    const Bcode = documents.address.b_code;
    const lawCityNumber = Bcode.slice(0, 5);
    const lawSectionNumber = parseInt(Bcode.slice(5, 10), 10);
    const roadNumber = documents.road_address.main_building_no.padStart(5, '0');
    const results: { [key: string]: any } = { filterDATA: {}, originalDATA: {} };

    await Promise.all(
      pastDates.map(async (yyyymm) => {
        try {
          const responseData = await fetchData(lawCityNumber, yyyymm);
          const filteredData = responseData.filter(
            (item: any) =>
              item.도로명건물본번호코드 === roadNumber &&
              item.법정동읍면동코드 === lawSectionNumber,
          );

          if (filteredData.length > 0) {
            results.filterDATA[yyyymm] = filteredData;
          }
        } catch (error) {
          console.log(error);
        }
      }),
    );

    return results;
  }
};

export default ApartData;
