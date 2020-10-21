import React from "react";
import "./App.css";
import Fingerprint2 from "fingerprintjs2";
import { Table, Container, Row, Col, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SessionDetails from "./SessionDetails";
const browserSpecificKey = [
  "userAgent",
  "webdriver",
  "webglVendorAndRenderer",
  "webgl",
  "adBlock",
];
const displaySettings = [
  {
    id: 1,
    key: "language",
    displayName: "Current Language",
    format: (val) => {
      return val;
    },
  },
  {
    id: 2,
    key: "colorDepth",
    displayName: "Color Depth",
    format: (val) => {
      return val;
    },
  },
  {
    id: 3,
    key: "deviceMemory",
    displayName: "Device Memory",
    format: (val) => {
      return val;
    },
  },
  {
    id: 4,
    key: "hardwareConcurrency",
    displayName: "Hardware Concurrency",
    format: (val) => {
      return val;
    },
  },
  {
    id: 5,
    key: "screenResolution",
    displayName: "Device Screen Resolution",
    format: (val) => {
      return val.join("x");
    },
  },
  {
    id: 6,
    key: "timezone",
    displayName: "Device Time Zone",
    format: (val) => {
      return val;
    },
  },
  {
    id: 7,
    key: "platform",
    displayName: "Running on",
    format: (val) => {
      return val;
    },
  },
  {
    id: 8,
    key: "hasLiedOs",
    displayName: "Fake Operating System",
    format: (val) => {
      return val.toString();
    },
  },
  {
    id: 9,
    key: "hasLiedBrowser",
    displayName: "Fake Browser",
    format: (val) => {
      return val.toString();
    },
  },
  {
    id: 10,
    key: "touchSupport",
    displayName: "Has touch support",
    format: (val) => {
      return val.join(",");
    },
  },
  {
    id: 11,
    key: "hasLiedResolution",
    displayName: "False Resolution",
    format: (val) => {
      return val.toString();
    },
  },
];

let isDeviceDataSet = false;

function App() {
  const [deviceData, setDeviceData] = React.useState();

  const fingerprint = () => {
    if (window.requestIdleCallback && !isDeviceDataSet) {
      requestIdleCallback(function () {
        Fingerprint2.get(function (components) {
          console.log(components); // an array of components: {key: ..., value: ...}
          navigator.clipboard
            .writeText(components)
            .then(function () {
              console.log("copied");
            })
            .catch(function (ex) {
              console.log(ex);
            });
          var values = components.filter((val) => {
            if (!browserSpecificKey.includes(val.key)) return val;
          });
          console.log(values);
          if (!deviceData) {
            isDeviceDataSet = true;
            setDeviceData(values);
          }
          var hash = Fingerprint2.x64hash128(values.join(""), 31);
          console.log(`hash is ${hash}`);
        });
      });
    } else if (!isDeviceDataSet) {
      setTimeout(function () {
        Fingerprint2.get(function (components) {
          console.log(components); // an array of components: {key: ..., value: ...}
          var values = components.map(function (component) {
            return component.value;
          });
          var murmur = Fingerprint2.x64hash128(values.join(""), 31);
          console.log(`murmur is ${murmur}`);
        });
      }, 500);
    }
  };

  const lastVisited = new Date();

  return (
    <div className="App">
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="#">Device Finger Printing Demo</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={7}>
            <h1
              style={{
                color: "#40b6d7",
                fontSize: "calc(20px + 2vmin)",
                margin: "4% 0",
                textAlign: "left",
              }}
            >
              Current Session Details
            </h1>
            <h6 style={{ textAlign: "left", color: "#40b6d7" }}>
              Hash - #23433438378473847
            </h6>
            {fingerprint()}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Captured Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {deviceData &&
                  deviceData.map((item, seq) => {
                    const setting = displaySettings.find((setting) => {
                      if (setting.key === item.key) return setting;
                    });
                    if (setting) {
                      return (
                        <tr key={setting.id}>
                          <td>{setting?.id}</td>
                          <td>{setting?.displayName}</td>
                          <td>{setting?.format(item.value)}</td>
                        </tr>
                      );
                    }
                  })}
              </tbody>
            </Table>
          </Col>
          <Col xs={12} md={5}>
            <h1
              style={{
                color: "#40b6d7",
                fontSize: "calc(20px + 2vmin)",
                margin: "5.5% 0",
                textAlign: "left",
              }}
            >
              Previous Sessions Details
            </h1>
            <h6 style={{ textAlign: "left", color: "#40b6d7" }}>
              Last Visited on : #23433438378473847
            </h6>
            <SessionDetails />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
