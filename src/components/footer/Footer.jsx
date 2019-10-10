import React from 'react';
import { Container, Col, Row, Button } from 'reactstrap';

function Footer() {
  return (
    <div
      style={{
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
            <p>
              <small>
                Copyright &copy; 2019 Seer Assets, LLC. All rights reserved.
              </small>
            </p>
          </Col>
          <Col>
            <Button color="link" size="sm">
              Sign out
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
