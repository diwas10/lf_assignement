import React from 'react';
import AbsoluteLayout from './AbsoluteLayout';
import WrapperLayout from './WrapperLayout';
import FlexLayout from './FlexLayout';
import MainLayout from './MainLayout';
import BaseLayout from './BaseLayout';
import ContainerLayout from './ContainerLayout';
import HeaderLayout from './HeaderLayout';

interface LayoutSubComponents {
  Absolute: FunctionComponent<any>;
  Wrapper: FunctionComponent<any>;
  Flex: FunctionComponent<any>;
  Main: FunctionComponent<any>;
  Base: FunctionComponent<any>;
  Container: FunctionComponent<any>;
  Header: FunctionComponent<any>;
}

//higher order component
const Layout: FunctionComponent & LayoutSubComponents = (props) => {
  return <Layout {...props} />;
};

Layout.Absolute = AbsoluteLayout;
Layout.Wrapper = WrapperLayout;
Layout.Flex = FlexLayout;
Layout.Main = MainLayout;
Layout.Base = BaseLayout;
Layout.Container = ContainerLayout;
Layout.Header = HeaderLayout;

export default Layout;
