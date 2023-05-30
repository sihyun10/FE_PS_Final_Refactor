import axios from 'axios';
import { KAKAO_API_KEY, KAKAO_API_URL } from '../utils/constants';

export const KakaoSearchApi = async (query: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${KAKAO_API_URL}?query=${query}`,
      headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
    });
    const { documents } = response.data; // SomeType은 실제 타입에 맞게 지정해야 합니다.

    return documents[0];
  } catch (error) {
    return null;
  }
};
