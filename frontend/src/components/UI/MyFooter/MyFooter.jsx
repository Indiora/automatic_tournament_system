import React, { useContext } from 'react'
import {Link} from "react-router-dom";
import cl from './MyFooter.module.css';
import { AuthContext } from '../../../context';
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
import telegram_image from "./telegram-icon.png" 
import git_image from "./git_logo.svg" 


const MyFooter = () => {

  return (
    <footer className={cl.my_footer}>
        <div class="container-fluid pt-3">
            <div class="row">
            <div class="col-lg-4 col-md-12 footer-text text-center">
                <p>Tournament 2022 ® - Ваш помощник в организации турниров</p>
            </div>
            <div class="col-lg-4 col-md-12 footer-text text-center">
                <Nav.Link className={cl.my_footer_link} href="#">Обратная связь</Nav.Link>
            </div>
            <div class="col-lg-4 col-md-12 footer-text text-center">
                <a href="https://github.com/">
                    <img className={cl.footer_img} src={git_image}  alt="github"/>
                </a>
            </div>
            </div>
        </div>
        </footer>
  );
}

export default MyFooter