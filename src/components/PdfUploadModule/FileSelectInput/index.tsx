import { ChangeEvent } from 'react';
import { CommonButton } from '../../common';
import SpinnerButton from '../Buttons/SpinnerButton';
import CancelButton from '../Buttons/CancelButton';
import PDfLogo from '@/assets/PdfLogo.svg';
import {
  FileInputLabel,
  FileNameSpan,
  DropTitle,
  PDFLogoImg,
  FileSelectionWrapper,
  UploadButtonWrapper,
} from './style';

interface FileSelectProps {
  fileName: string;
  labelWidth: number;
  isUploading: boolean;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileUpload: () => void;
  resetFileState: () => void;
}

const FileSelectInput = ({
  fileName,
  labelWidth,
  isUploading,
  onFileChange,
  onFileUpload,
  resetFileState,
}: FileSelectProps) => (
  <>
    <div style={{ height: '35px' }}>{!fileName && <PDFLogoImg src={PDfLogo} />}</div>
    <FileSelectionWrapper>
      <FileInputLabel labelWidth={labelWidth} selected={Boolean(fileName)}>
        <input type="file" onChange={onFileChange} accept=".pdf" />
        <FileNameSpan>{fileName || '파일선택'}</FileNameSpan>
      </FileInputLabel>
      {!fileName || <SpinnerButton isUploading={isUploading} filename={fileName} />}
      {!fileName || <CancelButton onClick={resetFileState} />}
    </FileSelectionWrapper>
    {!fileName ? (
      <DropTitle>또는 여기로 파일을 끌어주세요.</DropTitle>
    ) : (
      <UploadButtonWrapper>
        <CommonButton height={40} onClick={onFileUpload}>
          업로드
        </CommonButton>
      </UploadButtonWrapper>
    )}
  </>
);
export default FileSelectInput;
