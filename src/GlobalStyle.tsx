import { css, Global } from '@emotion/react';
import reset from 'emotion-reset';

const style = css`
  ${reset}
  *, *::after, *::before {
    box-sizing: border-box;
    @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
        format('woff');
    }
    font-family: 'Pretendard-Regular';
  }
  html {
    font-family: 'Pretendard-Regular';
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    cursor: pointer;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
