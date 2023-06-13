import styled from '@emotion/styled';

export const DragContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 170px;
  font-weight: bold;
  margin-top: 10px;
  /* padding: 10px; */
  &.active {
    border: 2px dotted blue;
    background-color: rgb(225, 229, 255);
  }
  &.inactive {
    border: 2px dotted #ccc;
  }
`;
