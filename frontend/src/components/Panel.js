import React, { Component } from 'react';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

import '../styles/Panel.css';

class Panel extends Component {       
    render() {
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
                {this.props.children}
                <CardBody>
                <CardSubtitle>{this.props.subtitle}</CardSubtitle>
                <CardText>{this.props.detail}</CardText>
                </CardBody>
            </Card>
            </div>
        );
    }
};

export default Panel;
