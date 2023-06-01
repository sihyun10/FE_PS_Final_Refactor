import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/named
import axios, { AxiosProgressEvent, CancelTokenSource } from 'axios';
import { instance } from '../../api/UploadApi';
import DragAndDrop from './DragAndDrop';
import PDfLogo from '../../assets/Pdf/PdfLogo.svg';
import { CommonButton, CommonModal } from '../common';
import SpinnerButton from './SpinnerButton';
import LoadingBar from './LoadingBar';
import CancelButton from './CancelButton';
import UplodPDFStyles from './style/UploadPDFStyles';
import { useDataStore } from '../../store/DataStore';
import ApartData from '@/api/ApartDataApi';

const UplodPDF = () => {
  const [PDFfile, setPDFfile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [labelWidth, setLabelWidth] = useState<number>(120);

  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isErorrModalOpen, setErorrModalOpen] = useState(false);
  const [UploadErorrModalOpen, setUploadErorrModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(null);
  const [dataStoreId, setDataStoreId] = useState(0);
  const { addResponseItem } = useDataStore();
  const navigate = useNavigate();

  // 파일 사이즈 할당 mb단위로 ex 30m
  const MAX_FILE_SIZE = 100;

  // 초기화
  const resetFileState = (): void => {
    setPDFfile(null);
    setFileName('');
    setLabelWidth(120);
  };

  // 바이트 메가바이트 변환
  const calculateMaxFileSize = (sizeInMB: number): number => {
    return sizeInMB * 1024 * 1024;
  };
  // pdf 크기 검증
  const isFileSizeValid = (file: File | null): boolean => {
    return !!file && file.size <= calculateMaxFileSize(MAX_FILE_SIZE);
  };
  // 인풋에 파일을 넣었을 경우 조건 PDF파일이여야 한다
  const isPdfFileType = (file: File | null): boolean => {
    const allowedMimeTypes = ['application/pdf'];
    return !!file && allowedMimeTypes.includes(file.type);
  };

  // 파일명이 30글자를 초과하면 해당글 줄여서 ... 확장자표시
  const truncateFileName = (file: File | null): string => {
    if (!file) return '';

    if (file.name.length > 30) {
      return `${file.name.substring(0, 20)}...${file.name.slice(-3)}`;
    } else {
      return file.name;
    }
  };
  // 폼데이타에 집어넣기 서버와 통신하기 위함 인코딩
  const createFormData = (file: File): FormData => {
    const formData = new FormData();
    formData.append('multipartFile', file, file.name);
    return formData;
  };

  // 인풋태그에 파일이 변경되었을때 체크
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    // 100m 초과하는지 , pdf파일이 맞는지 아니라면 리턴 둘중하나라도 false 값일경우
    if (!isPdfFileType(file) || !isFileSizeValid(file)) {
      ErrorModal(!isPdfFileType(file), !isFileSizeValid(file));
      resetFileState();
      event.target.value = '';

      return;
    }
    // css 에 보여지는 부분 가로사이즈 증가 , 변경된 파일이름
    const updatedFileName = truncateFileName(file);
    const updatedLabelWidth = updatedFileName.length * 12;
    setFileName(updatedFileName);
    setPDFfile(file);
    setLabelWidth(updatedLabelWidth);
    event.target.value = '';
  };
  // 파일 업로드 부분
  const onFileUpload = async () => {
    if (!PDFfile) {
      setErorrModalOpen(true);
      return;
    }
    // 버튼 잠금

    const formData = createFormData(PDFfile);
    if (!formData) {
      console.log('FormData 생성에 실패했습니다.');
      setIsUploading(false);
      return;
    }
    // 폼데이타 생성이후 모달 표시 초기값 false
    setModalIsOpen(true);
    setIsUploading(true);
    setDownloadProgress(0);
    try {
      // 서버 요청
      const response = await uploadFileToServer(formData);

      if (response) {
        const customData = await ApartData(response.data.summary.newAddress);
        if (customData) {
          const lastId = addResponseItem(fileName, { ...response.data, customData });
          setDataStoreId(lastId);
        } else {
          const lastId = addResponseItem(fileName, { ...response.data });
          setDataStoreId(lastId);
        }
      }
      setDownloadProgress(100);
    } catch (error) {
      setDownloadProgress(0);
      console.error('파일 업로드 실패:', error);
      UploadErrorModal();
    } finally {
      // 다시 업로드 가능하도록 버튼잠금 해제 및 모달 끄기
      setIsUploading(false);
    }
  };
  // 업로드 로딩바 완료시 시간지연

  // 서버 전송 하기위한 비동기 처리

  const uploadFileToServer = async (formData: FormData): Promise<any> => {
    try {
      const source = axios.CancelToken.source(); // 요청을 취소할 때 사용할 CancelTokenSource를 생성합니다.
      setCancelToken(source); // 상태로 설정
      const response = await instance.post('api/pdfupload', formData, {
        cancelToken: source.token,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.loaded && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        },
        onDownloadProgress: (progressEvent?: AxiosProgressEvent) => {
          if (progressEvent?.loaded && progressEvent?.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setDownloadProgress(progress);
          }
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        setIsUploadComplete(false);
        setUploadProgress(0);
        console.log('사용자 취소 실패:', error.message);
      } else {
        setIsUploadComplete(false);
        setUploadProgress(0);
        console.log('통신 실패:');
        setModalIsOpen(false);

        ErrorModal(false, false);
      }
    }
  };

  useEffect(() => {
    let timer: number;
    if (uploadProgress === 100) {
      timer = setTimeout(() => {
        setIsUploadComplete(true);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [uploadProgress]);

  const handleCancelUpload = () => {
    setIsUploadComplete(false);
    setUploadProgress(0);
    console.log(uploadProgress);

    if (cancelToken) {
      cancelToken.cancel('사용자 취소 요청.');
      setCancelToken(null);
      setIsUploading(false);
      setModalIsOpen(false);
    }
  };

  // pdf 파일 선택 취소 시 초기화
  const handledDeletePDFfile = (): void => {
    resetFileState();
  };
  // 이동
  const ViewChange = () => {
    navigate(`/review/${dataStoreId}/pdfsummary`);
  };

  const ErrorModal = (PdfType: boolean, PdfSize: boolean) => {
    if (PdfType) {
      setModalMessage('파일이 pdf 파일이 아닙니다.');
      setErorrModalOpen(true);
      return;
    }
    if (PdfSize) {
      setModalMessage(`파일 사이즈가 ${MAX_FILE_SIZE}MB 보다 큽니다.`);
      setErorrModalOpen(true);
      return;
    }
    setModalMessage('파일이 잘못되었거나, 알 수 없는 오류가 발생했습니다.');
    setErorrModalOpen(true);
  };

  const UploadErrorModal = () => {
    setModalIsOpen(false); // 업로드 실패시
    setUploadErorrModalOpen(true); // 업로드 실패시
  };

  return (
    <UploadContainer>
      <CommonModal
        isOpen={isErorrModalOpen}
        onClose={() => {
          setErorrModalOpen(false);
        }}
        width={440}
        height={270}
      >
        <ModalContents>
          <HeaderTitle>파일 오류 </HeaderTitle>
          <div style={{ color: 'red' }}>{modalMessage}</div>
          <CommonButton
            width={200}
            height={50}
            type="button"
            onClick={() => {
              setErorrModalOpen(false);
            }}
          >
            확인
          </CommonButton>
        </ModalContents>
      </CommonModal>

      <CommonModal
        isOpen={UploadErorrModalOpen}
        onClose={() => {
          setUploadErorrModalOpen(false);
        }}
        width={440}
        height={270}
      >
        <ModalContents>
          <HeaderTitle>업로드 오류 </HeaderTitle>
          <div style={{ color: 'red' }}>올바른 pdf파일이 아니거나 서버의 통신문제가 있습니다.</div>
          <CommonButton
            width={200}
            height={50}
            type="button"
            onClick={() => {
              setUploadErorrModalOpen(false);
            }}
          >
            확인
          </CommonButton>
        </ModalContents>
      </CommonModal>

      <CommonModal
        isOpen={isModalOpen}
        onClose={() => {
          handleCancelUpload();
          setModalIsOpen(false);
        }}
        width={550}
        height={420}
        lockBackground
      >
        <ModalContents>
          <div>
            {isUploading ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <HeaderTitle>
                  지금 등기부등본에서
                  <br />
                  주소 정보를 읽어오고 있습니다.
                </HeaderTitle>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <HeaderTitle>등기부 등본 분석이 완료되었습니다</HeaderTitle>
              </div>
            )}
          </div>
          <div>
            <div>{fileName}</div>
            <br />
            {isUploadComplete ? (
              <LoadingBar type="다운로드" progress={downloadProgress} start={isModalOpen} />
            ) : (
              <LoadingBar type="업로드" progress={uploadProgress} start={isModalOpen} />
            )}
          </div>
          {isUploading ? (
            <CommonButton
              color="gray"
              width={250}
              height={50}
              type="button"
              onClick={handleCancelUpload}
            >
              창닫기
            </CommonButton>
          ) : (
            <CommonButton width={400} height={50} type="button" onClick={ViewChange}>
              상세내역 페이지로 이동
            </CommonButton>
          )}
        </ModalContents>
      </CommonModal>

      <UploadHeader>
        <HeaderTitle>등기부등본 파일 첨부</HeaderTitle>
        <Subtitle>
          {`*단일 PDF(${MAX_FILE_SIZE}MB 이하)만 업로드 가능합니다.`}
          <br />
          또한, 요약본 포함 등기부 파일만 심사진행이 가능합니다.
        </Subtitle>
      </UploadHeader>
      <UploadContent>
        <DragAndDrop handleInputFile={onFileChange}>
          <DropZone fileName={fileName}>
            <div style={{ height: '35px' }}>{!fileName && <PDFLogoImg src={PDfLogo} />}</div>
            <FileSelectionWrapper>
              <FileInputLabel labelWidth={labelWidth} selected={Boolean(fileName)}>
                <input type="file" onChange={onFileChange} disabled={isUploading} />
                <FileNameSpan>{fileName || '파일선택'}</FileNameSpan>
              </FileInputLabel>
              {!fileName || (
                <>
                  <SpinnerButton isUploading={isUploading} filename={fileName} />
                  <CancelButton onClick={handledDeletePDFfile} disabled={isUploading} />
                </>
              )}
            </FileSelectionWrapper>

            {!fileName ? (
              <DropTitle>또는 여기로 파일을 끌어주세요.</DropTitle>
            ) : (
              <UploadButtonWrapper>
                <CommonButton height={40} onClick={onFileUpload} disabled={isUploading}>
                  업로드
                </CommonButton>
              </UploadButtonWrapper>
            )}
          </DropZone>
        </DragAndDrop>
      </UploadContent>
    </UploadContainer>
  );
};

export default UplodPDF;

const {
  UploadContainer,
  UploadHeader,
  HeaderTitle,
  Subtitle,
  UploadContent,
  DropZone,
  FileInputLabel,
  FileNameSpan,
  DropTitle,
  PDFLogoImg,
  ModalContents,
  FileSelectionWrapper,
  UploadButtonWrapper,
} = UplodPDFStyles;
