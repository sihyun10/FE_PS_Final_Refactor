import { useState } from 'react';
import { MyReviewsContainer, SubscribeFormContainer } from './style';
import axios from 'axios';
import { CommonModal } from '@/components/common';

const MyReviews = () => {
  const [mail, setMail] = useState<string>('');
  const [opened, setOpened] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mail.trim() === '') {
      setMessage('이메일을 제대로 기입하였는지 확인해 주세요.');
      setOpened(true);
      return;
    } else {
      try {
        const response = await axios.post('https://www.mollyteam.shop/presubscribe', {
          email: mail,
        });
        if (response.data.code === 200) {
          setMessage('신청이 완료되었습니다.');
          setOpened(true);
        }
      } catch (error) {
        setMessage('오류가 발생했습니다. 다시 시도해 주세요.');
        setOpened(true);
      }
    }

    setMail('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  };

  return (
    <MyReviewsContainer>
      <CommonModal
        isOpen={opened}
        onClose={() => {
          setOpened(false);
        }}
        width={420}
        height={120}
      >
        {message}
      </CommonModal>
      <p className="mainTitle">
        내 심사관리 서비스가
        <br />곧 출시됩니다.
      </p>
      <p className="subTitle">
        담보물 탐색, 등기부등본 검토, 심사 중인 서류 내역 관리까지
        <br />
        등기부등본 업로드 한번으로 간편한 대출 심사 프로세스를 경험해보세요.
      </p>
      <SubscribeFormContainer>
        <p>지금 사전 등록하고, 서비스 출시 일정을 이메일로 안내받으시겠어요?</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailInput">
            <input type="email" value={mail} onChange={handleChange} />
          </label>
          <button type="submit">등록</button>
        </form>
      </SubscribeFormContainer>
    </MyReviewsContainer>
  );
};

export default MyReviews;
