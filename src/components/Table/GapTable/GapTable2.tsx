import React from 'react';
import { useParams } from 'react-router-dom';
import Table, { TableProps } from '@/components/common/Table';
import MOCK_DATA1 from '@/../mockupdb1.json';
import MOCK_DATA2 from '@/../mockupdb2.json';
import MOCK_DATA3 from '@/../mockupdb3.json';
import { COLUMNS } from '@/components/Table/GapTable/columns1';

type ExampleProps = {};

const Gaptable2: React.FC<ExampleProps> = () => {
  const { id } = useParams();
  let ownerShipHistoryData = MOCK_DATA1.pdfupload.gap_info.ownership_history;

  // 현재 id에 따라 목업 데이터 변경
  if (id === '1') {
    ownerShipHistoryData = MOCK_DATA1.pdfupload.gap_info.ownership_history;
  } else if (id === '2') {
    ownerShipHistoryData = MOCK_DATA2.pdfupload.gap_info.ownership_history;
  } else {
    ownerShipHistoryData = MOCK_DATA3.pdfupload.gap_info.ownership_history;
  }

  const tableProps: TableProps = {
    tableData: ownerShipHistoryData,
    tableColumns: COLUMNS,
    maxHeight: '10000px',
    disableScroll: true, // 스크롤 없음
    width: ['120px', '180px', '116px', '135px', '377px'],
  };

  return (
    <div>
      <Table {...tableProps} />
    </div>
  );
};

export default Gaptable2;
