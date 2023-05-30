import styled from '@emotion/styled';

const CancelButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: #868686;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;

  &::before,
  &::after {
    content: '';
    display: inline-block;
    width: 60%;
    height: 3px;
    background-color: white;
    position: absolute;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

export default CancelButton;
