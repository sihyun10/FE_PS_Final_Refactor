import { useEffect } from 'react';
import { Outlet, useParams, NavLink, useLocation } from 'react-router-dom';
import { useStepStore } from '@/store/store';
import { LayoutContainer, SummarySection, MainSection, TabMenus } from './style';
import SideBar from './SideBar';
import Title from './Title';
import Overview from '@/components/Overview';

const Layout = () => {
  const { setStep } = useStepStore();
  const pdfId = useParams().id;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('pra')) {
      setStep(pdfId ? 2 : 1);
    } else {
      setStep(0);
    }
  }, [location]);

  return (
    <LayoutContainer>
      <SideBar />
      <Title />
      {pdfId ? (
        <>
          <SummarySection>
            <Overview />
          </SummarySection>
          <MainSection>
            <TabMenus>
              <NavLink to={`review/${pdfId}/pdfsummary`}>등기부 요약</NavLink>
              <NavLink to={`review/${pdfId}/gap`}>등기부 갑구</NavLink>
              <NavLink to={`review/${pdfId}/eul`}>등기부 을구</NavLink>
              <NavLink to={`review/${pdfId}/marketprice`}>시세</NavLink>
              <NavLink to={`review/${pdfId}/location`}>입지</NavLink>
            </TabMenus>
            <div className="praDetail">
              <Outlet />
            </div>
          </MainSection>
        </>
      ) : (
        <div className="combineSection">
          <Outlet />
        </div>
      )}
    </LayoutContainer>
  );
};

export default Layout;
