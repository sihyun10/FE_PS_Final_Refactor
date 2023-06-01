import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStepStore } from '@/store/store';
import { TitleWrapper } from './style';

const Title = () => {
  const { step } = useStepStore();
  const location = useLocation();
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    switch (true) {
      case location.pathname.includes('myreviews'):
        setTitle('내 심사관리');
        break;
      case location.pathname.includes('upload') || location.pathname.includes('review'):
        setTitle('심사하기');
        break;
      default:
        setTitle('');
        break;
    }
  }, [location]);

  return (
    <TitleWrapper>
      <p>{title}</p>
      {step === 2 ? (
        <div>
          <button type="button">PDF로 저장하기</button>
          <button type="button">심사 종료하기</button>
        </div>
      ) : null}
    </TitleWrapper>
  );
};

export default Title;
