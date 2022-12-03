import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/React/Sidebar';
import { useApp } from '../../../providers/AppProvider';
import Layout from '../../../components/UI/Layouts';
import HeaderMain from '../../../components/React/Header/HeaderMain';

const Dashboard: FunctionComponent = () => {
  const { toggleSidebar, isSidebarOpen, setHeaderText } = useApp();

  return (
    <Layout.Wrapper>
      <Layout.Base>
        <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
        <div className="w-100">
          <HeaderMain />
          <Layout.Main>
            <Outlet />
          </Layout.Main>
        </div>
      </Layout.Base>
    </Layout.Wrapper>
  );
};

export default Dashboard;
