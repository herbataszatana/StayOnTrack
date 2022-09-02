import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import ListChoice from './ListChoicesTabs';
import Profile from './Profile';

function NavTabs() {
  return (
    <Tabs>
      <Tab icon={<CalendarMonthIcon/>} eventKey="calendar">
      </Tab>  
      <Tab icon={<HomeIcon/>} eventKey="Home">
        <ListChoice/>
      </Tab>
      <Tab icon={<PersonIcon/>} eventKey="Profile">
        <Profile/>
      </Tab>  
    </Tabs>

  );
}

export default NavTabs;