import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from 'react-table';
import { useDataStore } from '@/store/DataStore';
import Table, { TableProps } from '@/components/common/Table';

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
  const { id } = useParams();
  const { responseItems } = useDataStore();
  const [resData, setResData] = useState();

  useEffect(() => {
    if (!id) {
      console.log('URL에 아이디가 제공되지 않았습니다.');
      return;
    }
    const parsedId: number = +id;
    const selectedItem: any = responseItems.find((item) => item.id === parsedId);

    if (selectedItem) {
      setResData(selectedItem.data.rights_other_than_ownership);
    } else {
      console.log(`아이디 ${id}에 해당하는 아이템을 찾을 수 없습니다.`);
    }
  }, [id]);

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
