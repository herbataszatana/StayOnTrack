import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HomeIcon from '@mui/icons-material/Home';
import {  Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import "./Nav.css";

function TopNav() {

    return (
      <>  
        <Navbar variant="light" class="navbar">
          <Container>
            <Nav>
            <Link to="/Calendar"> 
                <CalendarMonthIcon sx={{ fontSize: "60px", color: "#B0CFD3" }} />   
              </Link>
              <Link to="/Home"> 
                <HomeIcon sx={{ fontSize: "60px", color: "#B0CFD3" }}/>   
              </Link>
              <Link to="/Profile">
                <PersonIcon sx={{ fontSize: "60px", color: "#B0CFD3" }}/>
              </Link>
            </Nav>
          </Container>
        </Navbar>

      </>

      
    );
  }


export default TopNav;