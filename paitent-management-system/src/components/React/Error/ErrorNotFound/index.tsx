import React from 'react';
import '../ErrorBoundary.css';
import Layout from '../../../UI/Layouts';

interface ErrorNotFoundProps {}

function ErrorNotFound(props: ErrorNotFoundProps) {
  return (
    <Layout.Main>
      <Layout.Flex>
        <div className="error-boundary--container">
          <div className="error-boundary--content">
            <h1 className="error-boundary--header">404 | Not Found</h1>
            <summary className="error-boundary--summary">
              <h6>Oops, we can't seem to find the page you are looking for!</h6>
            </summary>
          </div>
        </div>
      </Layout.Flex>
    </Layout.Main>
  );
}

export default ErrorNotFound;
