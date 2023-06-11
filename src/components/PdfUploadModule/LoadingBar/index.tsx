import React, { useEffect, useState } from 'react';
import { LoadingBarContainer, LoadingBarWrapper, ProgressBar } from './style';

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
    <LoadingBarContainer>
      <LoadingBarWrapper width={width}>
        <ProgressBar progress={internalProgress} />
      </LoadingBarWrapper>
      <div>{internalProgress}%</div>
      {type === '다운로드' && progress === 100 ? (
        <div>분석이 완료되었습니다.</div>
      ) : (
        <div>{type}중 입니다</div>
      )}
    </LoadingBarContainer>
  );
};

LoadingBar.defaultProps = {
  width: 400,
};

export default LoadingBar;
