import { Column } from 'react-table';

export const COLUMNS: Column<{
  registration_purpose: string;
  mortgage: string;
  debtor_registration_number: string;
}>[] = [
  {
    Header: '등기 목적',
    accessor: 'registration_purpose',
  },
  {
    Header: '전세권자',
    accessor: 'mortgage',
  },
  {
    Header: '주민/사업자등록번호',
    accessor: 'debtor_registration_number',
  },
];
