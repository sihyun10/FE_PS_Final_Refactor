import React from 'react';
import { useParams } from 'react-router-dom';
import Table, { TableProps } from '@/components/common/Table';
import MOCK_DATA1 from '@/../mockupdb1.json';
import MOCK_DATA2 from '@/../mockupdb2.json';
import MOCK_DATA3 from '@/../mockupdb3.json';
import { COLUMNS } from '@/components/Table/GapTable/columns';

type ExampleProps = {};

const GapTable1: React.FC<ExampleProps> = () => {
  const { id } = useParams();
  let recentRegistrationData = MOCK_DATA1.pdfupload.gap_info.recent_registration;

  // 현재 id에 따라 목업 데이터 변경
  if (id === '1') {
    recentRegistrationData = MOCK_DATA1.pdfupload.gap_info.recent_registration;
  } else if (id === '2') {
    recentRegistrationData = MOCK_DATA2.pdfupload.gap_info.recent_registration;
  } else {
    recentRegistrationData = MOCK_DATA3.pdfupload.gap_info.recent_registration;
  }

  const tableProps: TableProps = {
    tableData: recentRegistrationData,
    tableColumns: COLUMNS,
    maxHeight: '200px',
    disableScroll: true,
    width: ['120px', '180px', '116px', '135px', '377px'],
  };

  return (
    <div>
      <Table {...tableProps} />
    </div>
  );
};

export default GapTable1;
