import React from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function Navigation(props) {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Nav className="mr-auto">
          <NavItem>
            <Link to="/">Return</Link>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Navigation;
