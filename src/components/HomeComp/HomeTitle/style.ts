import styled from '@emotion/styled';

interface FontProps {
  color?: string;
  size?: string;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  lineHeight?: string;
  align?: string;
}

export const HomeTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 85px;
  .mainTitle {
    margin-bottom: 40px;
  }
  .secondaryTheme {
    color: #ccac55;
  }
`;

export const Title = styled.span<FontProps>`
  font-weight: ${(props) => props.weight || 400};
  font-size: ${(props) => props.size || '16px'};
  color: ${(props) => props.color || '#000'};
  line-height: ${(props) => props.lineHeight};
  text-align: ${(props) => props.align};
`;
