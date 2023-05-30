import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

interface LoadingBarProps {
  start: boolean;
  progress: number;
  type: '업로드' | '다운로드';
  width?: number;
}

const LoadingBar = ({
  start = false,
  progress = 0,
  type = '업로드',
  width = 400,
}: LoadingBarProps) => {
  const [internalProgress, setInternalProgress] = useState(0);
  useEffect(() => {
    if (start) {
      setInternalProgress(progress);
    } else {
      setInternalProgress(0);
    }
  }, [start, progress]);

  return (
    <LoadingBarWrap>
      <LoadingBarContainer width={width}>
        <ProgressBar progress={internalProgress} />
      </LoadingBarContainer>
      <div>{internalProgress}%</div>
      {type === '다운로드' && progress === 100 ? (
        <div>분석이 완료되었습니다.</div>
      ) : (
        <div>{type}중 입니다</div>
      )}
    </LoadingBarWrap>
  );
};

LoadingBar.defaultProps = {
  width: 400,
};
const LoadingBarWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const LoadingBarContainer = styled.div<{ width: number }>`
  background-color: #ffffff;
  border: 1px solid #1a237e;
  border-radius: 8px;
  width: ${({ width }) => `${width}px`};

  height: 10px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ progress: number }>`
  background-color: #1a237e;
  width: ${({ progress }) => `${progress}%`};
  height: 100%;
  transition: width 0.3s ease-in-out;
`;

export default LoadingBar;
