import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
//import './NavMenu.css';
import logo from './img/9ners_Logo.svg';
import './employeeNavBar.css';
import { Login } from './Login';


export class EmployeeNav extends Component {
    displayName = EmployeeNav.name
    constructor(props) {
        super(props);
        this.state = { email: "", password: "", isLoggedIn: false, error: "" };
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.makeChange = this.makeChange.bind(this);
        //this.getData = this.getData.bind(this);
        //this.getBusinessLoginData = this.getBusinessLoginData.bind(this);
        this.getData = this.getData.bind(this);

        this.emailInput = null;
        this.passwordInput = null;
    }

    logout() {
        //call api to delete key

        //then redirect to login page
    }

    render() {
        return (
            <Navbar  inverse id="employeeNavBar">
                <img id="logo" src={logo}></img>
              
                <Navbar.Brand href="#dashboard"> TeamNiners  </Navbar.Brand>

                <span id="logoutSpan" onClick={() => this.props.updateParentState()}>
                    <Glyphicon glyph='log-out'/>
                    <span id="logout">Logout</span>
                </span>

            </Navbar>
            //<Navbar inverse fixedTop fluid collapseOnSelect>
            //    <Navbar.Header>
            //        <Navbar.Brand>
            //            <Link to={'/'}>TeamNiners</Link>
            //        </Navbar.Brand>
            //        <Navbar.Toggle />
            //    </Navbar.Header>
            //    <Navbar.Collapse>
            //        <Nav>
            //            <LinkContainer to={'/'} exact>
            //                <NavItem>
            //                    <Glyphicon glyph='home' /> Home
            //  </NavItem>
            //            </LinkContainer>
            //            <LinkContainer to={'/counter'}>
            //                <NavItem>
            //                    <Glyphicon glyph='education' /> Counter
            //  </NavItem>
            //            </LinkContainer>
            //            <LinkContainer to={'/fetchdata'}>
            //                <NavItem>
            //                    <Glyphicon glyph='th-list' /> Fetch data
            //  </NavItem>
            //            </LinkContainer>
            //            <LinkContainer to={'/login'}>
            //                <NavItem>
            //                    <Glyphicon glyph='log-in' /> Login
            //    </NavItem>
            //            </LinkContainer>
            //            <LinkContainer to={'/dashboard'}>
            //                <NavItem>
            //                    <Glyphicon glyph='th-large' /> Dashboard
            //    </NavItem>
            //            </LinkContainer>
            //        </Nav>
            //    </Navbar.Collapse>
            //</Navbar>
        );
    }
}
