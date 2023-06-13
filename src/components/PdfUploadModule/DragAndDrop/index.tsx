import { ChangeEvent, DragEvent, FunctionComponent, ReactNode, useState } from 'react';
import { DragContainer } from './style';

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
  };

  const dragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const dragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
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
