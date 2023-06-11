import styled from '@emotion/styled';

export const LoadingBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const LoadingBarWrapper = styled.div<{ width: number }>`
  background-color: #ffffff;
  border: 1px solid #1a237e;
  border-radius: 8px;
  width: ${({ width }) => `${width}px`};

  height: 10px;
  overflow: hidden;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  background-color: #1a237e;
  width: ${({ progress }) => `${progress}%`};
  height: 100%;
  transition: width 0.3s ease-in-out;
`;
