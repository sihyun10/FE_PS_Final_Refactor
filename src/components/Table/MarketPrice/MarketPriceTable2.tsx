import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from '@/components/common/Table';
import { useDataStore } from '@/store/DataStore';

const MarketConditionsTable2 = () => {
  const { id } = useParams();
  const { responseItems } = useDataStore();
  const [praPriceData, setPraPriceData] = useState<any>(null);

  useEffect(() => {
    if (!id) {
      console.log('URL에 아이디가 제공되지 않았습니다.');
      return;
    }

    const parsedId: number = +id;
    const selectedItem: any = responseItems.find((item) => item.id === parsedId);

    if (selectedItem) {
      setPraPriceData(selectedItem.data.customData.filterDATA);
    } else {
      console.log(`아이디 ${id}에 해당하는 아이템을 찾을 수 없습니다.`);
    }
  }, [id]);

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
    <PraPriceContent>
      <div>
        <p className="tableTitle">2. 실거래가</p>
      </div>
      <PraPriceTable>{result.length > 0 ? <Table {...tableProps} /> : <div />}</PraPriceTable>
    </PraPriceContent>
  );
};

export default MarketConditionsTable2;

const PraPriceContent = styled.div`
  width: 100%;
  .tableTitle {
    font-size: 14px;
    font-weight: bold;
  }
`;

const PraPriceTable = styled.div`
  height: 510px;
  margin-top: 25px;
`;
