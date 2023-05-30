import React from 'react';
import { useParams } from 'react-router-dom';
import Table, { TableProps } from '@/components/common/Table';
import MOCK_DATA1 from '@/../mockupdb1.json';
import MOCK_DATA2 from '@/../mockupdb2.json';
import MOCK_DATA3 from '@/../mockupdb3.json';
import { COLUMNS } from '@/components/Table/EulTable/columns3';

type ExampleProps = {};

const Eultable2: React.FC<ExampleProps> = () => {
  const { id } = useParams();
  let rightsOtherThanOwnershipData = MOCK_DATA1.pdfupload.eul_info.rights_other_than_ownership;

  // 현재 id에 따라 목업 데이터 변경
  if (id === '1') {
    rightsOtherThanOwnershipData = MOCK_DATA1.pdfupload.eul_info.rights_other_than_ownership;
  } else if (id === '2') {
    rightsOtherThanOwnershipData = MOCK_DATA2.pdfupload.eul_info.rights_other_than_ownership;
  } else {
    rightsOtherThanOwnershipData = MOCK_DATA3.pdfupload.eul_info.rights_other_than_ownership;
  }

  const tableProps: TableProps = {
    tableData: rightsOtherThanOwnershipData,
    tableColumns: COLUMNS,
    maxHeight: '610px',
    disableScroll: false, // 스크롤 생김
    width: ['173px', '173px', '172px', '261px', '158px'],
  };

  return (
    <div>
      <Table {...tableProps} />
    </div>
  );
};

export default Eultable2;
