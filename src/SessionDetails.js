import React from "react";
import { Accordion, Card, Row, Col } from "react-bootstrap";

function SessionDetails({ historyData }) {
  console.log(historyData);

  return (
    <Accordion defaultActiveKey="0" style={{ marginTop: "7.5%" }}>
      {historyData.map((elm, index) => {
        return (
          <Card key={index}>
            <Accordion.Toggle
              as={Card.Header}
              eventKey={`${index}`}
              style={{
                backgroundColor: "#40b6d7",
                color: "white",
                textAlign: "left",
              }}
            >
              <b>Session At - {elm.viewedTime} </b>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={`${index}`}>
              <Card.Body>
                <Row>
                  <Col style={{ textAlign: "left" }}>
                    <b>Platform</b>
                  </Col>
                  <Col style={{ textAlign: "left" }}>{elm.platform}</Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: "left" }}>
                    <b>Timezone</b>
                  </Col>
                  <Col style={{ textAlign: "left" }}>{elm.timezone}</Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: "left" }}>
                    <b>Language</b>
                  </Col>
                  <Col style={{ textAlign: "left" }}>{elm.language}</Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: "left" }}>
                    <b>Resolution</b>
                  </Col>
                  <Col style={{ textAlign: "left" }}>1360*768</Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: "left" }}>
                    <b>Browser Used</b>
                  </Col>
                  <Col style={{ textAlign: "left" }}>{elm.userAgent}</Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      })}
    </Accordion>
  );
}

export default SessionDetails;
