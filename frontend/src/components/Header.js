import React from 'react';
import Navbar from './NavBar';
import { Container, Row, Col } from 'reactstrap';

import '../styles/Header.css';

export default () =>
  <div className='header'>
    <Container>
      <Row>
        <Col sm="12"><Navbar/></Col>
      </Row>
    </Container>
  </div>;