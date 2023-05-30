ApartDataApi : 국토교통부 아파트 정보를 가져오는 api
카카오APi 에 의존하기에 해당 부분 참고하여 가공



KakaoSearchAPi : 카카오 api 주소검색을 위한 api 해당 주소지를 받고
주소지의 법정동 코드 및 기타 주소정보가 추출됨



UploadAPi : pdf upload 통신을 위한 axios 인스턴스
기능은 통신실패시 반복기능 , 사용자취소 , 기타 등등의 이유로 캔슬토큰으로
axios 통신을 중단시킬수있는 기능 포함


## ApartData 컴포넌트

### 소개

이 컴포넌트는 국토교통부 아파트 정보를 가져오기 위해 사용되는 API와 카카오 API를 활용하여 주소 정보를 추출하는 기능을 제공합니다. 또한 PDF 업로드를 위한 Axios 인스턴스를 사용하여 통신 기능을 제공합니다.

### 속성 (Props)

| 속성 이름 | 타입   | 설명      |
| --------- | ------ | --------- |
| address   | string | 주소 정보 |

### 함수

#### `getPastDates(years: number): string[]`

조회 날짜를 기준으로 `n`년 전의 날짜 배열을 반환합니다.

#### `fetchData(lawCityNumber: string, yyyymm: string, pageNo = 1): Promise<any[]>`

아파트 정보를 조회하는 함수입니다. 주어진 법정동 코드와 날짜로 조회하며, 페이지 번호를 지정할 수 있습니다. 최대 페이지 수가 49이므로 1페이지를 초과할 경우에는 페이지를 넘어가서 조회합니다. 조회 결과를 Promise로 반환합니다.

#### `ApartData(address: string): Promise<{ filterDATA: { [key: string]: any }, originalDATA: { [key: string]: any } }>`

아파트 데이터를 가져오는 함수입니다. 주소 정보를 입력받아 카카오 API를 사용하여 법정동 코드 및 기타 주소 정보를 추출한 후, 조회를 위해 `fetchData` 함수를 호출합니다. 최근 1년간의 아파트 정보를 조회하며, 조회된 데이터를 `filterDATA`와 `originalDATA`로 구분하여 반환합니다.


## KakaoSearchApi 컴포넌트

### 소개

KakaoSearchApi는 주소 검색을 위한 API입니다.

### 함수

| 함수 이름        | 매개변수        | 반환 값 타입 | 설명                                           |
| ---------------- | --------------- | ------------ | ---------------------------------------------- |
| `KakaoSearchApi` | `query: string` | Promise<any> | 입력된 쿼리를 기반으로 주소 정보를 검색합니다. |


## UploadApi 컴포넌트

### 소개

UploadApi는 PDF 업로드를 위한 Axios 인스턴스입니다.

### 함수

#### `createAxiosInstance(): AxiosInstance`

Axios 인스턴스를 생성하고 설정을 구성하여 반환합니다.

#### `handleRetry(error: any): Promise<any>`

요청 실패 시 재시도를 처리하는 로직을 구현한 함수입니다.

#### `setupResponseInterceptor(instance: AxiosInstance): void`

Axios 인스턴스에 응답 인터셉터를 설정하는 함수입니다.

#### `cancelTokenSource(): CancelTokenSource`

취소 토큰을 생성하여 반환하는 함수입니다.