import { useParams } from 'react-router-dom';
import { useDataStore } from '@/store/DataStore';

export const getResData = (data: string) => {
  const { id } = useParams();
  const { responseItems } = useDataStore();

  if (!id) {
    return null;
  }

  // id를 string에서 number로 전환
  const parsedId: number = +id;

  // 전역 상태의 responseItems에서 현재 id와 일치하는 item을 선택
  const currentItem: any = responseItems.find((item) => item.id === parsedId);
  if (currentItem) {
    const datapath = data.split('.').reduce((obj, key) => obj?.[key], currentItem.data);
    const responseData = datapath;
    return responseData;
  }
};
