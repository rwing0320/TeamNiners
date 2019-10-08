import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
//import './NavMenu.css';
import logo from './img/9ners_Logo.svg';
import './employeeNavBar.css';
import { Login } from './EmployeeLayout';
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

        
        );
    }
}
