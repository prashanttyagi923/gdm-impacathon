import React from "react";
import { Accordion, Card, Row, Col } from "react-bootstrap";

function SessionDetails() {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle
          as={Card.Header}
          eventKey="0"
          style={{
            backgroundColor: "#40b6d7",
            color: "white",
            textAlign: "left",
          }}
        >
          <b>Session At - </b>
          {`${new Date()}`}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Row>
              <Col>
                <b>Browser Used</b>
              </Col>
              <Col>Chrome</Col>
            </Row>
            <Row>
              <Col>
                <b>Resolution</b>
              </Col>
              <Col>1360*768</Col>
            </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle
          as={Card.Header}
          eventKey="1"
          style={{
            backgroundColor: "#40b6d7",
            color: "white",
            textAlign: "left",
          }}
        >
          <b>Session At - </b>
          {`${new Date()}`}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>Hello! I'm another body</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default SessionDetails;
