import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/named
import axios, { AxiosProgressEvent, CancelTokenSource } from 'axios';
import { instance } from '../../api/UploadApi';
import DragAndDrop from './DragAndDrop';
import { UploadContainer, HeaderTitle, Subtitle } from './style';
import { useDataStore } from '../../store/DataStore';
import ApartData from '@/api/ApartDataApi';
import UploadModals from './UploadModals';
import FileSelectInput from './FileSelectInput';

const PdfUploadModule = () => {
  const [PDFfile, setPDFfile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [labelWidth, setLabelWidth] = useState<number>(120);

  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isErorrModalOpen, setErorrModalOpen] = useState(false);
  const [isUploadErorrModalOpen, setUploadErorrModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(null);
  const [dataStoreId, setDataStoreId] = useState(0);
  const { addResponseItem } = useDataStore();
  const navigate = useNavigate();

  // 파일 사이즈 할당 mb단위.
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

  // 업로드 로딩바 완료시 시간지연
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
      <UploadModals
        isErorrModalOpen={isErorrModalOpen}
        isUploadErorrModalOpen={isUploadErorrModalOpen}
        isModalOpen={isModalOpen}
        isUploading={isUploading}
        isUploadComplete={isUploadComplete}
        modalMessage={modalMessage}
        fileName={fileName}
        downloadProgress={downloadProgress}
        uploadProgress={uploadProgress}
        setErorrModalOpen={setErorrModalOpen}
        setUploadErorrModalOpen={setUploadErorrModalOpen}
        setModalIsOpen={setModalIsOpen}
        handleCancelUpload={handleCancelUpload}
        ViewChange={ViewChange}
      />
      <HeaderTitle>등기부등본 파일 첨부</HeaderTitle>
      <Subtitle>
        {`*단일 PDF(${MAX_FILE_SIZE}MB 이하)만 업로드 가능합니다.`}
        <br />
        또한, 요약본 포함 등기부 파일만 심사진행이 가능합니다.
      </Subtitle>

      <DragAndDrop handleInputFile={onFileChange}>
        <FileSelectInput
          fileName={fileName}
          labelWidth={labelWidth}
          isUploading={isUploading}
          onFileChange={onFileChange}
          onFileUpload={onFileUpload}
          resetFileState={resetFileState}
        />
      </DragAndDrop>
    </UploadContainer>
  );
};

export default PdfUploadModule;
