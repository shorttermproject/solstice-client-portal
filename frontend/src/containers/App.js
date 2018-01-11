import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addBill } from '../actions'
import { getAllBills, getTotalKwh, getTotalCost, getTotalSavings, round} from '../reducers/bills'
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from '../components/NotFound';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Admin from '../components/Admin';
import { Container, Row, Col, Card } from 'reactstrap';
import Panel from '../components/Panel';
import SingleSeriesChart from '../components/SingleSeriesChart';
import StackedChart from '../components/StackedChart';

import '../styles/App.css';

const Body = ({data, totalkwh, totalcost, totalsavings}) => (
  <div className="App solstice">
    <Container>
      <Row>
        <Col xs="6" md="3"><Card className="panel">Energy Usage<div className="value">{totalkwh} kwh</div></Card></Col>
        <Col xs="6" md="3"><Card className="panel">Total Cost<div className="value">${totalcost}</div></Card></Col>
        <Col xs="6" md="3"><Card className="panel">Total Savings<div className="value">${totalsavings}</div></Card></Col>
        <Col xs="6" md="3"><Card className="panel">Savings Percent<div className="value">{round(totalsavings/totalcost * 100)}%</div></Card></Col>
      </Row>
      <Row className="panel-row">
        <Col xs="12" md="6" className="panel-col">
          <Panel title="Energy Consumption" type="energy" 
              subtitle="Energy Use Over Time" 
              detail="This chart shows your energy consumption in kilowatt hours over the time period." 
              data={data}>
            <SingleSeriesChart
              column={'kwh'}
              containerId="energy-chart"
              seriesName={'Energy Use'}
              yLabel={'Energy Use (kWh)'}/>
          </Panel>
        </Col>
        <Col xs="12" md="6" className="panel-col">
          <Panel title="Energy Cost and Savings" type="costs" 
              subtitle="Energy Costs and Savings" 
              detail="This chart shows you the enerty cost and how much money you saved over the time period."
              data={data}>
            <StackedChart
              column1={'bill'}
              column2={'savings'}
              containerId="costs-chart"
              series2={'Savings'}
              series1={'Energy Cost'}
              yLabel={'Amount'}/>
            </Panel>
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