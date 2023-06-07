import { Column } from 'react-table';
import Table, { TableProps } from '@/components/common/Table';
import { getResData } from '@/utils/getResData';

const COLUMNS: Column<{
  rank: string;
  purpose: string;
  accept: string;
  info: string;
  owner: string;
}>[] = [
  {
    Header: '순위',
    accessor: 'rank',
  },
  {
    Header: '등기목적',
    accessor: 'purpose',
  },
  {
    Header: '접수 정보',
    accessor: 'accept',
  },
  {
    Header: '주요등기사항',
    accessor: 'info',
  },
  {
    Header: '대상소유자',
    accessor: 'owner',
  },
];

const PdfSummaryTable3 = () => {
  const resData = getResData('rights_other_than_ownership');

  // 백엔드에서 obejct 타입으로 데이터를 response 함.  테이블에 넣기 위해 배열로 변경
  const rightsList = resData ? Object.values(resData) : [];

  const tableProps: TableProps = {
    tableData: rightsList,
    tableColumns: COLUMNS,
    maxHeight: '100%',
    disableScroll: true,
    width: ['146px', '174px', '172px', '264px', '172px'],
  };
  return <Table {...tableProps} />;
};

export default PdfSummaryTable3;
