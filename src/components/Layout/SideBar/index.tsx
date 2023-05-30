import { NavLink, Link } from 'react-router-dom';
import { SidebarContainer, SidebarMenus, Submenus, MenuBadge } from './style';
import logo from '@/assets/logo.png';
import { useStepStore } from '@/store/store';
import RecentHistory from './RecentHistory';

const SideBar = () => {
  const { step } = useStepStore();

  return (
    <SidebarContainer>
      <NavLink to="/">
        <img className="logo" src={logo} alt="logo" />
      </NavLink>
      <SidebarMenus>
        <NavLink className={step !== 0 ? 'mainmenu active' : 'mainmenu'} to="pra">
          심사하기
        </NavLink>
        <Submenus className={step !== 0 ? '' : 'hide'}>
          <Link to="pra" className={step === 1 ? 'submenu active' : 'submenu'}>
            <span className="submenuIcon material-symbols-outlined">upload_file</span>
            등기부등본 업로드
            <MenuBadge className="dark">새로 심사하기</MenuBadge>
          </Link>
          <div className={step === 2 ? 'submenu active' : 'submenu'}>
            <span className="submenuIcon material-symbols-outlined">description</span>
            심사결과
          </div>
        </Submenus>
        <NavLink className="mainmenu" to="/myreviews">
          내 심사관리
          <MenuBadge className="light">준비중</MenuBadge>
        </NavLink>
      </SidebarMenus>
      <RecentHistory />
    </SidebarContainer>
  );
};

export default SideBar;
