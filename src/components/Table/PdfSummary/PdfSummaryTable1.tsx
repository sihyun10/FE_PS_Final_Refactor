import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from 'react-table';
import { useDataStore } from '@/store/DataStore';
import Table, { TableProps } from '@/components/common/Table';

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
  const { id } = useParams();
  const { responseItems } = useDataStore();
  const [resData, setResData] = useState();

  console.log(responseItems);

  useEffect(() => {
    if (!id) {
      console.log('URL에 아이디가 제공되지 않았습니다.');
      return;
    }
    const parsedId: number = +id;
    const selectedItem: any = responseItems.find((item) => item.id === parsedId);

    if (selectedItem) {
      setResData(selectedItem.data.ownership_list);
    } else {
      console.log(`아이디 ${id}에 해당하는 아이템을 찾을 수 없습니다.`);
    }
  }, [id]);

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
