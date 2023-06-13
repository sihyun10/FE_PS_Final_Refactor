import styled from '@emotion/styled';

export const PDFLogoImg = styled.img`
  width: 32px;
  height: 32px;
`;

export const FileSelectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

export const FileInputLabel = styled.label<{ labelWidth: number; selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ labelWidth }) => labelWidth}px;
  max-width: 100%;
  height: 40px;
  font-weight: bold;
  background-color: ${({ selected }) => (selected ? 'none' : '#1a237e')};
  color: ${({ selected }) => (selected ? '#291717' : 'white')};
  border-radius: ${({ selected }) => (selected ? '30px' : '4px')};
  letter-spacing: 1px;
  border: 0.5px solid #8e8e8e;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    font-weight: bold;
    background-color: #fcfcfc;
    border: 1px solid #8e8e8e;
    color: #0e0e0e;
  }
  & input[type='file'] {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  transition: width 0.2s ease-in-out;
`;

export const FileNameSpan = styled.span`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  &.typing {
    max-width: 0;
    animation: typing 0.7s steps(40, end) forwards;
    border-right: 2px solid #000;
  }
  @keyframes typing {
    from {
      max-width: 0;
    }
    to {
      max-width: 100%;
    }
  }
`;

export const DropTitle = styled.div`
  margin-top: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #000000;
`;

export const UploadButtonWrapper = styled.div`
  margin: 15px 0;
  position: relative;
`;
