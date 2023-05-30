import { Column } from 'react-table';

export const COLUMNS: Column<{
  debtor_name: string;
  debtor_address: string;
  registration_purpose: string;
  leasehold_name: string;
  debtor_registration_number: string;
}>[] = [
  {
    Header: '채무자 성명',
    accessor: 'debtor_name',
  },
  {
    Header: '채무자 주소',
    accessor: 'debtor_address',
  },
  {
    Header: '등기 목적',
    accessor: 'registration_purpose',
  },
  {
    Header: '근저당권자',
    accessor: 'leasehold_name',
  },
  {
    Header: '사업자/주민등록번호',
    accessor: 'debtor_registration_number',
  },
];
