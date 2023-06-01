import React from 'react';
import { useParams } from 'react-router-dom';
import Table, { TableProps } from '@/components/common/Table';
import MOCK_DATA1 from '@/../mockupdb1.json';
import MOCK_DATA2 from '@/../mockupdb2.json';
import MOCK_DATA3 from '@/../mockupdb3.json';
import { Column } from 'react-table';

const COLUMNS: Column<{
  debtor_name: string;
  debtor_address: string;
  registration_purpose: string;
  leasehold_name: string;
  debtor_registration_number: string;
}>[] = [
  {
    Header: '채무자 성명',
    accessor: 'debtor_name',
  },
  {
    Header: '채무자 주소',
    accessor: 'debtor_address',
  },
  {
    Header: '등기 목적',
    accessor: 'registration_purpose',
  },
  {
    Header: '근저당권자',
    accessor: 'leasehold_name',
  },
  {
    Header: '사업자/주민등록번호',
    accessor: 'debtor_registration_number',
  },
];

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
