import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../styles/Admin.css';

function priceFormatter(cell, row) {
    return `<i>$</i> ${cell}`;
}




class AddBillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2018,
      month: 1,
      kwh: 1000,
      bill: 120,
      savings: 10
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const state = this.state;
    state[event.target.name] = Number(event.target.value);
    this.setState(state);
  }

  handleSubmit(event) {
    this.props.addBill(this.state);
    event.preventDefault();
  }
  
  render () {
    return ( <Form onSubmit={this.handleSubmit}>
    <FormGroup>
      <Label for="year">Year</Label>
      <Input type="number" name="year" id="year" value={this.state.year} onChange={this.handleChange}/>
    </FormGroup>
    <FormGroup>
      <Label for="month">Month</Label>
      <Input type="number" name="month" id="month" value={this.state.month} onChange={this.handleChange}/>
    </FormGroup>
    <FormGroup>
      <Label for="kwh">kWh</Label>
      <Input type="number" name="kwh" id="kwh" value={this.state.kwh} onChange={this.handleChange}/>
    </FormGroup>
    <FormGroup>
      <Label for="bill">Bill</Label>
      <Input type="number" name="bill" id="bill" value={this.state.bill} onChange={this.handleChange}/>
    </FormGroup>
    <FormGroup>
      <Label for="savings">Savings</Label>
      <Input type="number" name="savings" id="savings" value={this.state.savings} onChange={this.handleChange}/>
    </FormGroup>

    <Button type="submit" >Submit</Button>
    </Form>);
  }
}
export default class Admin extends Component {
  render() {
    //preformat the data 
    const bills = this.props.data.map((item) => {
      return {
        date: `${item.month}/${item.year}`,
        kwh: item.kwh,
        bill: item.bill,
        savings: item.savings
      };
    });    

    return <div className="App solstice admin">
      <Container>
        <Row>
          <Col>
            <h2>User Data:</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <BootstrapTable data={ bills }>
              <TableHeaderColumn dataField='date' isKey>Year</TableHeaderColumn>
              <TableHeaderColumn dataField='kwh'>kwh</TableHeaderColumn>
              <TableHeaderColumn dataField='bill' dataFormat={ priceFormatter }>Bill</TableHeaderColumn>
              <TableHeaderColumn dataField='savings' dataFormat={ priceFormatter }>savings</TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <Row>
          <Col className="form" >
          <h2>Add new unit:</h2>
            <AddBillForm addBill={this.props.addBill}/>
          </Col>
        </Row>
      </Container>
    </div>
  }
}