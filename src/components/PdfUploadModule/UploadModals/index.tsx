import { SetStateAction } from 'react';
import { CommonButton, CommonModal } from '../../common';
import { ModalContents, ModalTitle } from './style';
import LoadingBar from '../LoadingBar';

// 에러 모달 두개는 구조가 똑같으니까 컴포넌트로 추출해서 재사용함으로써 중복 코드 줄이기
interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}
const ErrorModal = ({ isOpen, onClose, title, message }: ErrorModalProps) => {
  return (
    <CommonModal isOpen={isOpen} onClose={onClose} width={440} height={270}>
      <ModalContents>
        <ModalTitle>{title}</ModalTitle>
        <div style={{ color: 'red' }}>{message}</div>
        <CommonButton width={200} height={50} type="button" onClick={onClose}>
          확인
        </CommonButton>
      </ModalContents>
    </CommonModal>
  );
};

interface ModalProps {
  isErorrModalOpen: boolean;
  isUploadErorrModalOpen: boolean;
  isModalOpen: boolean;
  isUploading: boolean;
  isUploadComplete: boolean;
  modalMessage: string;
  fileName: string;
  downloadProgress: number;
  uploadProgress: number;
  setErorrModalOpen: (value: SetStateAction<boolean>) => void;
  setUploadErorrModalOpen: (value: SetStateAction<boolean>) => void;
  setModalIsOpen: (value: SetStateAction<boolean>) => void;
  handleCancelUpload: () => void;
  ViewChange: () => void;
}

const UploadModals = ({
  isErorrModalOpen,
  isUploadErorrModalOpen,
  isModalOpen,
  isUploading,
  isUploadComplete,
  modalMessage,
  fileName,
  downloadProgress,
  uploadProgress,
  setErorrModalOpen,
  setUploadErorrModalOpen,
  setModalIsOpen,
  handleCancelUpload,
  ViewChange,
}: ModalProps) => (
  <>
    <ErrorModal
      isOpen={isErorrModalOpen}
      onClose={() => setErorrModalOpen(false)}
      title="파일 오류"
      message={modalMessage}
    />
    <ErrorModal
      isOpen={isUploadErorrModalOpen}
      onClose={() => setUploadErorrModalOpen(false)}
      title="업로드 오류"
      message="올바른 pdf파일이 아니거나 서버의 통신문제가 있습니다."
    />
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
        {/* 바뀌는 건 ModalTitle뿐이니까, 
        삼항연사자로 구조 전체를 바꾸는게 아니라 ModalTitle만 바뀌게 변경*/}

        {/* 그리고 인라인으로 스타일 설정한 div는 필요하지 않아서 삭제. 
        아마 타이틀이 두줄일때 수직으로 줄바꿈 처리를 하려고 한 것 같은데,
        이미 <br />태그로 줄바꿈을 처리했기 때문에
        column 방향으로 flex만 해주는 div는 필요가 없다. */}
        <ModalTitle>
          {isUploading ? (
            <>
              지금 등기부등본에서
              <br />
              주소 정보를 읽어오고 있습니다.
            </>
          ) : (
            '등기부 등본 분석이 완료되었습니다'
          )}
        </ModalTitle>

        <div>
          <div>{fileName}</div>
          <br />
          <LoadingBar
            type={isUploadComplete ? '다운로드' : '업로드'}
            progress={isUploadComplete ? downloadProgress : uploadProgress}
            start={isModalOpen}
          />
        </div>

        {/* 버튼 전체가 아니라 isUploading 상태에 따라 값이 변하는 부분만 삼항 연산자 처리
        대신 버튼의 width를 고정시킴 */}
        <CommonButton
          bgcolor={isUploading ? 'gray' : undefined}
          width={400}
          height={50}
          type="button"
          onClick={isUploading ? handleCancelUpload : ViewChange}
        >
          {isUploading ? '창닫기' : '상세내역 페이지로 이동'}
        </CommonButton>
      </ModalContents>
    </CommonModal>
  </>
);
export default UploadModals;
