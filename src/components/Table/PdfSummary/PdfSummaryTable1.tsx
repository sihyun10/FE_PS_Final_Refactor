import { Column } from 'react-table';
import Table, { TableProps } from '@/components/common/Table';
import { getResData } from '@/utils/getResData';

const COLUMNS: Column<{
  name: string;
  age: string;
  share: string;
  address: string;
  rank: string;
}>[] = [
  {
    Header: '등기인 명의',
    accessor: 'name',
  },
  {
    Header: '주민등록번호',
    accessor: 'age',
  },
  {
    Header: '최종지분',
    accessor: 'share',
  },
  {
    Header: '주소',
    accessor: 'address',
  },
  {
    Header: '순위번호',
    accessor: 'rank',
  },
];

const PdfSummaryTable1 = () => {
  const resData = getResData('ownership_list');

  // 백엔드에서 obejct 타입으로 데이터를 response 함.  테이블에 넣기 위해 배열로 변경
  const ownerList = resData ? Object.values(resData) : [];

  const tableProps: TableProps = {
    tableData: ownerList,
    tableColumns: COLUMNS,
    maxHeight: '100%',
    disableScroll: true,
    width: ['172px', '174px', '172px', '264px', '146px'],
  };
  return <Table {...tableProps} />;
};

export default PdfSummaryTable1;
