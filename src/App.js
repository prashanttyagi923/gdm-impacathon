import React from 'react';
import logo from './logo.svg';
import './App.css';
import Fingerprint2 from 'fingerprintjs2';
import {Table, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
 const browserSpecificKey = ['userAgent', 'webdriver', 'webglVendorAndRenderer', 'webgl', 'adBlock']
const displaySettings = [
  {key:'language', displayName: 'Language', format: (val)=> {return val}}, 
  {key:'colorDepth', displayName: 'Color Depth', format: (val)=> {return val}},
  {key:'deviceMemory', displayName: 'Device Memory', format: (val)=> {return val}},
  {key:'hardwareConcurrency', displayName: 'Hardware Concurrency', format: (val)=> {return val}},
  {key:'screenResolution', displayName: 'Screen Resolution', format: (val)=> {return val.join('x')}},
  {key:'timezone', displayName: 'Time Zone', format: (val)=> {return val}},
  {key:'platform', displayName: 'Plateform', format: (val)=> {return val}},
  {key:'hasLiedOs', displayName: 'False OS', format: (val)=> {return val.toString()}},
  {key:'hasLiedBrowser', displayName: 'False Browser', format: (val)=> {return val.toString()}},
  {key:'touchSupport', displayName: 'Touch Support', format: (val)=> {return val.join(',')}},
  {key:'hasLiedResolution', displayName: 'False Resolution', format: (val)=> {return val.toString()}}
];

let isDeviceDataSet = false;

function App() {
  const [deviceData, setDeviceData] =  React.useState() ;
  const fingerprint = () =>{
    if (window.requestIdleCallback && !isDeviceDataSet) {
      requestIdleCallback(function () {
          Fingerprint2.get(function (components) {
            console.log(components) // an array of components: {key: ..., value: ...}
            navigator.clipboard.writeText(components).then(function(){console.log('copied');}).catch(function(ex){console.log(ex);})
            var values = components.filter((val)=> { if(!browserSpecificKey.includes(val.key)) return val; })
            console.log(values);
            if(!deviceData)
            {isDeviceDataSet = true;
            setDeviceData(values);
            }
            var hash = Fingerprint2.x64hash128(values.join(''), 31);
            console.log(`hash is ${hash}`);
          })
      })
  } else if(!isDeviceDataSet) {
      setTimeout(function () {
          Fingerprint2.get(function (components) {
            console.log(components) // an array of components: {key: ..., value: ...}
            var values = components.map(function (component) { return component.value })
      var murmur = Fingerprint2.x64hash128(values.join(''), 31);
      console.log(`murmur is ${murmur}`);
          })  
      }, 500)
  }
  }

  
  return (
    
    <div className="App">
      <Container>
        <Row>
          <Col>
          
    {fingerprint()}
      <Table striped bordered hover >
      <thead>
        <tr>
          <th>
            #
          </th>
          <th>
            Field
          </th>
          <th>
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        {
        deviceData && deviceData.map((item, seq)=>{
          const setting = displaySettings.find(setting=> {if(setting.key  === item.key) return setting });
          console.log(`item is ${item}`);
          if(setting){
                return(<tr><td>{seq + 1}</td><td>{setting && setting.displayName}</td><td>{setting.format(item.value)}</td> </tr>)
          }
        })
        }
      </tbody>
      </Table>
      </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
