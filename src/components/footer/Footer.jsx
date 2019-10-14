import React from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import destroySession from '../../lib/destroy-session';

function Footer() {
  const handleSignout = async function() {
    await destroySession();
    window.location.href = 'http://localhost:3000';
  };

  return (
    <div
      style={{
        padding: '5px',
        borderTop: '1px solid #e7e7e7',
        position: 'absolute',
        bottom: '0',
        width: '100%',
        backgroundColor: 'white',
        zIndex: '10'
      }}
    >
      <Container>
        <Row>
          <Col>
            <p style={{ margin: '0' }}>
              <small style={{ margin: '0', verticalAlign: 'middle' }}>
                Copyright &copy; 2019 Seer Assets, LLC. All rights reserved.
              </small>
            </p>
          </Col>
          <Col>
            <Row>
              <Button
                color="link"
                size="sm"
                className="ml-auto"
                onClick={() => handleSignout()}
              >
                Sign out
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
