import React, { useContext, useEffect } from 'react'
import {Link} from "react-router-dom";
import cl from './MyNavbar.module.css';
import { AuthContext, ThemeContext, themes } from '../../../context';
import { 
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
  SplitButton,
  
} from 'react-bootstrap';
import user_image from "./user_icon.png" 
import sun from './iconizer-brightness-high.svg'

const MyNavbar = () => {
  const {theme, setTheme} = useContext(ThemeContext);
  const { user, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    if(theme) {
        document.body.classList.add('white-content');
        
    }
    else {
        document.body.classList.remove('white-content');
    }
}, [theme])


  const theme_change = () => {
    setTheme(!theme)
  }

  return (
    <Navbar className={cl.my_navbar} abg="dark" expand="lg">
      <Container fluid >
        <Navbar.Brand className={cl.nav_link} href="/tournaments">Турниры</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll">
            <span className="navbar-toggler-bar navbar-kebab" >~</span>
          </Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll" className={cl.nav_background}>
        
          <Nav
            className="me-auto  my-lg-0"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Nav.Link className={cl.nav_link} href="/create_tournament">Создать турнир</Nav.Link>
            <Nav.Link className={cl.nav_link} href="/create_bracket">Создать сетку</Nav.Link>
          </Nav>


          {user ? (<>
                      <button onClick={theme_change} className={`${cl.btn_circle} ${"btn"} ${"shadow-none"}`} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${"bi"} ${"bi-brightness-high-fill"}`} viewBox="0 0 16 16">
                          <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                        </svg>
                        <i className={`${"bi"} ${"bi-brightness-high-fill"}`}></i>
                      </button>
                      <Nav className="ml-auto" navbar>
                          <Dropdown>
                            <Dropdown.Toggle drop="down" className={`${cl.my_toggle} ${"shadow-none"}`}>
                              <img alt="..." src={user_image} Style="width: 45px; height: 45px;"/>
                            </Dropdown.Toggle>
                              <Dropdown.Menu  Style="margin-right: 40px;" className={cl.my_drop}>
                                <Dropdown.Item className={cl.nav_link} href={`/profile/${user.username}`} >
                                  Профиль 
                                </Dropdown.Item>
                                <Dropdown.Item className={cl.nav_link} href="/" onClick={logoutUser}>
                                  Выйти
                                </Dropdown.Item>
                              
                              </Dropdown.Menu>
                            </Dropdown>
                      </Nav>
                 </>
          ) : (
            <>
              <Nav.Link href="/login" className={cl.nav_link}>Вход</Nav.Link>
              <Nav.Link href="/register" className={cl.nav_link}>Регистрация</Nav.Link>
            </>
          )}


        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar