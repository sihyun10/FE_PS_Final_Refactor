import { Column } from 'react-table';

export const COLUMNS: Column<{
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
