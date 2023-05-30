import { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { PrimaryModal } from '@/components/common';

const MyReviews = () => {
  const [mail, setMail] = useState<string>('');
  const [opened, setOpened] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mail.trim() === '') {
      setMessage('이메일을 제대로 기입하였는지 확인해 주세요.');
      setOpened(true);
      return;
    } else {
      axios
        .post('https://www.mollyteam.shop/presubscribe', {
          email: mail,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            setMessage('신청이 완료되었습니다.');
            setOpened(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setMessage('오류가 발생했습니다. 다시 시도해 주세요.');
          setOpened(true);
        });
    }

    setMail('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  };

  return (
    <PreparingPage>
      <PrimaryModal
        isOpen={opened}
        onClose={() => {
          setOpened(false);
        }}
        width={420}
        height={120}
      >
        {message}
      </PrimaryModal>
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
    </PreparingPage>
  );
};

export default MyReviews;

const PreparingPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  width: 100%;
  height: 100%;
  p {
    text-align: center;
  }
  .mainTitle {
    font-weight: 700;
    font-size: 64px;
    line-height: 88px;
    color: #333;
    margin-bottom: 18px;
  }
  .subTitle {
    font-weight: 400;
    font-size: 20px;
    line-height: 38px;
    color: #616161;
  }
`;

const SubscribeFormContainer = styled.div`
  margin-top: 35px;
  padding: 30px 58px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: #fdfdfd;
  p {
    font-weight: 300;
    font-size: 14px;
    color: #333;
    margin-bottom: 20px;
  }
  input {
    width: 260px;
    height: 40px;
    padding: 0 15px;
    background-color: #d9d9d9;
    border: 0;
    font-size: 16px;
    color: #616161;
    border-radius: 4px;
    outline: none;
  }
  button {
    width: 112px;
    height: 40px;
    margin-left: 12px;
    font-weight: 700;
    font-size: 16px;
    color: #fff;
    background-color: #1a237e;
    border: 0;
    border-radius: 4px;
  }
`;
