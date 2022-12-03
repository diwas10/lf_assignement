import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

interface Props {
  isOpen: boolean;

  toggle(): void;
}

const SideBar: FunctionComponent<Props> = (props) => {
  const { isOpen, toggle } = props;
  return (
    <div className={classNames('sidebar', { 'is-open': isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: '#fff' }}>
          &times;
        </span>
        <h1 className={'title'}>PMS</h1>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <NavItem>
            <NavLink className={(nav) => `nav-link ${nav.isActive ? 'active' : ''}`} to={'/'}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={(nav) => `nav-link ${nav.isActive ? 'active' : ''}`}
              to={'/patient'}>
              Patient
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

export default SideBar;
