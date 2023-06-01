import React from 'react';
import { Button, TableWrapper } from '../style';
import { useParams } from 'react-router-dom';
import Table, { TableProps } from '@/components/common/Table';
import MOCK_DATA1 from '@/../mockupdb1.json';
import MOCK_DATA2 from '@/../mockupdb2.json';
import MOCK_DATA3 from '@/../mockupdb3.json';
import { Column } from 'react-table';

const COLUMNS: Column<{
  collateral_amount: string;
  principal_amount_estimate: string;
}>[] = [
  {
    Header: '담보총액/건수',
    accessor: 'collateral_amount',
  },
  {
    Header: '원금 추론액',
    accessor: 'principal_amount_estimate',
  },
];

type ExampleProps = {};

const Eultable11: React.FC<ExampleProps> = () => {
  const { id } = useParams();
  let mortgageInfoData = MOCK_DATA1.pdfupload.eul_info.mortgage_info;

  // 현재 id에 따라 목업 데이터 변경
  if (id === '1') {
    mortgageInfoData = MOCK_DATA1.pdfupload.eul_info.mortgage_info;
  } else if (id === '2') {
    mortgageInfoData = MOCK_DATA2.pdfupload.eul_info.mortgage_info;
  } else {
    mortgageInfoData = MOCK_DATA3.pdfupload.eul_info.mortgage_info;
  }

  const tableProps: TableProps = {
    tableData: mortgageInfoData,
    tableColumns: COLUMNS,
    maxHeight: '120px',
    disableScroll: true,
    width: ['188px', '188px'],
  };

  const renderCell = (value: string, column: any) => {
    if (column.id === 'principal_amount_estimate') {
      return (
        <>
          {value}
          <br />
          <Button>추론 계산기</Button>
        </>
      );
    }
    return value;
  };

  return (
    <TableWrapper>
      <Table {...tableProps} renderCell={renderCell} />
    </TableWrapper>
  );
};

export default Eultable11;
