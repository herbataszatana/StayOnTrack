import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddPrivateTask from "../Tasks/AddPrivateTask";
import AddPublicTask from "../Tasks/AddPublicTask";

function ListChoice() {
  return (
    
    <Tabs>
      <Tab eventKey="public" title="Public Tasks">
        <AddPublicTask/>
      </Tab>
      <Tab eventKey="private" title="Private Tasks">
        <AddPrivateTask/>
      </Tab>
    </Tabs>
  );
}

export default ListChoice;