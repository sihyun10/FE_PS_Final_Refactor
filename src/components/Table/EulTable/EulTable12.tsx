import React from 'react';
import { useParams } from 'react-router-dom';
import Table, { TableProps } from '@/components/common/Table';
import MOCK_DATA1 from '@/../mockupdb1.json';
import MOCK_DATA2 from '@/../mockupdb2.json';
import MOCK_DATA3 from '@/../mockupdb3.json';
import { COLUMNS } from '@/components/Table/EulTable/columns1';

type ExampleProps = {};

const Eultable12: React.FC<ExampleProps> = () => {
  const { id } = useParams();
  let leaseholdInfoData = MOCK_DATA1.pdfupload.eul_info.leasehold_info;

  // 현재 id에 따라 목업 데이터 변경
  if (id === '1') {
    leaseholdInfoData = MOCK_DATA1.pdfupload.eul_info.leasehold_info;
  } else if (id === '2') {
    leaseholdInfoData = MOCK_DATA2.pdfupload.eul_info.leasehold_info;
  } else {
    leaseholdInfoData = MOCK_DATA3.pdfupload.eul_info.leasehold_info;
  }
  const tableProps: TableProps = {
    tableData: leaseholdInfoData,
    tableColumns: COLUMNS,
    maxHeight: '120px',
    disableScroll: true,
    width: ['182px', '182px', '182px'],
  };

  return (
    <div>
      <Table {...tableProps} />
    </div>
  );
};

export default Eultable12;
