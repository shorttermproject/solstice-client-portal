import React from 'react';
import Icon from 'react-icons-kit';
import { Container, Row, Col } from 'reactstrap';
import { home } from 'react-icons-kit/icomoon/home';       
import { facebook2 } from 'react-icons-kit/icomoon/facebook2';       
import { instagram } from 'react-icons-kit/icomoon/instagram';       
import { twitter } from 'react-icons-kit/icomoon/twitter';       

import '../styles/Footer.css'

export default () =>
  <div className='footer'>
    <Container>
      <Row>
        <Col className='footer-panel' xs="6" sm="3" lg="3">
        <img
              src="https://static1.squarespace.com/static/53ff8e5be4b0eac43b519302/t/598b1e77a803bb87a9083f2b/1502289533533/Logo++Color+Color.png"
              alt="Solstice logo" />
        <h4>SOLAR POWER TO SHARE.</h4><div>Solstice Initiative works with its partners to build community solar gardens in which everyone can easily participate.</div>
        </Col>
        <Col className='footer-panel' xs="6" sm="3" lg="3">
          <h4>OUR PROJECTS</h4>
          <div>Harvard forest</div>
          <div>Somerville solar garden</div>
          <div>Sudbury recycling center</div>
          <div>Hopkinton</div>
          <div>Framingham Downtown</div>
          <div>Eversource field</div>
          <div>Southborough parking</div>
        </Col>
        <Col className='footer-panel' xs="6" sm="3" lg="3">
          <h4>NAVIGATE</h4>
          <div><Icon icon={home} /> home</div>
          <div>about us</div>
          <div>our work</div>
          <div>faq</div>
          <div>blog</div> 
          <div>support us</div>
        </Col>
        <Col className='footer-panel' xs="6" sm="3" lg="3">
          <h4>GET SOCIAL</h4>
          <div><Icon icon={facebook2} /> facbook</div>
          <div><Icon icon={instagram} /> instagram</div>
          <div><Icon icon={twitter} /> twitter</div>
        </Col>
      </Row>
    </Container>
    <Container fluid>
      <Row>
        <Col className='bottom'>
          developed by Ken Weiss <a href="http://chrome-fusion.com">chrome-fusion.com</a>
          <br/>
          using: 
          <a href="https://reactjs.org/">react</a>|
          <a href="https://getbootstrap.com">bootstrap</a>|
          <a href="http://reactstrap.github.io">reactstrap</a>|
          <a href="http://wmira.github.io/react-icons-kit/">react-icons-kit</a>|
          <a href="http://allenfang.github.io/react-bootstrap-table/">react-bootstrap-table</a>|
          <a href="https://www.highcharts.com">highcharts</a>
        </Col>
      </Row>
    </Container>
  </div>;

