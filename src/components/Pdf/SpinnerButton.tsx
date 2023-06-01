import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import checkmark from '../../assets/Pdf/checkmark.svg';

interface Props {
  isUploading: boolean;
  filename?: string;
  duration?: number; // 몇초동안 돌것인지
}

const SpinnerButton: React.FC<Props> = ({ isUploading, filename, duration }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const simulateCompletion = () => {
    setIsCompleted(false);

    setTimeout(() => {
      setIsCompleted(true);
    }, duration);
  };

  useEffect(() => {
    if (filename) {
      simulateCompletion();
    }
  }, [filename]);

  return (
    <SpinnerContainer isCompleted={isCompleted}>
      {!isCompleted ? <StyledSpinner isUploading={isUploading} /> : null}
    </SpinnerContainer>
  );
};

SpinnerButton.defaultProps = {
  filename: '',
  duration: 1000, // 디폴트 값 1 초
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div<{ isUploading: boolean }>`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
  animation-play-state: ${({ isUploading }) => (isUploading ? 'running' : 'running')};
`;

const SpinnerContainer = styled.div<{ isCompleted: boolean }>`
  background-color: ${({ isCompleted }) => (isCompleted ? 'transparent' : 'red')};
  ${({ isCompleted }) =>
    isCompleted &&
    `
      background-image: url(${checkmark});
      background-position: center;
      background-size: cover;
    `}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: relative;
`;

export default SpinnerButton;
