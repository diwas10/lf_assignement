import React from 'react';
import { useApp } from '../../../providers/AppProvider';
import './header.css';
import { AiOutlineLogout, GiHamburgerMenu } from 'react-icons/all';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';

const Header: FunctionComponent = (props) => {
  const { toggleSidebar, headerText } = useApp();
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <header className="header-01 px-4 border-bottom">
        {/*<Layout.Container>*/}
        <div className="header-container">
          <div className={'d-flex align-items-center text-secondary'}>
            <GiHamburgerMenu role={'button'} fontSize={'1.3rem'} onClick={toggleSidebar} />
            <h5 className={'mx-4 mb-1'}>{headerText}</h5>
          </div>
          <div role={'button'} onClick={logout} className={'p-2'} title={'Logout'}>
            <h5>
              <AiOutlineLogout className={'mr-5'} />
            </h5>
          </div>
          {/*<Button*/}
          {/*  size={'sm'}*/}
          {/*  outline*/}
          {/*  className={'border-0 border-bottom rounded-0 border-secondary'}*/}
          {/*  onClick={() => navigate(-1)}>*/}
          {/*  <AiFillCaretLeft /> Go Back*/}
          {/*</Button>*/}
        </div>
        {/*</Layout.Container>*/}
      </header>
    </>
  );
};

export default Header;
