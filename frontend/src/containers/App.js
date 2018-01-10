import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addBill } from '../actions'
import { getAllBills, getTotalKwh, getTotalCost, getTotalSavings } from '../reducers/bills'
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from '../components/NotFound';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Admin from '../components/Admin';
import { Container, Row, Col } from 'reactstrap';
import Panel from '../components/Panel';

import '../styles/App.css';

const Body = ({data, totalkwh, totalcost, totalsavings}) => (
  <div className="App solstice">
    <Container>
      <Row>
        <Col xs="2"><h5>Energy</h5><div>{totalkwh} kwh</div></Col>
        <Col xs="2"><h5>Cost</h5><div>{totalcost} $</div></Col>
        <Col xs="2"><h5>Savings</h5><div>{totalsavings} $</div></Col>
        <Col xs="2"><h5>Savings</h5><div>{totalsavings/totalcost * 100} %</div></Col>
        <Col xs="2"></Col>
        <Col xs="2"></Col>
        <Col xs="2"></Col>
      </Row>
      <Row className="panel-row">
        <Col xs="12" md="6" className="panel-col">
          <Panel title="Energy Consumption" type="energy" data={data}/>
        </Col>
        <Col xs="12" md="6" className="panel-col">
          <Panel title="Energy Cost and Savings" type="costs" data={data}/>
        </Col>
      </Row>
      <Row className="panel-row">
        <Col xs="12" md="6" className="panel-col">
          <Panel/>
        </Col>
        <Col xs="12" md="6" className="panel-col">
          <Panel/>
        </Col>
      </Row>
    </Container>
  </div>
)

const App = ({ bills, addBill, totalkwh, totalcost, totalsavings }) => (
  <Router>
  <div className="AppContainer">
    <Header/>
      <Switch>
        <Redirect exact from='/' to='/home' />
        <Route path="/home" render={()=><Body data={bills} totalkwh={totalkwh} totalcost={totalcost} totalsavings={totalsavings}/>}/>
        <Route path="/admin" render={()=><Admin data={bills} addBill={addBill}/>}/>
        <Route path='*' component={NotFound} />
      </Switch>
    <Footer />
  </div>
</Router>
)

App.propTypes = {
  bills: PropTypes.arrayOf(PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    bill: PropTypes.number.isRequired,
    savings: PropTypes.number.isRequired,
    kwh: PropTypes.number.isRequired
  })).isRequired,
  totalkwh: PropTypes.number.isRequired,
  totalcost: PropTypes.number.isRequired,
  totalsavings: PropTypes.number.isRequired, 
  addBill: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  bills: getAllBills(state.bills),
  totalkwh: getTotalKwh(state.bills),
  totalcost: getTotalCost(state.bills),
  totalsavings: getTotalSavings(state.bills)
})

export default connect(
  mapStateToProps,
  { addBill }
)(App)