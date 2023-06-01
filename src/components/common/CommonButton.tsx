import styled from '@emotion/styled';

interface ButtonProps {
  size?: number;
  weight?: number;
  width?: number;
  height?: number;
  bgcolor?: string;
  hvBgcolor?: string;
  color?: string;
  hvColor?: string;
}

const CommonButton = styled.button<ButtonProps>`
  border: 0.3px solid #8e8e8e;
  border-radius: 4px;
  font-size: ${({ size }) => (size ? `${size}px` : '16px')};
  font-weight: ${({ weight }) => weight || 400};
  width: ${({ width }) => (width ? `${width}px` : '125px')};
  height: ${({ height }) => (height ? `${height}px` : '150px')};
  cursor: pointer;
  background-color: ${({ bgcolor }) => bgcolor || '#1a237e'};
  color: ${({ color }) => color || '#f5f5f5'};

  &:hover {
    background-color: ${({ hvBgcolor }) => hvBgcolor || 'gray'};
    color: ${({ hvColor }) => hvColor || '#fff'};
  }
`;

export default CommonButton;
