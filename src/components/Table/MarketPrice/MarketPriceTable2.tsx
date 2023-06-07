import Table from '@/components/common/Table';
import { getResData } from '@/utils/getResData';

const MarketConditionsTable2 = () => {
  const praPriceData = getResData('customData.filterDATA');

  const result = praPriceData
    ? Object.entries(praPriceData)
        .flatMap(([date, records]) => {
          return (records as any[]).map((record) => ({
            계약일: date + String(record.일).padStart(2, '0'),
            아파트명: `${record.아파트}  ${Math.floor(record.전용면적 / 3.3)}평`,
            거래: '매매',
            거래금액: record.거래금액.trim(),
            전용면적: `${record.전용면적}.㎡`,
            층: record.층,
          }));
        })
        .sort((a, b) => b.계약일.localeCompare(a.계약일))
    : [];

  const ColumnsPrice = [
    {
      Header: '계약일',
      accessor: '계약일',
    },
    {
      Header: '아파트명',
      accessor: '아파트명',
    },
    {
      Header: '거래',
      accessor: '거래',
    },
    {
      Header: '거래금액',
      accessor: '거래금액',
    },
    {
      Header: '전용면적',
      accessor: '전용면적',
    },
    {
      Header: '층',
      accessor: '층',
    },
  ];

  const tableProps = {
    tableData: result,
    tableColumns: ColumnsPrice,
    maxHeight: '500px',
    width: ['150px', '250px', '100px', '230px', '100px', '110px'],
  };

  return (
    <div>
      <Table {...tableProps} />
    </div>
  );
};

export default MarketConditionsTable2;
