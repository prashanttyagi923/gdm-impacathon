import React, { useEffect } from "react";
import "./App.css";
import Fingerprint2 from "fingerprintjs2";
import { Table, Container, Row, Col, Navbar } from "react-bootstrap";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
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

const serviceAccount = {
  type: "service_account",
  projectId: "tets-46786",
  privateKeyId: "dada08d72196d8adee027422f51d8637a162536f",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCUYSztIg0k4ny5\nvunxVu5em9ABR9Zo8JdDtJKnBmTCzHjETJ2bwjHFPdsldv05Wio0evtHT9fKVXSn\n+Rk9ViXwD9XVz6r/1L37Nhj9iH+1GGGrn+4WhhitQVoqWQNSA/9xWvNWQMyuiOaX\ngN/llBZJJcoqeIECiMFI/699c77fj0Gn2FYrR8qnVKNIGjloyyyNm4d+Cv1QU3nj\nGyWyQTsl+FtS2qtUW9vYNMvpzJreqr3D8p9YXkkVsn0L8DQrjtxL78n4zoIk0pFp\nNoskVu+mGUHXhahaXpzfxNtjYM0WPD2XGUJPIWdW/95et8Xf+9pPfff/c4+basvS\nY3Auk//JAgMBAAECggEABCLtYLL5UNTrizYSSYMV5BdN5is9g/FpFh8bk4JvHqsa\nlsZYAnaYcpo12MaHaqjj0lC3XpaQOnjFZsVf+cDED/wxBuPiLX2dyjoI2lCK1t6W\nInWz6nbUi0fuHo4atJed8GgLrpTh39+7JfAWzcyiDmn6R9LSLeLoGIPgPYwTfyHx\nWz0n/dJkfLHzXU1RVSjLSlnIyC/uXxT9DbjryyKJrkq4kiHUe7qE+XF/G5XNA+iO\n0hnqq0P5llDLBDS3jdIMkoV8VxT7Z4Zsd871mhzYAXDR44qlWZHM4SU9Xazog8MY\n36yYnVrgnvQEREMJZjarKCCP3r98jjC2OwjwV0qKgQKBgQDQtUoHd5wJWKDPKF5O\n1dPUKZ3gvJKNmIf/En50Hw9Yy7wYR+BfCcE4//K0rcUMH/UQUTDipeNDxU0k1ECC\nbzSW4cRynARiIU2gpXtdDaL41E/8gQXDerr/eG5nV1en4ROaG1lg3n0Aagiit9JE\nOOlolgHsAO9/kBYIFfKtlsIWEQKBgQC2AFshlg08UiTlvmUXxCF1YA6WXZrT5vcJ\nxzpBwERn6T32audvhgPEnnZrJ7mRBxJVx9i/wRpbukYNHPXtockNJYCNyi2uubMu\nYpFd3BH35oxplBPgXAuFc18RscJ/fcumUV4JPbWj5tnqw3BF7R9sbbgEzfv2lm7o\ne65cRd22OQKBgGzFzytNHzmPw1+z/lLABoKQngO+w/KgCGDb1qPWfD0fEYzmCP3/\nK4D1hBy+Y/AJx8MVTZESO/vaHHaRWH2iT5pDWAsTXQV3remH1V+N994PaRCEfeh/\nUm5K6d9aGgkYuQqcLlzaF/PbT1zeyOtdbehgJehGJIwrIBBev/fQlp7BAoGAZSFN\nghwevqXmWsKw6cPR06bMdEEPBzAPlR9e/6oWWKcCByrf7thIv7hNlL0+H5gOWBv0\nFJj4TH/07NRq0uBTFzr/c8okGDKXne6nV8AxO86ftwrRAJokzMKO0QY1TSJZRtFv\nrzLa+3gLHqf6euCH1XgiCIlsuFheyE/xUtR/ngECgYBUJ0j6RlHlA6rUVmpTstCS\n1TAh93iGwhnOIDR1th1vwE+N/TC1Hi+2zaSMkhAHCcFTrgTrG0hctNDCuo5EPfYF\n+Zk1v8Inyz9I4jnDDjphPKOo5bn5EYKTQwctt/Jpqd5HLSPLMalM7IVWc8gA/fhr\ntIRs912jmxMGHawYbmEBzQ==\n-----END PRIVATE KEY-----\n",
  client_email: "tets-46786@appspot.gserviceaccount.com",
  client_id: "107274186209831213197",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/tets-46786%40appspot.gserviceaccount.com",
};

var defaultProject = firebase.initializeApp(serviceAccount);
var db = defaultProject.firestore();
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
// const db = admin.firestore();

let isDeviceDataSet = false;

function App() {
  const [deviceData, setDeviceData] = React.useState();
  const [hashData, setHash] = React.useState("");
  const [historyData, setHistoryData] = React.useState([]);

  useEffect(() => {
    if (hashData !== "") {
      const docRef = db.collection("userDevice");
      docRef
        .where("hash", "==", hashData)
        .orderBy("viewedTime", "desc")
        .limit(5)
        .get()
        .then(function (documentSnapshot) {
          if (documentSnapshot.empty) {
            console.log("No matching documents.");
            return [];
          }
          setHistoryData(
            documentSnapshot.docs.map((x) => {
              return x.data();
            })
          );
        });
    }
  }, [hashData]);

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
          setHash(Fingerprint2.x64hash128(values.join(""), 31));

          var dataToPush = {};
          for (var i = 0; i < components.length; i++) {
            if (components[i].key !== "plugins") {
              dataToPush[components[i].key] = components[i].value;
            }
          }
          dataToPush.viewedTime = new Date().toUTCString();
          const docRef = db.collection("userDevice").doc(uuidv4());
          docRef
            .set(dataToPush)
            .then(function () {
              console.log("succeeded");
            })
            .catch(function () {
              console.log("unable to push data");
            });
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
                margin: "4% 0 1% 0",
                textAlign: "left",
              }}
            >
              Current Session Details
            </h1>
            <h6 style={{ textAlign: "left", color: "#40b6d7" }}>
              Current Hash - {hashData}
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
            <SessionDetails historyData={historyData} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
