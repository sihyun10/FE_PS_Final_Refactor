import { Column } from 'react-table';

export const COLUMNS: Column<{
  rank: any;
  registration_purpose: string;
  reception_information: string;
  major_registration_items: string[];
  target_owner: string;
}>[] = [
  {
    Header: '순위',
    accessor: (data) => data.rank.value,
  },
  {
    Header: '등기목적',
    accessor: 'registration_purpose',
  },
  {
    Header: '접수 정보',
    accessor: 'reception_information',
  },
  {
    Header: '주요등기사항',
    accessor: 'major_registration_items',
    Cell: ({ value }: { value: string[] }) => (
      <div style={{ whiteSpace: 'pre-wrap' }}>{value.join('\n')}</div>
    ),
  },
  {
    Header: '대상소유자',
    accessor: 'target_owner',
  },
];
