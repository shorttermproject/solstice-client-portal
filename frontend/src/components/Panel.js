import React, { Component } from 'react';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import SingleSeriesChart from './SingleSeriesChart';
import StackedChart from './StackedChart';

import '../styles/Panel.css';

class Panel extends Component {
    getChartComponent () {
        const containerId = this.props.type + '-chart';
        //return <Graph type={this.props.type} containerId={contId}/>;
        //<Graph type={'costs'} containerId='costs-chart'/>

        if (this.props.type === 'energy') {
            return (
              <SingleSeriesChart
                column={'kwh'}
                containerId={containerId}
                seriesName={'Energy Use'}
                yLabel={'Energy Use (kWh)'}
              />);
          } else if (this.props.type === 'costs') {
            return (
              <StackedChart
                column1={'bill'}
                column2={'savings'}
                containerId={containerId}
                series2={'Savings'}
                series1={'Energy Cost'}
                yLabel={'Amount'}
              />);
          } else {
            return (<div></div>)
          }
    

    }
       
    render() {
        const title = this.props.type === 'energy' ?
            'Energy Use Over Time' : 'Energy Costs and Savings';
        const subtitle = this.props.type === 'energy' ?
            'This chart shows your energy consumption in kilowatt hours over the time period.' :
            'This chart shows you the enerty cost and how much money you saved over the time period.'

        return (
            <div>
            <Card className="panel">
                <CardHeader>
                <Container>
                    <Row>
                    <Col xs="9">
                    <CardTitle>{this.props.title}</CardTitle>
                    </Col>
                    <Col xs="3">
                        7 days
                    </Col>
                    </Row>
                    </Container>
                </CardHeader>
                {
                    this.getChartComponent()
                }
                <CardBody>
                <CardSubtitle>{title}</CardSubtitle>
                <CardText>{subtitle}</CardText>
                </CardBody>
            </Card>
            </div>
        );
    }
};

export default Panel;
