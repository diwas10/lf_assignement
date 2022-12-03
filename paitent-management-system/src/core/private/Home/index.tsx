import React, { useEffect } from 'react';
import Layout from '../../../components/UI/Layouts';
import { useApp } from '../../../providers/AppProvider';
import { useAuth } from '../../../providers/AuthProvider';

const Patient = () => {
  const { setHeaderText } = useApp();
  const { user } = useAuth();

  useEffect(() => {
    setHeaderText('Home');
  }, []);

  return (
    <Layout.Main>
      <div className={'d-flex justify-content-between px-5 py-3'}>
        <div>
          <h5>Welcome,</h5>
          <h4>{user?.email}</h4>
        </div>
      </div>
    </Layout.Main>
  );
};

export default Patient;
