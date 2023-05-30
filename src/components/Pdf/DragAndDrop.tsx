import React, { ChangeEvent, DragEvent, FunctionComponent, ReactNode, useState } from 'react';
import styled from '@emotion/styled';

interface DragAndDropProps {
  handleInputFile: (e: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}

const DragAndDrop: FunctionComponent<DragAndDropProps> = ({ handleInputFile, children }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDropFiles = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newEvent: any = { target: { files: e.dataTransfer.files } };
    handleInputFile(newEvent);
    setIsDragging(false);
    setIsDragging(false);
  };

  const dragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const dragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setIsDragging(true);
  };

  return (
    <DragContainer
      className={isDragging ? 'DragandDrop active' : 'DragandDrop inactive'}
      onDrop={onDropFiles}
      onDragOver={dragOver}
      onDragLeave={dragLeave}
    >
      {isDragging ? '업로드할 파일을 여기에 끌어다 주세요' : children}
    </DragContainer>
  );
};

export default DragAndDrop;

const DragContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 170px;
  font-weight: bold;
  padding: 10px;
  &.active {
    border: 2px dotted blue;
    background-color: rgb(225, 229, 255);
  }
  &.inactive {
    border: 2px dotted #ccc;
    background-color: transparent;
  }
`;
