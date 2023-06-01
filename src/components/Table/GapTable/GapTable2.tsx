import React from 'react';
import { useParams } from 'react-router-dom';
import Table, { TableProps } from '@/components/common/Table';
import MOCK_DATA1 from '@/../mockupdb1.json';
import MOCK_DATA2 from '@/../mockupdb2.json';
import MOCK_DATA3 from '@/../mockupdb3.json';
import { Column } from 'react-table';

const COLUMNS: Column<{
  rank: string;
  registration_purpose: string;
  reception_inform: string;
  registration_cause: string;
  notes: any;
}>[] = [
  {
    Header: '순위번호',
    accessor: 'rank',
  },
  {
    Header: '등기목적',
    accessor: 'registration_purpose',
  },
  {
    Header: '접수',
    accessor: 'reception_inform',
    Cell: ({ value }: { value: string }) => (
      <div style={{ whiteSpace: 'pre-wrap' }}>{value.replace(' ', '\n')}</div>
    ),
  },
  {
    Header: '등기 원인',
    accessor: 'registration_cause',
  },
  {
    Header: '관리자 및 기타 사항',
    accessor: (data: { notes: { note: string[]; canceled: string[] } }) => (
      <div style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
        {data.notes.note.join('\n')}
        <br />
        <span style={{ textDecoration: 'line-through' }}>{data.notes.canceled.join('\n')}</span>
      </div>
    ),
  },
];

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
