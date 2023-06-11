import { getResData } from '@/utils/getResData';

interface OwnershipItem {
  address: string;
  age: string;
  name: string;
  percent: string;
  rank: string;
  share: string;
}

const OwnershipInfo = () => {
  const ownershipData = getResData('ownership_list');
  const ownershipList: OwnershipItem[] = ownershipData ? Object.values(ownershipData) : [];
  const first = ownershipList[0];
  console.log(ownershipList);
  return (
    <div>
      소유자 정보
      {ownershipList.length > 0 ? <div>{first?.age}</div> : '없다'}
    </div>
  );
};

export default OwnershipInfo;
