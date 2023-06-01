import styled from '@emotion/styled';

interface CommonButtonProps {
  width?: number;
  height?: number;
  color?: string;
}

const CommonButton = styled.button<CommonButtonProps>`
  border: 0.3px solid #8e8e8e;
  border-radius: 4px;
  font-size: 16px;
  width: ${({ width }) => (width ? `${width}px` : '125px')};
  height: ${({ height }) => (height ? `${height}px` : '150px')};
  cursor: pointer;
  background-color: ${({ color }) => color || '#1a237e'};
  color: #f5f5f5;

  &:hover {
    background-color: gray;
    color: #ffffff;
  }
`;

export default CommonButton;
