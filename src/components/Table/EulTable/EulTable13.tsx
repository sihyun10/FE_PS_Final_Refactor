import React from 'react';
import { useParams } from 'react-router-dom';
import Table, { TableProps } from '@/components/common/Table';
import MOCK_DATA1 from '@/../mockupdb1.json';
import MOCK_DATA2 from '@/../mockupdb2.json';
import MOCK_DATA3 from '@/../mockupdb3.json';
import { COLUMNS } from '@/components/Table/EulTable/columns2';

type ExampleProps = {};

const Eultable13: React.FC<ExampleProps> = () => {
  const { id } = useParams();
  let mortgageDetailData = MOCK_DATA1.pdfupload.eul_info.mortgage_detail;

  // 현재 id에 따라 목업 데이터 변경
  if (id === '1') {
    mortgageDetailData = MOCK_DATA1.pdfupload.eul_info.mortgage_detail;
  } else if (id === '2') {
    mortgageDetailData = MOCK_DATA2.pdfupload.eul_info.mortgage_detail;
  } else {
    mortgageDetailData = MOCK_DATA3.pdfupload.eul_info.mortgage_detail;
  }

  const tableProps: TableProps = {
    tableData: mortgageDetailData,
    tableColumns: COLUMNS,
    maxHeight: '100%',
    disableScroll: true,
    width: ['188px', '188px', '188px', '188px', '188px'],
  };

  return (
    <div>
      <Table {...tableProps} />
    </div>
  );
};

export default Eultable13;
