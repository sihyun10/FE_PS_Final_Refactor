import create from 'zustand';
import { persist } from 'zustand/middleware';

// 사용예시 아이디값으로 데이타 불러오기
// const { responseItems } = useDataStore();
// const selectedItem = responseItems.find((item) => item.id === parsedId);
// 데이타 삭제시
// const { removeResponseItem } = useDataStore();
// removeResponseItem(id);

//  아이디 값 , 파일네임값 , json 응답데이타
interface ResponseItem {
  id: number;
  filename: string;
  data: string;
}
// 배열형태로 전역저장
interface DataStoreState {
  responseItems: ResponseItem[];
  addResponseItem: (filename: string, data: string) => number;
  removeResponseItem: (id: number) => void;
}

export const useDataStore = create<DataStoreState>()(
  // 세션에 저장하기위해 persist
  persist(
    (set, get) => ({
      responseItems: [],
      addResponseItem: (filename: string, data: string) => {
        const currentResponseItems = get().responseItems;
        const newId =
          currentResponseItems.length > 0
            ? currentResponseItems[currentResponseItems.length - 1].id + 1
            : 1;
        const newItem = { id: newId, filename, data };
        set((state: DataStoreState) => {
          return { responseItems: [...state.responseItems, newItem] };
        });
        // 새로 추가된 아이템의 id 반환
        return newId;
      },
      // 파일 삭제 아이디값을 받음
      removeResponseItem: (id: number) =>
        set((state: DataStoreState) => {
          const newResponseItems = state.responseItems.filter((item) => item.id !== id);
          return { responseItems: newResponseItems };
        }),
    }),
    {
      // 세션 스토리지 이름
      name: 'moreturn-response-storage',
      getStorage: () => sessionStorage,
    },
  ),
);
