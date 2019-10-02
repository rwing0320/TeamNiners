import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
//import './NavMenu.css';
import logo from './img/9ners_Logo.svg';
import './employeeNavBar.css';
import { Login } from './Login';
import axios from 'axios';


export class EmployeeNav extends Component {
    displayName = EmployeeNav.name
    constructor(props) {
        super(props);
        this.state = {businessName: ""}
 
        this.logout = this.logout.bind(this);

     
    }

    async logout() {

        var isLoggedOut = false;
        //call api to delete key
        await axios.post('http://localhost:50392/api/users/Logout', {
           
        })
            .then(function (response) {
                console.log(response);
                isLoggedOut = true;
            })
            .catch(function (error) {
                console.log("this is the error: " + error);

            });

        this.props.updateParentState();
        console.log("user logged Out? : " + isLoggedOut);

    }
        //then redirect to login page
    

    render() {
        

        return (
            

            <Navbar  inverse id="employeeNavBar">
                <img id="logo" src={logo}></img>
              
                <Navbar.Brand href="#dashboard"> {this.props.data1} </Navbar.Brand>

                <span id="logoutSpan" onClick={this.logout}>
                    <Glyphicon glyph='log-out' />
                    <span id="logout">Logout</span>
                </span>

              

            </Navbar>

            //<span id="logoutSpan" onClick={() => this.props.updateParentState()}>
            //    <Glyphicon glyph='log-out' />
            //    <span id="logout">Logout</span>
            //</span>

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
