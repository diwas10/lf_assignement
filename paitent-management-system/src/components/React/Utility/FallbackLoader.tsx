import React from 'react';
import Layout from '../../UI/Layouts';
import { Spinner } from 'reactstrap';

const FallbackLoader = () => {
  return (
    <Layout.Main>
      <Layout.Flex>
        <div className="error-boundary--container">
          <div className={'text-center'}>
            <Spinner />
            <h6 className={'mt-1'}>Loading...</h6>
          </div>
        </div>
      </Layout.Flex>
    </Layout.Main>
  );
};

export default FallbackLoader;
