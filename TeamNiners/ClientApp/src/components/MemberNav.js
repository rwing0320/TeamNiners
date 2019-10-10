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
                        <LinkContainer to={'/memberlogin'} exact>
                            <NavItem>
                                <Glyphicon glyph='user' /> Login
                             </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/member/register'} exact>
                            <NavItem >
                                <Glyphicon glyph='user' /> Create Account
                             </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/cart'}>
                            <NavItem>
                                <Glyphicon glyph='shopping-cart' /> Cart
                             </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/settings'}>
                            <NavItem>
                                <Glyphicon glyph='cog' /> Settings
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
