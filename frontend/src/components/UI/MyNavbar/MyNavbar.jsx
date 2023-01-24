import React, { useContext } from 'react'
import cl from './MyNavbar.module.css';
import { AuthContext } from '../../../context';
import { 
  Container,
  Nav,
  Navbar,
  Dropdown,
} from 'react-bootstrap';
import user_image from "./user_icon.png" 
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';


const MyNavbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar className={cl.my_navbar} abg="dark" expand="lg">
      <Container fluid >
        <Navbar.Brand className={cl.nav_link} href="/tournaments">Tournaments</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll">
            <span className="navbar-toggler-bar navbar-kebab" >~</span>
          </Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll" className={cl.nav_background}>
        
          <Nav
            className="me-auto  my-lg-0"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Nav.Link className={cl.nav_link} href="/create_tournament">Create Tournament</Nav.Link>
            <Nav.Link className={cl.nav_link} href="/create_bracket"> Create Bracket</Nav.Link>
          </Nav>


          {user ? (<>
                      <ThemeSwitcher></ThemeSwitcher>
                      <Nav className="ml-auto" navbar>
                          <Dropdown>
                            <Dropdown.Toggle drop="down" className={`${cl.my_toggle} ${"shadow-none"}`}>
                              <img alt="..." src={user_image} Style="width: 45px; height: 45px;"/>
                            </Dropdown.Toggle>
                              <Dropdown.Menu  Style="margin-right: 40px;" className={cl.my_drop}>
                                <Dropdown.Item className={cl.nav_item} href={`/profile/${user.username}`} >
                                  Profile 
                                </Dropdown.Item>
                                <Dropdown.Item className={cl.nav_item} href="/" onClick={logoutUser}>
                                  Log out
                                </Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                      </Nav>
                 </>
          ) : (
            <>
              <Nav.Link href="/login" className={cl.nav_link}>Log in</Nav.Link>
              <Nav.Link href="/register" className={cl.nav_link}>Sign up</Nav.Link>
            </>
          )}


        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar