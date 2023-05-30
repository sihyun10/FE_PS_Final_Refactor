import styled from '@emotion/styled';

interface BoxProps {
  width?: string;
  height?: string;
  color?: string;
}

const RadiusBox = styled.div<BoxProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.color};
  border-radius: 20px;
  padding: 40px;
`;

export default RadiusBox;
