import { MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useStepStore } from '@/store/store';
import { RecentHistoryContainer } from './style';
import { useDataStore } from '@/store/DataStore';

const RecentHistoryItem = ({ idNum, fileName }: { idNum: number; fileName: string }) => {
  const { setStep } = useStepStore();

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('삭제');
  };
  return (
    <NavLink
      to={`pra/${idNum}/pdfsummary`}
      className="recentHistoryItem"
      onClick={() => {
        setStep(2);
      }}
    >
      <span>{fileName}</span>
      <button type="button" onClick={handleDelete}>
        X
      </button>
    </NavLink>
  );
};

const RecentHistory = () => {
  const { responseItems } = useDataStore();

  return (
    <RecentHistoryContainer>
      <p>최근 조회내역</p>
      <p>등기부 파일명으로 표시됩니다</p>
      {responseItems.map((item) => (
        <RecentHistoryItem key={item.id} idNum={item.id} fileName={item.filename} />
      ))}
    </RecentHistoryContainer>
  );
};

export default RecentHistory;
