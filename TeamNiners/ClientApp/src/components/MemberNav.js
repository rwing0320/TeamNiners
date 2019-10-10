import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './css/MemberNav.css';

export class MemberNav extends Component {
    displayName = MemberNav.name

    constructor(props) {
        super(props);
        this.state = { pageOn: "Member", error: "", businessName: "", businessId: 0 };

        //this.setBusinessName = this.setBusinessName.bind(this);


        this.goToBusinessLogin = this.goToBusinessLogin.bind(this);
    }

    goToBusinessLogin() {
        this.props.updatePageState(2);
    }

    render() {
        return (
            <Navbar inverse fixedTop fluid >
                <Navbar.Header>
                
                        <Link to={'/member'}>
                            <div>
                                <img className="Nav_Icon" src={require('./img/9ners_Logo.svg')} alt="company_logo" width="50" height="50" />
              
                            </div>
                        </Link>
                
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to={'/home'} exact>
                            <NavItem>
                                <Glyphicon glyph='home' /> Login
                             </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/counter'}>
                            <NavItem>
                                <Glyphicon glyph='education' /> Counter
                             </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/fetchdata'}>
                            <NavItem>
                                <Glyphicon glyph='th-list' /> Fetch data
                            </NavItem>
                        </LinkContainer>
                       
                        <NavItem id="BusinessLogin" onClick={this.goToBusinessLogin}>
                                <Glyphicon glyph='share' /> Business Login
                        </NavItem>
               
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
